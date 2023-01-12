/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { BsSearch } from 'react-icons/bs';
import { GrOverview } from 'react-icons/gr';

import SideMenu from '@/components/SideMenu';
import BasicTable from '@/utils/UIs/Table';
import axios from 'axios';
import PaginatedItems from '@/utils/UIs/ReactPagination';
import { useRouter } from 'next/router';
import { style } from '@mui/system';
import Rating from '@mui/material/Rating';

export default function Review() {
  // curl - X 'GET' \
  // 'https://dev-api.digiex.asia/calobye-be-dev/api/orders/page?page_number=1&page_size=10&asc_sort=false' \
  // -H 'accept: */*' \
  // -H 'Auth-Token: 02d0a36b3dc4436d9cda4d072382c73f'

  const router: any = useRouter();
  const filterByStatus: any = useRef();

  const token = '008d7fddb4974935b81281e089716c57';
  const [pageNumber, setPageNumber] = useState(0);
  const [callApiPending, setCallApiPending] = useState(false);
  const [instance, setInstance]: any = useState([]);
  const [productsLength, setProductsLength] = useState(0);
  const [checkRegex, setCheckRegex] = useState("");

  const re = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

  
  console.log(re.test(checkRegex))
  const offsets = {
    size: 10,
  };

  const tableHeader = [
    'Rating',
    'Title',
    'Product',
    'Fullname',
    'Review date',
    'Status',
    'Action',
  ];

  function createData(
    rating: number,
    title: string,
    product: string,
    fullname: string,
    reviewdate: ReactNode,
    status: string,
  ) {
    return [
      {
        type: 'rating',
        content:  (
        <Rating name="read-only" defaultValue={rating} readOnly />
      ),
      },
    
      title,
      product,
      fullname,
      reviewdate,
      status,
      (
        <div className={`flex gap-3 text-2xl cursor-pointer`}>
          <GrOverview />
        </div>
      )
    ];
  }

  async function fetchMyAPI(p = 1, filter_status = '') {
    setCallApiPending(true);

    return await axios
      .get('https://dev-api.digiex.asia/calobye-be-dev/api/review', {
        params: {
          asc_sort: 'false',
          page_number: p,
          page_size: offsets.size,
        },
        headers: {
          accept: '*/*',
          'Auth-Token': token,
        },
      })
      .then((data: any) => {
        setCheckRegex( data.data.data.content.content);
        setCallApiPending(false);
        setPageNumber(p);
        setProductsLength(data?.data?.data?.total_elements);
        setInstance(
          data?.data?.data?.content?.map((item: any) =>
            createData(
              item.rating,
              item.title,
              item.content,
              item.first_name,
              item.created_date,
              item.status,
            ),
          ),
        );
        console.log(data);
      })
      .catch((err) => {
        setCallApiPending(false);
        console.log(err);
      });
    }

  useEffect(() => {
    setInstance([]);

    if (router.query.page) {
      if (router.query.filter_by) {
        filterByStatus.current.value = router.query.filter_by;
        fetchMyAPI(router.query.page, router.query.filter_by);
      } else {
        filterByStatus.current.value = 'Choose Status';
        fetchMyAPI(router.query.page, '');
      }
    }
    else {
      if (router.query.filter_by) {
        filterByStatus.current.value = router.query.filter_by;
        fetchMyAPI(router.query.page, router.query.filter_by);
      } else {
        filterByStatus.current.value = 'Choose Status';
        fetchMyAPI(router.query.page, '');
      }
    }
  }, [router.query.page, router.query.filter_by, productsLength]);

  const filterByValue = (e: any = 'PAID') => {
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

  return (
    <>

      <div className={`border-gray-200 border-2 p-4 w-3/4 `}>
        <div className={`ml-2 text-3xl w-fit  `}>
          <h1 className={`font-bold`}>Order Management</h1>
        </div>
        <form action="" className="flex items-center justify-between">
          <div className="flex items-center border-2 w-52 input-icons">
            <span className="icon">
              <BsSearch />
            </span>
            <input
              className="input-field"
              type="text"
              placeholder="Search order code"
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
          />
        </div>

        {pageNumber && (
          <div className={`paginator-container`}>
            <PaginatedItems
              itemsPerPage={offsets.size}
              items={productsLength}
              page={pageNumber}
              router={router}
              currentPath={'/review'}
            />
          </div>
        )}
      </div>

    </>
  );
}
