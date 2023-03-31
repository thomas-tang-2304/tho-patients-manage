import React, {
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { BsSearch } from 'react-icons/bs';

import axios from 'axios';
import { useRouter } from 'next/router';

import PaginatedItems from '@/utils/UIs/ReactPagination';
import BasicTable from '@/utils/UIs/Table';
import ViewIcon from '@/utils/UIs/ViewIcon';
import Modal from '@/utils/UIs/Modal';
import AddContent from './AddContent';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Content() {
  const router: any = useRouter();
  const cookies = new Cookies();
  const source: any = axios.CancelToken.source();

  const [token, setToken] = useState(cookies.get('account_token'));
  const [pageNumber, setPageNumber] = useState(0);
  const [callApiPending, setCallApiPending] = useState(false);
  const [instance, setInstance]: any = useState([]);
  const [productsLength, setProductsLength] = useState(0);

  const offsets = {
    size: 10,
  };

  const tableHeader = [
    'Title',
    'Content Type',
    'Last modified date',
    'Status',
    'Action',
  ];

  function createData(
    title: string,
    content_type: string,
    Last_modified_date: ReactNode,
    status: string,
  ) {
    return [
      {
        content: title,
      },
      content_type,
      Last_modified_date,
      status,
      <ViewIcon key={1} />,
    ];
  }

  async function fetchMyAPI(p = 1) {
    setCallApiPending(true);

    return await axios
      .get('https://dev-api.digiex.asia/calobye-be-dev/api/content', {
        params: {
          asc_sort: 'false',
          page_number: p,
          page_size: offsets.size,
        },
        headers: {
          accept: '*/*',
          'Auth-Token': token,
        },
        cancelToken: source.token,
      })
      .then((data: any) => {
        setCallApiPending(false);
        setPageNumber(p);
        setProductsLength(data?.data?.data?.total_elements);
        setInstance(
          data?.data?.data?.content?.map((item: any) =>
            createData(
              item.title,
              item.content_type,
              item.created_date,
              item.status,
            ),
          ),
        );
        console.log(data)
      })
      .catch((err) => {
        setCallApiPending(false);
        console.log(err);
      })
      .finally(() => {
        setCallApiPending(false);
      });
  }

  useLayoutEffect(() => {
    setInstance([]);

    fetchMyAPI(router.query.page);

    return () => {
      source.cancel('Cancelling in cleanup');
    };
  }, [router.query]);

  return (
    <>
      <div className={`p-4 w-3/4 `}>
        <div className={`ml-2 text-3xl w-fit  `}>
          <h1 className={`font-bold mb-3 text-black`}>Patient History</h1>
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
          <Modal component={<AddContent />} action_name="+ Add Content" saveClick='save'/>
        </form>
        <div className={`table-container py-4`}>
          <BasicTable
            itemsPerPage={offsets.size}
            rows={instance}
            headers={tableHeader}
            callApiPending={callApiPending}
            component={'content'}
          />
        </div>

        {pageNumber && (
          <div className={`paginator-container`}>
            <PaginatedItems
              itemsPerPage={offsets.size}
              items={productsLength}
              page={pageNumber}
              router={router}
            />
          </div>
        )}
      </div>
    </>
  );
}
