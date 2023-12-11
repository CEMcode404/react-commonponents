import {
  Children,
  FC,
  Fragment,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { clamp, paginate } from "./paginate.tsx";
import style from "./pagination.module.css";

//inserting a footer element/elements allow you to add Element in between  page number nav and items
//this element persist across every page

interface PaginationProps extends PropsWithChildren {
  activeColor?: string;
  className?: string;
  insertFooterElement?: ReactNode;
  maxItemsPerPage?: number;
  noOfPageVisible?: number;
}

export const Pagination: FC<PaginationProps> = ({
  activeColor = "lightgray",
  children,
  className = "",
  insertFooterElement: insertedElements,
  maxItemsPerPage = 5,
  noOfPageVisible = 7,
}) => {
  const [currentPage, setCurrentPageNo] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    setItemsCount(Children.count(children));
    setCurrentPageNo(calculatePageNo());
  }, [children]);

  function calculatePageNo() {
    const lowestPageNumber = 1;
    const totalPages = Math.ceil(Children.count(children) / maxItemsPerPage);

    return clamp(currentPage, totalPages, lowestPageNumber);
  }

  const endingIndex = maxItemsPerPage * currentPage;
  const startingIndex = endingIndex - maxItemsPerPage;

  return (
    <Fragment>
      {Children.toArray(children).filter(
        (_element, index) => index >= startingIndex && index < endingIndex
      )}

      {insertedElements}

      {itemsCount > maxItemsPerPage && (
        <nav className={`${style.pagination} ${className}`}>
          <ul className={style.pagination__ul}>
            {paginate(
              calculatePageNo(),
              itemsCount,
              maxItemsPerPage,
              noOfPageVisible
            ).map((pageNo) => (
              <li
                className={style.pagination__li}
                key={pageNo}
                onClick={() => setCurrentPageNo(pageNo)}
                style={
                  pageNo === currentPage ? { backgroundColor: activeColor } : {}
                }
              >
                {pageNo}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </Fragment>
  );
};
