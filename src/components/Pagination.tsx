import React from "react";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";


//import styles 
import styles from "@/styles/Home.module.css";
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
  breakLabel={'...'}
  pageCount={pageCount}
  marginPagesDisplayed={2}
  pageRangeDisplayed={5}
  onPageChange={onPageChange}
  containerClassName={styles.pagination}
  previousClassName={styles.paginationbutton}
  nextClassName={styles.paginationbutton}
  activeClassName={styles.active}
  pageClassName={styles.paginationbutton}
  
/>
  );
};

export default Pagination;
