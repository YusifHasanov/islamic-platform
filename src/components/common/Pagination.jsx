import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Pagination = ({ clientPage, totalPages, buildPageLink }) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // If total pages is less than or equal to maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always include first page
      pageNumbers.push(1)

      // Calculate start and end of page range
      let startPage = Math.max(2, clientPage - 1)
      let endPage = Math.min(totalPages - 1, clientPage + 1)

      // Adjust if we're at the beginning
      if (clientPage <= 2) {
        // endPage = 4
        endPage = 3
      }

      // Adjust if we're at the end
      if (clientPage >= totalPages - 1) {
        startPage = totalPages - 3
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("...")
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...")
      }

      // Always include last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex justify-center my-8">
      <ul className="flex items-center space-x-1">
        {/* Previous Page Button */}
        {/*<li>*/}
        {/*  {clientPage > 1 && (*/}
        {/*      <Link*/}
        {/*          scroll={false}*/}
        {/*          href={buildPageLink(1)}*/}
        {/*          className={`flex items-center justify-center w-10 h-10 rounded-md ${*/}
        {/*              clientPage > 1*/}
        {/*                  ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"*/}
        {/*                  : "text-gray-400 cursor-not-allowed"*/}
        {/*          }`}*/}
        {/*      >*/}
        {/*        ⏮*/}
        {/*      </Link>*/}
        {/*  )}*/}

        {/*</li>*/}
        <li>
          <Link
            href={clientPage > 1 ? buildPageLink(clientPage - 1) : "#"}
            className={`flex items-center justify-center w-10 h-10 rounded-md ${
              clientPage > 1
                ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                : "text-gray-400 cursor-not-allowed"
            }`}
            aria-disabled={clientPage <= 1}
            tabIndex={clientPage <= 1 ? -1 : 0}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="sr-only">Previous</span>
          </Link>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="flex items-center justify-center w-10 h-10 text-gray-500">...</span>
            ) : (
              <Link
                href={buildPageLink(page)}
                className={`flex items-center justify-center w-10 h-10 rounded-md ${
                  clientPage === page
                    ? "bg-emerald-600 text-white font-medium"
                    : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
                aria-current={clientPage === page ? "page" : undefined}
              >
                {page}
              </Link>
            )}
          </li>
        ))}

        {/* Next Page Button */}
        <li>
          <Link
            href={clientPage < totalPages ? buildPageLink(clientPage + 1) : "#"}
            className={`flex items-center justify-center w-10 h-10 rounded-md ${
              clientPage < totalPages
                ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                : "text-gray-400 cursor-not-allowed"
            }`}
            aria-disabled={clientPage >= totalPages}
            tabIndex={clientPage >= totalPages ? -1 : 0}
          >
            <ChevronRight className="w-5 h-5" />
            <span className="sr-only">Next</span>
          </Link>
        </li>

        {/*<li>*/}
        {/*  {clientPage < totalPages && (*/}
        {/*      <Link*/}
        {/*          scroll={false}*/}
        {/*          href={buildPageLink(totalPages)}*/}
        {/*          className={`flex items-center justify-center w-10 h-10 rounded-md ${*/}
        {/*              clientPage < totalPages*/}
        {/*                  ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"*/}
        {/*                  : "text-gray-400 cursor-not-allowed"*/}
        {/*          }`}*/}
        {/*      >*/}
        {/*         ⏭*/}
        {/*      </Link>*/}
        {/*  )}*/}
        {/*</li>*/}
      </ul>
    </div>
  )
}

export default Pagination

