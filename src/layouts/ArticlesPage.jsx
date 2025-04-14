"use client"
import React, {useState, useEffect, useCallback, useRef, memo} from "react";
import { FilterProvider } from "@/components/common/Filter/FilterProvider";
import HttpClient from "@/util/HttpClient";
import useDebounce from "@/hooks/useDebounce";
import {motion, AnimatePresence} from "framer-motion";
import ArticleCard from "@/components/articles/ArticleCard";
import {
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    SearchX
} from "lucide-react";
import useFilterStore from "@/store/useFilterStore";

export default function ArticlesPage() {
    // --- State Variables ---
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const searchInputRef = useRef(null);
    const PAGE_SIZE = 12;

    // Get filter state from Zustand store
    const { selectedCategories, selectedTags, searchQuery } = useFilterStore();

    // Use debounce for search query to avoid excessive API calls
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // --- Data Fetching ---
    const fetchArticles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                size: PAGE_SIZE.toString(),
            });

            if (debouncedSearchQuery) params.set('searchQuery', debouncedSearchQuery);
            if (selectedCategories.length > 0) params.set('categoryIds', selectedCategories.map(c => c.id).join(','));
            if (selectedTags.length > 0) params.set('tagIds', selectedTags.map(t => t.id).join(','));

            const response = await HttpClient.get(`/articles?${params.toString()}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

            const content = data?.content || [];
            setArticles(content);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            console.error("Error fetching articles:", err);
            setError("Məqalələr yüklənərkən xəta baş verdi.");
            setArticles([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [page, debouncedSearchQuery, selectedCategories, selectedTags]);

    // Fetch articles when relevant state changes
    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    // Reset page when filters change
    useEffect(() => {
        if (page !== 0) {
            setPage(0);
        }
    }, [debouncedSearchQuery, selectedCategories, selectedTags, page]);

    // Pagination handler
    const paginate = useCallback((newPage) => {
        const zeroIndexedPage = newPage - 1;
        if (zeroIndexedPage >= 0 && zeroIndexedPage < totalPages) {
            setPage(zeroIndexedPage);
            // Scroll to top of article list when changing pages
            document.getElementById('articles-list-start')?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [totalPages]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-emerald-800 to-emerald-600 text-white py-16 md:py-20">
                <div className="absolute inset-0 overflow-hidden opacity-30">
                    {/* Subtle background pattern (optional) */}
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.h1
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        className="text-4xl md:text-5xl font-bold text-center mb-3 tracking-tight"
                    >
                        Məqalələr Arxivi
                    </motion.h1>
                    <motion.p
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.1}}
                        className="text-lg text-center max-w-2xl mx-auto text-emerald-100"
                    >
                        Müxtəlif mövzularda dərin biliklər və maarifləndirici yazılar.
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Use FilterProvider component */}
                <FilterProvider
                    searchPlaceholder="Məqalələr arasında axtar..."
                    searchInputRef={searchInputRef}
                >
                    {/* Articles List Area */}
                    <div id="articles-list-start" className="mt-6">
                        {error && (
                            <div className="my-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <ArticlesSkeletonLoader count={PAGE_SIZE} />
                        ) : articles.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <AnimatePresence mode="popLayout">
                                        {articles.map((article, index) => (
                                            <motion.div
                                                key={article.id}
                                                layout
                                                initial={{opacity: 0, scale: 0.95}}
                                                animate={{opacity: 1, scale: 1}}
                                                exit={{opacity: 0, scale: 0.95}}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: index * 0.05,
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 15
                                                }}
                                            >
                                                <ArticleCard
                                                    id={article.id}
                                                    title={article.title}
                                                    description={article.description}
                                                    image={article.image}
                                                    date={article.publishedAt}
                                                    authorImage={article.authorImage}
                                                    authorName={article.authorName}
                                                />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                                {totalPages > 1 && (
                                    <div className="mt-12">
                                        <OptimizedPagination
                                            currentPage={page + 1}
                                            totalPages={totalPages}
                                            onPageChange={paginate}
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            !error && (
                                <NoArticlesFound
                                    hasFilters={searchQuery || selectedCategories.length > 0 || selectedTags.length > 0}
                                />
                            )
                        )}
                    </div>
                </FilterProvider>
            </div>
        </div>
    );
}

// Skeleton Loader for Articles
function ArticlesSkeletonLoader({ count = 6 }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
                    <div className="aspect-[16/9] bg-gray-200 rounded-t-lg"></div>
                    <div className="p-5">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                        {/* Category placeholder */}
                        <div className="h-6 bg-gray-200 rounded w-4/5 mb-3"></div>
                        {/* Title */}
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        {/* Description line 1 */}
                        <div className="h-4 bg-gray-200 rounded w-5/6 mb-5"></div>
                        {/* Description line 2 */}
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                                {/* Author */}
                            </div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                            {/* Date */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// No Articles Found Component
function NoArticlesFound({ hasFilters }) {
    // Get clear filters function from Zustand store
    const { clearFilters } = useFilterStore();

    return (
        <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 md:p-16 text-center"
        >
            <div className="flex flex-col items-center justify-center">
                <SearchX size={48} className="text-emerald-400 mb-5"/>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Məqalə Tapılmadı</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                    {hasFilters
                        ? "Seçdiyiniz filtrlərə uyğun nəticə yoxdur. Filtrləri dəyişməyi və ya sıfırlamağı yoxlayın."
                        : "Heç bir məqalə tapılmadı. Zəhmət olmasa daha sonra yenidən yoxlayın."}
                </p>
                {hasFilters && (
                    <button
                        onClick={clearFilters}
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                    >
                        <RotateCcw size={16}/> Filtrləri Sıfırla
                    </button>
                )}
            </div>
        </motion.div>
    );
}

// Pagination Component (Memoized)
const OptimizedPagination = memo(function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    // Basic pagination logic (can be extended for ellipsis, etc.)
    const pages = [];
    const maxVisiblePages = 5;

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
// "use client"
// import React, {useState, useEffect, useCallback, useRef, memo} from "react";
// import { FilterProvider } from "@/components/common/Filter/FilterProvider";
// import HttpClient from "@/util/HttpClient";
// import useDebounce from "@/hooks/useDebounce";
// import CacheProvider from "@/util/CacheProvider";
// import {formatDate} from "@/util/DateUtil";
// import {motion, AnimatePresence} from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";
// import ArticleCard from "@/components/articles/ArticleCard";
// import {
//     Calendar,
//     ChevronDown,
//     ChevronLeft,
//     ChevronRight,
//     ChevronUp,
//     Clock,
//     MessageSquare,
//     TagIcon,
//     Search,
//     RotateCcw,
//     SearchX
// } from "lucide-react";
//
// export default function ArticlesPage() {
//     // --- State Variables ---
//     const [articles, setArticles] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [filters, setFilters] = useState({
//         categories: [],
//         tags: [],
//         searchQuery: ""
//     });
//     const debouncedSearchQuery = useDebounce(filters.searchQuery, 300);
//     const [page, setPage] = useState(0);
//     const [totalPages, setTotalPages] = useState(1);
//     const searchInputRef = useRef(null);
//     const PAGE_SIZE = 12;
//
//     // --- Data Fetching ---
//     const fetchArticles = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const params = new URLSearchParams({
//                 page: page.toString(),
//                 size: PAGE_SIZE.toString(),
//             });
//
//             if (debouncedSearchQuery) params.set('searchQuery', debouncedSearchQuery);
//             if (filters.categories.length > 0) params.set('categoryIds', filters.categories.map(c => c.id).join(','));
//             if (filters.tags.length > 0) params.set('tagIds', filters.tags.map(t => t.id).join(','));
//
//             const response = await HttpClient.get(`/articles?${params.toString()}`);
//             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//             const data = await response.json();
//
//             const content = data?.content || [];
//             const pageInfo = data?.page || {};
//
//             // Transform the data as needed...
//             setArticles(content);
//             setTotalPages(data.totalPages || 1);
//         } catch (err) {
//             console.error("Error fetching articles:", err);
//             setError("Məqalələr yüklənərkən xəta baş verdi.");
//             setArticles([]);
//             setTotalPages(1);
//         } finally {
//             setLoading(false);
//         }
//     }, [page, debouncedSearchQuery, filters.categories, filters.tags]);
//
//     // Fetch articles when relevant state changes
//     useEffect(() => {
//         fetchArticles();
//     }, [fetchArticles]);
//
//     // Reset page when filters change
//     useEffect(() => {
//         if (page !== 0) {
//             setPage(0);
//         }
//     }, [debouncedSearchQuery, filters.categories, filters.tags, page]);
//
//     // Handle filter changes
//     const handleFiltersChange = useCallback((newFilters) => {
//         // Only update if the filters have actually changed
//         if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
//             setFilters(newFilters);
//         }
//     }, [filters]);
//
//     // Pagination handler
//     const paginate = useCallback((newPage) => {
//         const zeroIndexedPage = newPage - 1;
//         if (zeroIndexedPage >= 0 && zeroIndexedPage < totalPages) {
//             setPage(zeroIndexedPage);
//         }
//     }, [totalPages]);
//
//     return (
//         <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white">
//             {/* Hero Section */}
//             <div className="relative bg-gradient-to-r from-emerald-800 to-emerald-600 text-white py-16 md:py-20">
//                 <div className="absolute inset-0 overflow-hidden opacity-30">
//                     {/* Subtle background pattern (optional) */}
//                 </div>
//                 <div className="container mx-auto px-4 relative z-10">
//                     <motion.h1
//                         initial={{opacity: 0, y: -20}}
//                         animate={{opacity: 1, y: 0}}
//                         transition={{duration: 0.5}}
//                         className="text-4xl md:text-5xl font-bold text-center mb-3 tracking-tight"
//                     >
//                         Məqalələr Arxivi
//                     </motion.h1>
//                     <motion.p
//                         initial={{opacity: 0, y: -10}}
//                         animate={{opacity: 1, y: 0}}
//                         transition={{duration: 0.5, delay: 0.1}}
//                         className="text-lg text-center max-w-2xl mx-auto text-emerald-100"
//                     >
//                         Müxtəlif mövzularda dərin biliklər və maarifləndirici yazılar.
//                     </motion.p>
//                 </div>
//             </div>
//
//             <div className="container mx-auto px-4 py-12">
//                 {/* Use FilterProviderOld component */}
//                 <FilterProvider
//                     initialCategories={[]}
//                     initialTags={[]}
//                     initialSearchQuery=""
//                     onFiltersChange={handleFiltersChange}
//                     searchPlaceholder="Məqalələr arasında axtar..."
//                     searchInputRef={searchInputRef}
//                 >
//                     {/* Articles List Area */}
//                     <div id="articles-list-start" className="mt-6">
//                         {error && (
//                             <div className="my-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
//                                 {error}
//                             </div>
//                         )}
//
//                         {loading ? (
//                             <ArticlesSkeletonLoader count={PAGE_SIZE} />
//                         ) : articles.length > 0 ? (
//                             <>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <AnimatePresence mode="popLayout">
//                                         {articles.map((article, index) => (
//                                             <motion.div
//                                                 key={article.id}
//                                                 layout
//                                                 initial={{opacity: 0, scale: 0.95}}
//                                                 animate={{opacity: 1, scale: 1}}
//                                                 exit={{opacity: 0, scale: 0.95}}
//                                                 transition={{
//                                                     duration: 0.3,
//                                                     delay: index * 0.05,
//                                                     type: "spring",
//                                                     stiffness: 100,
//                                                     damping: 15
//                                                 }}
//                                             >
//                                                 <ArticleCard
//                                                     id={article.id}
//                                                     title={article.title}
//                                                     description={article.description}
//                                                     image={article.image}
//                                                     date={article.publishedAt}
//                                                     authorImage={article.authorImage}
//                                                     authorName={article.authorName}
//                                                 />
//                                             </motion.div>
//                                         ))}
//                                     </AnimatePresence>
//                                 </div>
//                                 {totalPages > 1 && (
//                                     <div className="mt-12">
//                                         <OptimizedPagination
//                                             currentPage={page + 1}
//                                             totalPages={totalPages}
//                                             onPageChange={paginate}
//                                         />
//                                     </div>
//                                 )}
//                             </>
//                         ) : (
//                             !error && (
//                                 <NoArticlesFound
//                                     onReset={() => {
//                                         // FilterProviderOld handles the reset internally
//                                     }}
//                                     hasFilters={filters.searchQuery || filters.categories.length > 0 || filters.tags.length > 0}
//                                 />
//                             )
//                         )}
//                     </div>
//                 </FilterProvider>
//             </div>
//         </div>
//     );
// }
//
// // Skeleton Loader for Articles
// function ArticlesSkeletonLoader({ count = 6 }) {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {Array.from({ length: count }).map((_, index) => (
//                 <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
//                     <div className="aspect-[16/9] bg-gray-200 rounded-t-lg"></div>
//                     <div className="p-5">
//                         <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
//                         {/* Category placeholder */}
//                         <div className="h-6 bg-gray-200 rounded w-4/5 mb-3"></div>
//                         {/* Title */}
//                         <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
//                         {/* Description line 1 */}
//                         <div className="h-4 bg-gray-200 rounded w-5/6 mb-5"></div>
//                         {/* Description line 2 */}
//                         <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
//                             <div className="flex items-center space-x-3">
//                                 <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
//                                 <div className="h-4 bg-gray-200 rounded w-24"></div>
//                                 {/* Author */}
//                             </div>
//                             <div className="h-4 bg-gray-200 rounded w-16"></div>
//                             {/* Date */}
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }
//
// // No Articles Found Component
// function NoArticlesFound({ onReset, hasFilters }) {
//     return (
//         <motion.div
//             initial={{opacity: 0, y: 10}}
//             animate={{opacity: 1, y: 0}}
//             className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 md:p-16 text-center"
//         >
//             <div className="flex flex-col items-center justify-center">
//                 <SearchX size={48} className="text-emerald-400 mb-5"/>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Məqalə Tapılmadı</h3>
//                 <p className="text-gray-600 max-w-md mx-auto mb-6">
//                     {hasFilters
//                         ? "Seçdiyiniz filtrlərə uyğun nəticə yoxdur. Filtrləri dəyişməyi və ya sıfırlamağı yoxlayın."
//                         : "Heç bir məqalə tapılmadı. Zəhmət olmasa daha sonra yenidən yoxlayın."}
//                 </p>
//                 {hasFilters && (
//                     <button
//                         onClick={onReset}
//                         className="inline-flex items-center gap-2 px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
//                     >
//                         <RotateCcw size={16}/> Filtrləri Sıfırla
//                     </button>
//                 )}
//             </div>
//         </motion.div>
//     );
// }
//
// // Pagination Component (Memoized)
// const OptimizedPagination = memo(function Pagination({ currentPage, totalPages, onPageChange }) {
//     if (totalPages <= 1) return null;
//
//     // Basic pagination logic (can be extended for ellipsis, etc.)
//     const pages = [];
//     const maxVisiblePages = 5; // Adjust as needed
//     let startPage, endPage;
//
//     if (totalPages <= maxVisiblePages) {
//         startPage = 1;
//         endPage = totalPages;
//     } else {
//         const maxPagesBeforeCurrent = Math.floor((maxVisiblePages - 1) / 2);
//         const maxPagesAfterCurrent = Math.ceil((maxVisiblePages - 1) / 2);
//
//         if (currentPage <= maxPagesBeforeCurrent) {
//             startPage = 1;
//             endPage = maxVisiblePages;
//         } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
//             startPage = totalPages - maxVisiblePages + 1;
//             endPage = totalPages;
//         } else {
//             startPage = currentPage - maxPagesBeforeCurrent;
//             endPage = currentPage + maxPagesAfterCurrent;
//         }
//     }
//
//     for (let i = startPage; i <= endPage; i++) {
//         pages.push(i);
//     }
//
//     const showFirstEllipsis = startPage > 2;
//     const showLastEllipsis = endPage < totalPages - 1;
//
//     return (
//         <div aria-label="Səhifələmə" className="mt-10 flex justify-center items-center space-x-1">
//             <button
//                 onClick={() => onPageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors ${
//                     currentPage === 1
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm"
//                 }`}
//                 aria-label="Əvvəlki səhifə"
//                 aria-disabled={currentPage === 1}
//             >
//                 <ChevronLeft className="h-5 w-5" />
//             </button>
//
//             {/* First page link */}
//             {startPage > 1 && (
//                 <button
//                     onClick={() => onPageChange(1)}
//                     className="px-4 py-2 rounded-md text-sm font-medium min-w-[36px] transition-colors bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm"
//                     aria-label="Birinci səhifə"
//                 >
//                     1
//                 </button>
//             )}
//
//             {/* Ellipsis at the start */}
//             {showFirstEllipsis && (
//                 <span className="px-2 py-2 text-sm font-medium text-gray-500">...</span>
//             )}
//
//             {/* Page number buttons */}
//             {pages.map(page => (
//                 <button
//                     key={page}
//                     onClick={() => onPageChange(page)}
//                     className={`px-4 py-2 rounded-md text-sm font-medium min-w-[36px] transition-colors border shadow-sm ${
//                         currentPage === page
//                             ? "bg-emerald-600 text-white border-emerald-600 z-10"
//                             : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"
//                     }`}
//                     aria-current={currentPage === page ? 'page' : undefined}
//                     aria-label={`Səhifə ${page}`}
//                 >
//                     {page}
//                 </button>
//             ))}
//
//             {/* Ellipsis at the end */}
//             {showLastEllipsis && (
//                 <span className="px-2 py-2 text-sm font-medium text-gray-500">...</span>
//             )}
//
//             {/* Last page link */}
//             {endPage < totalPages && (
//                 <button
//                     onClick={() => onPageChange(totalPages)}
//                     className="px-4 py-2 rounded-md text-sm font-medium min-w-[36px] transition-colors bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm"
//                     aria-label="Sonuncu səhifə"
//                 >
//                     {totalPages}
//                 </button>
//             )}
//
//             <button
//                 onClick={() => onPageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className={`px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors ${
//                     currentPage === totalPages
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm"
//                 }`}
//                 aria-label="Növbəti səhifə"
//                 aria-disabled={currentPage === totalPages}
//             >
//                 <ChevronRight className="h-5 w-5" />
//             </button>
//         </div>
//     );
// });
