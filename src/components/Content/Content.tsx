import React, {
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { BsSearch } from 'react-icons/bs';

import BasicTable from '@/utils/UIs/Table';
import axios from 'axios';
import PaginatedItems from '@/utils/UIs/ReactPagination';
import { useRouter } from 'next/router';
import ViewIcon from '@/utils/UIs/ViewIcon';
import { Button } from '@mui/material';

export default function Content() {
  const router: any = useRouter();

  const token = '02d0a36b3dc4436d9cda4d072382c73f';
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
      <ViewIcon /> 
    ];
  }

  async function fetchMyAPI(p = 1, filter_status = '') {
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
        // filterByStatus.current.value = router.query.filter_by;
        fetchMyAPI(router.query.page, router.query.filter_by);
      } else {
        // filterByStatus.current.value = 'Choose Status';
        fetchMyAPI(router.query.page, '');
      }
    } else {
      if (router.query.filter_by) {
        // filterByStatus.current.value = router.query.filter_by;
        fetchMyAPI(router.query.page, router.query.filter_by);
      } else {
        // filterByStatus.current.value = 'Choose Status';
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
          <h1 className={`font-bold`}>Content Management</h1>
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
            <div className={`text-center`}>
              <Button variant="outlined" className={`hover:bg-indigo-700 rounded bg-indigo-500 text-white p-2 px-3 cursor-pointer text-center`}>+ Add content</Button>
            </div>
          </div>
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
