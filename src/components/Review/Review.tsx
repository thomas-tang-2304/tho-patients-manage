/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
import React, { ReactNode, useLayoutEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { Button, Rating } from '@mui/material';

import Modal from '@/utils/UIs/Modal';
import BasicTable from '@/utils/UIs/Table';
import PaginatedItems from '@/utils/UIs/ReactPagination';

import Axios from 'axios';
import Cookies from 'universal-cookie';
import ReviewDetail from './ReviewDetail';
import axios from 'axios';

export default function Review() {
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
    'Rating',
    'Title',
    'Product',
    'Fullname',
    'Review date',
    'Action',
  ];

  function createData(
    rating: number,
    title: string,
    product: string,
    fullname: string,
    reviewdate: ReactNode,
    isapproved: string,
    content: string,
  ) {
    return [
      {
        type: 'rating',
        content: <Rating name="read-only" defaultValue={rating} readOnly />,
      },

      title,
      product,
      fullname,
      reviewdate,
      
      <Modal component={<ReviewDetail 
        rating={rating} 
        titleName={title} 
        fullName={fullname} 
        reviewDate={reviewdate} 
        comment={content} 
        isApproved={isapproved} />
      } action_name="View"/>,
    ];
  }

  async function fetchMyAPI(p = 1) {
    setCallApiPending(true);

    return await Axios.get(
      'https://dev-api.digiex.asia/calobye-be-dev/api/review',
      {
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
      },
    )
      .then((data: any) => {
        setPageNumber(p);
        setProductsLength(data?.data?.data?.total_elements);
        setInstance(
          data?.data?.data?.content?.map((item: any) =>
            createData(
              item.rating,
              item.title,
              item.product_name,
              item.first_name,
              item.created_date,
              item.is_approved,
              item.content,
            ),
          ),
        );
        console.log(data)
        console.log(data.data.data.content.map((i: any) => {}));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setCallApiPending(false);
      });
  }

  useLayoutEffect(() => {
    setInstance([]);

    if (router.query.page) fetchMyAPI(router.query.page);
    else fetchMyAPI(1);
    return () => {
      source.cancel('Cancelling in cleanup');
    };
  }, [router.query]);

  return (
    <>
      <div className={`p-4 w-3/4 `}>
        <div className={`ml-2 text-3xl w-fit  `}>
          <h1 className={`font-bold mb-3`}>Review Management</h1>
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
              <Button variant="outlined">+ Add review</Button>
            </div>
          </div>
        </form>
        <div className={`table-container py-4`}>
          <BasicTable
            itemsPerPage={offsets.size}
            rows={instance}
            headers={tableHeader}
            callApiPending={callApiPending}
            component={'review'}
          />
        </div>

        <div className={`paginator-container`}>
          <PaginatedItems
            itemsPerPage={offsets.size}
            items={productsLength}
            page={pageNumber}
            router={router}
            currentPath={'/review'}
          />
        </div>
      </div>
    </>
  );
}
