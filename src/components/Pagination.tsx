import React from "react";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: { selected: number }) => void;
}

const Pagination: React.FC<Props> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  return (
    <ReactPaginate
      previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
      nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={"pagination my-custom-class"}
      activeClassName={"active"}
    />
  );
};

export default Pagination;
