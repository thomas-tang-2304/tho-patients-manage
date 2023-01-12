/* eslint-disable react/display-name */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
import Order from '@/components/Order/Order';
import React, { memo, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'

// Example items, to simulate fetching from another resources.

const PaginatedItems = function ({ itemsPerPage, items, page, router, currentPath }: any) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  const [itemOffset, setItemOffset]: any = useState(
    (router.query.page * itemsPerPage) % items,
  );


  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const pageCount = Math.ceil(items / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items;
    router.push({
      pathname: currentPath,
      query: {
        page: event.selected + 1,
        filter_by: router?.query.filter_by,
      },
    });
    // console.log(
    //     `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );

    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        initialPage={router.query.page - 1  <= 0 ? 0 : router.query.page - 1}
        className={`pagination`}
        breakLabel="..."
        nextLabel={<FaChevronRight/>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<FaChevronLeft />}
      />

    </>
  );
};

export default PaginatedItems;
