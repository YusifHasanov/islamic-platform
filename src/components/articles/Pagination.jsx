import React from "react";
import Link from "next/link";

const Pagination = ({ currentPage, totalPages }) => {
    return (
        <div className="pagination flex justify-center items-center gap-4 mt-8">
            {/* Önceki Sayfa */}
            {currentPage > 0 && (
                <Link href={`/articles?page=${currentPage - 1}`}>
                    <button className="px-4 py-2 bg-gray-200 rounded">Previous</button>
                </Link>
            )}

            <span>Page {currentPage + 1} of {totalPages }</span>

            {/* Sonraki Sayfa */}
            {currentPage +1 < totalPages && (
                <Link href={`/articles?page=${currentPage + 1}`}>
                    <button className="px-4 py-2 bg-gray-200 rounded">Next</button>
                </Link>
            )}
        </div>
    );
};

export default Pagination;