import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { IconButton } from '@mui/material';

// Example items, to simulate fetching from another resources.

const PaginatedItems = function ({
  itemsPerPage,
  items,
  router,
  currentPath,
}: any) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  const [itemOffset, setItemOffset]: any = useState(
    (router.query.page * itemsPerPage) % items,
  );

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
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
        initialPage={router.query.page - 1 <= 0 ? 0 : router.query.page - 1}
        className={`pagination`}
        breakLabel="..."
        nextLabel={
          <IconButton disabled={router.query.page == pageCount}>
            <FaChevronRight />
          </IconButton>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={
          <IconButton
            disabled={
              router.query.page == 1 ||
              router.query.page == undefined ||
              router.query.page == ''
            }
          >
            <FaChevronLeft />
          </IconButton>
        }
      />
    </>
  );
};

export default PaginatedItems;
