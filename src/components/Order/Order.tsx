/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */

import React, {
  MutableRefObject,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { BsSearch } from 'react-icons/bs';

import BasicTable from '@/utils/UIs/Table';
import axios from 'axios';
import PaginatedItems from '@/utils/UIs/ReactPagination';
import { useRouter, NextRouter } from 'next/router';

import Cookies from 'universal-cookie';
import ViewIcon from '@/utils/UIs/ViewIcon';

const cookies = new Cookies();

export default function Order() {
  const filterByStatus: MutableRefObject<string | undefined | any> = useRef();
  const router: NextRouter = useRouter();
  const OrderCodeInput: MutableRefObject<string | undefined | any> = useRef();

  const [token] = useState(cookies.get('account_token'));
  const [pageNumber, setPageNumber]: any = useState(router.query.page);
  const [callApiPending, setCallApiPending] = useState(false);
  const [instance, setInstance]: any = useState([]);
  const [orderLength, setOrderLength] = useState(0);

  const offsets = {
    size: 10,
  };

  const tableHeader = [
    'OrderCode',
    'Fullname',
    'Total',
    'Create date',
    'Status',
    'Action',
  ];

  function createData(
    code: string,
    full_name: string,
    total: number,
    create_date: ReactNode,
    status: string,
  ) {
    return [
      {
        type: 'text',
        content: code,
      },

      full_name,
      total,
      create_date,
      status,
      <ViewIcon key={1} />,
    ];
  }

  async function fetchMyAPI(
    p: number | string | string[],
    filter_status: string | string | string[],
  ) {
    setInstance([]);
    setCallApiPending(true);

    return await axios
      .get('https://dev-api.digiex.asia/calobye-be-dev/api/orders/page', {
        params: {
          page_size: offsets.size + '',
          page_number: p,
          asc_sort: 'false',
          order_status: filter_status == 'ALL' ? '' : filter_status,
        },
        headers: {
          accept: '*/*',
          'Auth-Token': token,
        },
      })
      .then((data: any) => {
        setPageNumber(p);
        setOrderLength(data?.data?.data?.total_elements);

        setInstance(
          data?.data?.data?.content?.map((item: any) =>
            createData(
              item.order_code,
              `${item.first_name ?? ''} ${item.last_name ?? ''}`,
              item.total_price,
              item.created_date,
              item.order_status,
            ),
          ),
        );
      })
      .catch((err) => {
        setOrderLength(0);
        setInstance([]);
        console.log(err);
      })
      .finally(() => {
        setCallApiPending(false);
      });
  }

  const getOrderRows = () => {
    if (router.query.page) {
      if (router.query.filter_by) {
        filterByStatus.current.value = router.query.filter_by;
        fetchMyAPI(router.query.page, router.query.filter_by);
      } else {
        filterByStatus.current.value = 'ALL';
        fetchMyAPI(router.query.page, 'ALL');
      }
    } else {
      if (router.query.filter_by) {
        filterByStatus.current.value = router.query.filter_by;
        fetchMyAPI(1, router.query.filter_by);
      } else {
        filterByStatus.current.value = 'ALL';
        fetchMyAPI(1, 'ALL');
      }
    }
  };

  useLayoutEffect(() => {
    setInstance([]);
    getOrderRows();
  }, [router.query]);

  const filterByValue = (e: any) => {
    setInstance([]);

    const value = e.target.value;
    router.push({
      pathname: '/order',
      query: {
        page: 1,
        filter_by: value,
      },
    });

    fetchMyAPI(1, value);
  };

  const filterByOrderCode = () => {
    setCallApiPending(true);

    const call = async () => {
      return await axios
        .get(
          `https://dev-api.digiex.asia/calobye-be-dev/api/orders/${OrderCodeInput.current.value}`,
          {
            headers: {
              accept: '*/*',
              'Auth-Token': token,
            },
          },
        )
        .then((res: any) => {
          const { data } = res;
          setOrderLength(1);
          setInstance([
            createData(
              data.data.order_code,
              `${data.data.customer.first_name ?? ''} ${
                data.data.customer.last_name ?? ''
              }`,
              data.data.total_price,
              data.data.created_date,
              data.data.status,
            ),
          ]);
        })
        .catch((err) => {
          setOrderLength(0);
          setInstance([]);
          console.log(err);
        })
        .finally(() => {
          setCallApiPending(false);
        });
    };

    if (OrderCodeInput.current.value != '') call();
    else {
      getOrderRows();
    }
  };

  return (
    <>
      <div className={`p-4 w-3/4 `}>
        <div className={`ml-2 text-3xl w-fit`}>
          <h1 className={`font-bold mb-3`}>Order Management</h1>
        </div>
        <form action="" className="flex items-center justify-between">
          <div className="flex items-center border-2 w-52 input-icons">
            <span
              onClick={filterByOrderCode}
              className="text-2xl cursor-pointer icon hover:text-teal-600"
            >
              <BsSearch />
            </span>
            <input
              className="input-field"
              type="text"
              placeholder="Search order code"
              ref={OrderCodeInput}
            />
          </div>
          <div className="">
            <div>
              <label htmlFor="cars" className={`font-bold text-xl`}>
                Filter status
              </label>
            </div>

            <div className={`text-center`}>
              <select
                name="order-state"
                id="order-selector"
                ref={filterByStatus}
                className={`border-2 px-3 py-2 capitalize`}
                onChange={(e: any) => filterByValue(e)}
              >
                <option className="capitalize" value="ALL">
                  all
                </option>
                <option className="capitalize" value="PAID">
                  paid
                </option>
                <option className="capitalize" value="PENDING">
                  pending
                </option>
                <option className="capitalize" value="DELIVERED">
                  delivered
                </option>
                <option className="capitalize" value="DELIVERING">
                  delivering
                </option>
                <option className="capitalize" value="REVIEWED">
                  reviewed
                </option>
                <option className="capitalize" value="CANCELLED">
                  cancelled
                </option>
                <option className="capitalize" value="CONFIRMED">
                  confirmed
                </option>
              </select>
            </div>
          </div>
        </form>
        <div className={`table-container py-4`}>
          <BasicTable
            itemsPerPage={offsets.size}
            rows={instance}
            headers={tableHeader}
            callApiPending={callApiPending}
            component={'order'}
          />
        </div>

        <div className={`paginator-container`}>
          {pageNumber && (
            <PaginatedItems
              itemsPerPage={offsets.size}
              items={orderLength}
              router={router}
              currentPath={'/order'}
            />
          )}
        </div>
      </div>
    </>
  );
}
