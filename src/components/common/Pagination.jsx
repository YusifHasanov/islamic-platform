import React from "react";
import Link from "next/link";

const Pagination = ({ clientPage, totalPages, buildPageLink }) => {
    return (
        <div className="flex flex-wrap justify-center items-center mt-10 gap-2 px-4">
            {/* Mobile: Only show prev/next */}
            <div className="flex sm:hidden space-x-2">
                {clientPage > 1 && (
                    <Link
                        scroll={false}
                        href={buildPageLink(clientPage - 1)}
                        className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        Əvvəlki
                    </Link>
                )}

                {clientPage < totalPages && (
                    <Link
                        scroll={false}
                        href={buildPageLink(clientPage + 1)}
                        className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        Növbəti
                    </Link>
                )}
            </div>

            {/* Desktop: Show full pagination */}
            <div className="hidden sm:flex flex-wrap items-center space-x-2">
                {clientPage > 1 && (
                    <Link
                        scroll={false}
                        href={buildPageLink(1)}
                        className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        ⏮ İlk
                    </Link>
                )}

                {clientPage > 1 && (
                    <Link
                        scroll={false}
                        href={buildPageLink(clientPage - 1)}
                        className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        Əvvəlki
                    </Link>
                )}

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                        (p) =>
                            Math.abs(p - clientPage) <= 2 || p === 1 || p === totalPages
                    )
                    .map((p, idx, arr) => {
                        const prev = arr[idx - 1];
                        const showDots = prev && p - prev > 1;

                        return (
                            <React.Fragment key={p}>
                                {showDots && (
                                    <span className="px-2 hidden sm:inline-block">...</span>
                                )}
                                <Link
                                    scroll={false}
                                    href={buildPageLink(p)}
                                    className={`px-3 py-2 rounded hidden sm:inline-block ${
                                        p === clientPage
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                >
                                    {p}
                                </Link>
                            </React.Fragment>
                        );
                    })}

                {clientPage < totalPages && (
                    <Link
                        scroll={false}
                        href={buildPageLink(clientPage + 1)}
                        className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded hidden sm:inline-block"
                    >
                        Növbəti
                    </Link>
                )}

                {clientPage < totalPages && (
                    <Link
                        scroll={false}
                        href={buildPageLink(totalPages)}
                        className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded hidden sm:inline-block"
                    >
                        Son ⏭
                    </Link>
                )}
            </div>

            {/* Mobile: Show current page info */}
            <div className="sm:hidden text-gray-600 px-3 py-2">
                Səhifə {clientPage} / {totalPages}
            </div>
        </div>
    );
};

export default Pagination;
