"use client"

export default function TableFooter({
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
}){

  const totalPages = Math.ceil(totalCount / pageSize)

  // compute display range text: e.g. “1–10 of 37 items”
  const startItem = currentPage * pageSize + 1
  const endItem = Math.min((currentPage + 1) * pageSize, totalCount)

  const handlePrev = () => {
    if (currentPage > 0) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages - 1) onPageChange(currentPage + 1)
  }

  const handlePageClick = (pageIdx) => {
    if (pageIdx !== currentPage) onPageChange(pageIdx)
  }

  // generate page number buttons (you might limit to e.g. +-2 pages around current)
  const pages = Array.from({ length: totalPages }, (_, i) => i)

  return(
    <div className="flex flex-1 items-center justify-center md:justify-between py-4 px-5 border-t border-border-text sticky left-0 right-0">

      <div className=" hidden text-sm font-normal md:flex items-center gap-2">
        <div className="border border-border-text rounded-sm p-2 bg-white"> 
          <h4>{pageSize}</h4> 
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sec-text">Items per page</span>
          <span> {startItem}-{endItem} of {totalCount} items</span>
        </div>

      </div>

      <div className="flex items-center gap-4">

        <button
          className={`px-2 py-1 rounded ${
            currentPage === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
            }`
          }
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 0}
        >
          Prev
        </button>
        
        <div className="flex items-center gap-2">
          {pages.map((pageIdx) => (
            <button
              key={pageIdx}
              type="button"
              onClick={() => handlePageClick(pageIdx)}
              className={`px-2 py-1 rounded ${
                pageIdx === currentPage
                  ? 'bg-primary text-on-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {pageIdx + 1}
            </button>
          ))}
        </div>


        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1}
          className={`px-2 py-1 rounded ${
            currentPage >= totalPages - 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Next
        </button>
      </div>

    </div>
  )
}