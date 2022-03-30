import classnames from "classnames";
import classes from './Pagination.module.css';
import usePagination from '../hooks/usePagination';
import { memo } from "react";

import { DOTS } from "../hooks/usePagination";


function Pagination(props) {
  const {
    currentPage,
      onPageChange,
      totalCount,
      pageSize,
      siblingsCount
  } = props.pagination;

  let { paginationArray, lastPage } = usePagination({
    currentPage,
      totalCount,
      pageSize,
      siblingsCount
  });
  let paginationItems = paginationArray.map((pageNumber,index) => {
    if (pageNumber === DOTS) return <li className="pagination-item dots" key={index}>&#8230;</li>;
    let selectedClass = currentPage === pageNumber ? `${classes['pagination-item']} ${classes.selected}` : classes['pagination-item'];
    return <li className={selectedClass} onClick={()=>{onPageChange(pageNumber)}} key={index}>{pageNumber}</li>;
  });

  function onPrev() {
    onPageChange(currentPage - 1);
  };

  function onNext() {
    onPageChange(currentPage + 1)
  };
  let prevClass = currentPage === 1 ? `${classes['pagination-item']} ${classes.disabled}` : classes['pagination-item']; 
  let nextClass = currentPage === lastPage ? `${classes['pagination-item']} ${classes.disabled}` : classes['pagination-item'];
  return (
    <ul className={classes['pagination-bar']}>
      <li
        className={prevClass} onClick={onPrev}>
        <div className={`${classes.arrow} ${classes.left}`} />
      </li>
      {paginationItems}
      <li className={nextClass} onClick={onNext}>
        <div className={`${classes.arrow} ${classes.right}`} />
      </li>
    </ul>
  );
};

export default memo(Pagination);