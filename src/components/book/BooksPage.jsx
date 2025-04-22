"use client"
import React, {useState, useEffect, useCallback, useRef, memo} from "react";
import { FilterProvider } from "@/components/common/Filter/FilterProvider";
import HttpClient from "@/util/HttpClient";
import useDebounce from "@/hooks/useDebounce";
import {formatDate} from "@/util/DateUtil";
import {motion, AnimatePresence} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    Calendar,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Clock,
    MessageSquare,
    TagIcon,
    Search,
    RotateCcw
} from "lucide-react";
import {booksData} from "@/components/home/Books";

export default function BooksPage() {
    // --- State Variables ---
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        categories: [],
        tags: [],
        searchQuery: ""
    });
    const debouncedSearchQuery = useDebounce(filters.searchQuery, 300);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const searchInputRef = useRef(null);

    // --- Data Fetching ---
    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // const params = new URLSearchParams({
            //     page: page.toString(),
            //     maxResult: "9",
            //     containsTag: '1',
            //     containsCategory: '1',
            // });
            //
            // if (debouncedSearchQuery) params.set('searchQuery', debouncedSearchQuery);
            // if (filters.categories.length > 0) params.set('categoryIds', filters.categories.map(c => c.id).join(','));
            // if (filters.tags.length > 0) params.set('tagIds', filters.tags.map(t => t.id).join(','));
            //
            // const response = await HttpClient.get(`/books?${params.toString()}`);
            // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            // const data = await response.json();



            // const content = data?.content || [];
            // const pageInfo = data?.page || {};
            const content =  booksData
            const pageInfo = {};

            // Transform the data as needed...
            setBooks(content.map((book) => ({
                id: book.id,
                title: book.title ?? "Kitab başlığı yoxdur",
                author: book.author ?? "Müəllif qeyd olunmayıb",
                description: book.description ?? "Təsvir yoxdur",
                image: book.image ?? "/images/placeholder_book.png",
                categories: Array.isArray(book.categories) ? book.categories.map(c => ({ id: c.id, name: c.name })) : [],
                tags: Array.isArray(book.tags) ? book.tags.map(t => ({ id: t.id, name: t.name })) : [],
                createdDate: book.publishedDate || new Date().toISOString(),
                readCount: book.viewCount ?? Math.floor(Math.random() * 100) + 10,
            })));
            setTotalPages(pageInfo.totalPages ?? 1);
        } catch (err) {
            console.error("Error fetching books:", err);
            setError("Kitablar yüklənərkən xəta baş verdi.");
            setBooks([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [page, debouncedSearchQuery, filters.categories, filters.tags]);

    // Fetch books when relevant state changes
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    // Reset page when filters change
    useEffect(() => {
        if (page !== 0) {
            setPage(0);
        }
    }, [debouncedSearchQuery, filters.categories, filters.tags, page]);

    // Handle filter changes
    const handleFiltersChange = useCallback((newFilters) => {
        // Only update if the filters have actually changed
        if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
            setFilters(newFilters);
        }
    }, [filters]);

    // Pagination handler
    const paginate = useCallback((newPage) => {
        const zeroIndexedPage = newPage - 1;
        if (zeroIndexedPage >= 0 && zeroIndexedPage < totalPages) {
            setPage(zeroIndexedPage);
        }
    }, [totalPages]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-12 md:py-16">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                                Mədrəsəmizin Kitabları
                            </h1>
                            <p className="mt-2 text-lg text-gray-600">
                                Axtardığınız elmi və mənəvi qaynaqları burada tapın.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 relative">
                {/* Use our FilterProviderOld component */}
                <FilterProvider
                    initialCategories={[]}
                    initialTags={[]}
                    initialSearchQuery=""
                    onFiltersChange={handleFiltersChange}
                    searchPlaceholder="Kitab adı və ya müəllif axtar..."
                    searchInputRef={searchInputRef}
                >
                    {/* Books List Area */}
                    <div id="books-list-start" className="mt-6">
                        {error && (
                            <div className="my-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <BooksSkeletonLoader count={9} />
                        ) : books.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {books.map((book) => (
                                        <OptimizedBookCard key={book.id} book={book} />
                                    ))}
                                </div>
                                {totalPages > 1 && (
                                    <OptimizedPagination
                                        currentPage={page + 1}
                                        totalPages={totalPages}
                                        onPageChange={paginate}
                                    />
                                )}
                            </>
                        ) : (
                            !error && (
                                <NoBooksFound
                                    onReset={() => {
                                        // FilterProviderOld handles the reset internally
                                    }}
                                    hasFilters={filters.searchQuery || filters.categories.length > 0 || filters.tags.length > 0}
                                />
                            )
                        )}
                    </div>
                </FilterProvider>
            </div>
        </div>
    );
}

