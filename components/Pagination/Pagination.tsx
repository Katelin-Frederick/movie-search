import { useEffect } from 'react'
import clsx from 'clsx'
import ReactPaginate from 'react-paginate'

type PaginationPropTypes = {
  className?: string,
  onPageChange: (selectedItem: {
    selected: number;
  }) => void,
  totalPages: number,
}

const Pagination = ({ className, onPageChange, totalPages }: PaginationPropTypes) => {
  useEffect(() => {
    const paginationBreaks = document.querySelectorAll('.paginationBreak')
    const paginationBreakLinks = document.querySelectorAll('.paginationBreak a')
    paginationBreaks.forEach((item) => item.setAttribute('tabindex', '-1'))
    paginationBreakLinks.forEach((item) => item.setAttribute('tabindex', '-1'))
  })

  return (
    <ReactPaginate
      breakLabel="..."
      breakClassName="paginationBreak"
      className={clsx(
        'paginationList font-rockSalt flex flex-row justify-center items-center text-xl',
        className
      )}
      marginPagesDisplayed={1}
      nextClassName="paginationNext"
      nextLinkClassName="paginationNextLink"
      nextLabel="Next"
      onPageChange={(selectedItem) => onPageChange(selectedItem)}
      pageClassName="paginationListItem"
      pageCount={totalPages}
      pageRangeDisplayed={5}
      previousClassName="paginationPrevious"
      previousLinkClassName="paginationPreviousLink"
      previousLabel="Previous"
    />
  )
}

export default Pagination