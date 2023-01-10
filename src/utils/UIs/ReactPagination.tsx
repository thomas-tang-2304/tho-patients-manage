/* eslint-disable react/display-name */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
import Order from '@/components/Order/Order';
import React, { memo, useState } from 'react';
import ReactPaginate from 'react-paginate';

// Example items, to simulate fetching from another resources.

const PaginatedItems = function ({ itemsPerPage, items, page, router }: any) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  const [itemOffset, setItemOffset]: any = useState(
    (page * itemsPerPage) % items,
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
      pathname: '/order',
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
        className={`pagination`}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
      />
    </>
  );
};

export default PaginatedItems;
