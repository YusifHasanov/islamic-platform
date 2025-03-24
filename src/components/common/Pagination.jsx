import React from "react";
import Link from "next/link";

const Pagination = ({clientPage, totalPages, buildPageLink}) => {
    return (
        <div className="flex flex-wrap justify-center items-center mt-10 space-x-2">

            {clientPage > 1 && (
                <Link href={buildPageLink(1)} className="...">⏮ İlk</Link>
            )}

            {clientPage > 1 && (
                <Link href={buildPageLink(clientPage - 1)} className="...">Əvvəlki</Link>
            )}

            {/* Səhifə nömrələri */}
            {Array.from({length: totalPages}, (_, i) => i + 1)
                .filter(p => Math.abs(p - clientPage) <= 2 || p === 1 || p === totalPages)
                .map((p, idx, arr) => {
                    const prev = arr[idx - 1];
                    const showDots = prev && p - prev > 1;

                    return (
                        <React.Fragment key={p}>
                            {showDots && <span className="px-2">...</span>}
                            <Link href={buildPageLink(p)}
                                  className={`px-3 py-2 rounded ${p === clientPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
                                {p}
                            </Link>
                        </React.Fragment>
                    );
                })}

            {clientPage < totalPages && (
                <Link href={buildPageLink(clientPage + 1)} className="...">Növbəti</Link>
            )}

            {clientPage < totalPages && (
                <Link href={buildPageLink(totalPages)} className="...">Son ⏭</Link>
            )}
        </div>
    );
};

export default Pagination;