// Book Card (Memoized + Animation Fix)
const OptimizedBookCard = memo(function BookCard({ book }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const formattedDate = formatDate(book.createdDate); // Assuming formatDate handles potential errors

    const descriptionPreviewThreshold = 180; // Characters
    const collapsedHeight = "4.5rem"; // Approx 3 lines (adjust as needed based on font/line-height)
    const descriptionText = book.description || "Təsvir mövcud deyil."; // Fallback for empty description
    const needsExpansion = descriptionText.length > descriptionPreviewThreshold;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 100, damping: 20 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
            <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img
                    src={book.image || "/images/placeholder_book.png"}
                    alt={book.title}
                    // fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-5 md:p-6">
                <h2 className="text-lg font-semibold text-justify text-gray-900 mb-2">
                    {book.title}
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                    {book.author}
                </p>
                <div className="text-gray-600 text-sm leading-relaxed mb-4 relative">
                    <motion.div
                        initial={needsExpansion ? { height: collapsedHeight } : { height: "auto" }}
                        animate={{ height: isExpanded || !needsExpansion ? "auto" : collapsedHeight }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden text-justify"
                    >
                        {descriptionText}
                    </motion.div>

                    {/* Gradient overlay: Only show when collapsed AND needs expansion */}
                    {!isExpanded && needsExpansion && (
                        <div
                            className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-100% pointer-events-none"
                        ></div>
                    )}

                    {/* Toggle button: Only show if expansion is needed */}
                    {needsExpansion && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-emerald-800 hover:text-emerald-900 font-medium text-sm mt-2 flex items-center focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-1 rounded"
                            aria-expanded={isExpanded}
                        >
                            {isExpanded ? 'Daha az göstər' : 'Daha çox göstər'}
                            {isExpanded ? <ChevronUp className="ml-1 h-4 w-4"/> : <ChevronDown className="ml-1 h-4 w-4"/>}
                        </button>
                    )}
                </div>

                {/* Tags */}
                {book.tags && book.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {book.tags.map(tag => (
                            <Link key={tag.id}
                                  href={`/books?tag=${tag.id}&page=1`}
                                  className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-300 rounded-full group">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 group-hover:bg-blue-200 transition-colors cursor-pointer">
                                    <TagIcon className="mr-1 h-3 w-3"/>{tag.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span className="flex items-center" title="Nəşr olunma tarixi">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                        {formattedDate}
                    </span>
                    <div className="flex items-center gap-x-3">
                        {book.categories && book.categories.length > 0 && (
                            <span className="flex items-center" title="Kateqoriyalar">
                                <MessageSquare className="h-3.5 w-3.5 mr-1 text-gray-400" />
                                {book.categories.length} kateqoriya
                            </span>
                        )}
                        {book.readCount != null && (
                            <span className="flex items-center" title="Oxunma sayı">
                                <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                                {book.readCount} oxunma
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Link to Full Book Details */}
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <Link href={`/books/${book.id}`} className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:ring-offset-1 rounded -m-1 p-1">
                    Kitab haqqında ətraflı <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
            </div>
        </motion.div>
    );
});

// Skeleton Loader
function BooksSkeletonLoader({ count = 6 }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
                    <div className="aspect-[3/4] bg-gray-200 rounded-t-lg"></div>
                    <div className="p-5 md:p-6">
                        <div className="h-6 bg-gray-200 rounded w-4/5 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="space-y-2 mb-5">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-5">
                            <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                            <div className="h-5 bg-gray-200 rounded-full w-20"></div>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// No Books Found Component
function NoBooksFound({ onReset, hasFilters }) {
    return (
        <div className="text-center py-16 px-6 bg-white rounded-xl border border-gray-100 shadow-sm my-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-6">
                <Search className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Heç bir kitab tapılmadı</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm leading-relaxed">
                {hasFilters
                    ? "Seçdiyiniz filtrlərə uyğun nəticə yoxdur. Filtrləri dəyişməyi və ya sıfırlamağı yoxlayın."
                    : "Görünür, hələ heç bir kitab əlavə edilməyib. Zəhmət olmasa daha sonra təkrar yoxlayın."}
            </p>
            {hasFilters && (
                <button
                    onClick={onReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                >
                    <RotateCcw size={16}/> Filtrləri Sıfırla
                </button>
            )}
        </div>
    );
}

// Pagination Component (Memoized)
const OptimizedPagination = memo(function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    // Basic pagination logic (can be extended for ellipsis, etc.)
    const pages = [];
    const maxVisiblePages = 5; // Adjust as needed
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const maxPagesBeforeCurrent = Math.floor((maxVisiblePages - 1) / 2);
        const maxPagesAfterCurrent = Math.ceil((maxVisiblePages - 1) / 2);

        if (currentPage <= maxPagesBeforeCurrent) {
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - maxPagesBeforeCurrent;
            endPage = currentPage + maxPagesAfterCurrent;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const showFirstEllipsis = startPage > 2;
    const showLastEllipsis = endPage < totalPages - 1;

    return (
        <div aria-label="Səhifələmə" className="mt-10 flex justify-center items-center space-x-1">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors ${
                    currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm"
                }`}
                aria-label="Əvvəlki səhifə"
                aria-disabled={currentPage === 1}
            >
                <ChevronLeft className="h-5 w-5" />
            </button>

            {/* First page link */}
            {startPage > 1 && (
                <button
                    onClick={() => onPageChange(1)}
                    className="px-4 py-2 rounded-md text-sm font-medium min-w-[36px] transition-colors bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm"
                    aria-label="Birinci səhifə"
                >
                    1
                </button>
            )}

            {/* Ellipsis at the start */}
            {showFirstEllipsis && (
                <span className="px-2 py-2 text-sm font-medium text-gray-500">...</span>
            )}

            {/* Page number buttons */}
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded-md text-sm font-medium min-w-[36px] transition-colors border shadow-sm ${
                        currentPage === page
                            ? "bg-emerald-600 text-white border-emerald-600 z-10"
                            : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"
                    }`}
                    aria-current={currentPage === page ? 'page' : undefined}
                    aria-label={`Səhifə ${page}`}
                >
                    {page}
                </button>
            ))}

            {/* Ellipsis at the end */}
            {showLastEllipsis && (
                <span className="px-2 py-2 text-sm font-medium text-gray-500">...</span>
            )}

            {/* Last page link */}
            {endPage < totalPages && (
                <button
                    onClick={() => onPageChange(totalPages)}
                    className="px-4 py-2 rounded-md text-sm font-medium min-w-[36px] transition-colors bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm"
                    aria-label="Sonuncu səhifə"
                >
                    {totalPages}
                </button>
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors ${
                    currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm"
                }`}
                aria-label="Növbəti səhifə"
                aria-disabled={currentPage === totalPages}
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    );
});
