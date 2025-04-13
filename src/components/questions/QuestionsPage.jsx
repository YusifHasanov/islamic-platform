// Usage example in QuestionsPage
"use client"
import React, {useState, useEffect, useCallback, useRef, memo} from "react";
import { FilterProvider } from "@/components/common/Filter/FilterProvider";
import HttpClient from "@/util/HttpClient";
import useDebounce from "@/hooks/useDebounce";
import {formatDate} from "@/util/DateUtil";
import {motion} from "framer-motion";
import Link from "next/link";
import {Calendar, ChevronDown, ChevronLeft, ChevronRight, Clock, MessageSquare, TagIcon} from "lucide-react";


export default function QuestionsPage() {
    // --- State Variables ---
    const [questions, setQuestions] = useState([]);
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
    const fetchQuestions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                maxResult: "9",
                containsTag: '1',
                containsCategory: '1',
            });

            if (debouncedSearchQuery) params.set('searchQuery', debouncedSearchQuery);
            if (filters.categories.length > 0) params.set('categoryIds', filters.categories.map(c => c.id).join(','));
            if (filters.tags.length > 0) params.set('tagIds', filters.tags.map(t => t.id).join(','));

            const response = await HttpClient.get(`/questions?${params.toString()}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

            const content = data?.content || [];
            const pageInfo = data?.page || {};

            // Transform the data as needed...
            setQuestions(content.map((q) => ({
                id: q.id,
                question: q.question ?? "Sual başlığı yoxdur",
                answer: q.answer ?? "Cavab yoxdur",
                categories: Array.isArray(q.categories) ? q.categories.map(c => ({ id: c.id, name: c.name })) : [],
                tags: Array.isArray(q.tags) ? q.tags.map(t => ({ id: t.id, name: t.name })) : [],
                createdDate: q.createdDate || new Date().toISOString(),
                readCount: q.viewCount ?? Math.floor(Math.random() * 100) + 10,
            })));
            setTotalPages(pageInfo.totalPages ?? 1);
        } catch (err) {
            console.error("Error fetching questions:", err);
            setError("Suallar yüklənərkən xəta baş verdi.");
            setQuestions([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [page, debouncedSearchQuery, filters.categories, filters.tags]);

    // Fetch questions when relevant state changes
    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    // Reset page when filters change
// Add a guard to prevent unnecessary state updates
    useEffect(() => {
        if (page !== 0) {
            setPage(0);
        }
    }, [debouncedSearchQuery, filters.categories, filters.tags, page]); // Include page in dependencies

    // Handle filter changes
    const handleFiltersChange = useCallback((newFilters) => {
        // Only update if the filters have actually changed
        if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
            setFilters(newFilters);
        }
    }, [filters]); // Add filters as dependency

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
                        {/* Header content... */}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 relative">
                {/* Use our new FilterProvider component */}
                <FilterProvider
                    initialCategories={[]}
                    initialTags={[]}
                    initialSearchQuery=""
                    onFiltersChange={handleFiltersChange}
                    searchPlaceholder="Suallar arasında axtar..."
                    searchInputRef={searchInputRef}
                >
                    {/* Questions List Area */}
                    <div id="questions-list-start" className="mt-6">
                        {error && (
                            <div className="my-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <QuestionsSkeletonLoader count={9} />
                        ) : questions.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 gap-5">
                                    {questions.map((question) => (
                                        <OptimizedQuestionCard key={question.id} question={question} />
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
                                <NoQuestionsFound
                                    onReset={() => {
                                        // FilterProvider handles the reset internally
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


// Question Card (Memoized + Animation Fix)
const OptimizedQuestionCard = memo(function QuestionCard({ question }) {
  // console.log("Rendering QuestionCard:", question.id); // For debugging memoization
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedDate = formatDate(question.createdDate); // Assuming formatDate handles potential errors

  const answerPreviewThreshold = 180; // Characters
  const collapsedHeight = "4.5rem"; // Approx 3 lines (adjust as needed based on font/line-height)
  const answerText = question.answer || "Cavab mövcud deyil."; // Fallback for empty answer
  const needsExpansion = answerText.length > answerPreviewThreshold;

  return (
      // Outer motion for list animations (if needed, e.g., with AnimatePresence on the list)
      <motion.div
          layout // Enable layout animation for smooth resizing when content changes
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          // exit animation can be added if list uses AnimatePresence
          transition={{ duration: 0.3, type: "spring", stiffness: 100, damping: 20 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:border-gray-200 hover:shadow-md transition-shadow duration-200" // Use transition-shadow
      >
        <div className="p-5 md:p-6">
          <h2 className="text-lg font-semibold text-justify text-gray-900 mb-3">
            {question.question}
          </h2>
          <div className="text-gray-600 text-sm leading-relaxed mb-4 relative">
            {/* Inner motion for height animation */}
            <motion.div
                // *** ANIMATION FIX ***
                // Set initial height correctly based on whether it needs expansion and is initially collapsed.
                // This prevents the "opening" animation on first render for cards that start collapsed.
                initial={needsExpansion ? { height: collapsedHeight } : { height: "auto" }}
                // Animate height based on isExpanded state *only if* expansion is needed
                animate={{ height: isExpanded || !needsExpansion ? "auto" : collapsedHeight }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden text-justify" // Crucial for clipping content during animation
            >
              {/* Render the full answer text */}
              {answerText}
            </motion.div>

            {/* Gradient overlay: Only show when collapsed AND needs expansion */}
            {!isExpanded && needsExpansion && (
                <div
                    className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-100% pointer-events-none" // Increased height slightly
                ></div>
            )}

            {/* Toggle button: Only show if expansion is needed */}
            {needsExpansion && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    // CHANGE HERE: Use an even darker shade
                    className="text-emerald-800 hover:text-emerald-900 font-medium text-sm mt-2 flex items-center focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-1 rounded"
                    aria-expanded={isExpanded}
                >
                  {isExpanded ? 'Daha az göstər' : 'Daha çox göstər'}
                  {isExpanded ? <ChevronUp className="ml-1 h-4 w-4"/> : <ChevronDown className="ml-1 h-4 w-4"/>}
                </button>
            )}
          </div>
          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map(tag => (
                    <Link key={tag.id}
                          href={`/questions?tag=${tag.id}&page=1`} // Consider how tag links interact with current filters
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
                  <span className="flex items-center" title="Yaradılma tarixi">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                    {formattedDate}
                  </span>
            <div className="flex items-center gap-x-3">
              {question.categories && question.categories.length > 0 && (
                  <span className="flex items-center" title="Kateqoriyalar">
                              <MessageSquare className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    {question.categories.length} kateqoriya
                          </span>
              )}
              {question.readCount != null && ( // Check for null/undefined explicitly
                  <span className="flex items-center" title="Oxunma sayı">
                              <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    {question.readCount} oxunma
                          </span>
              )}
            </div>
          </div>
        </div>
        {/* Link to Full Question */}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
          <Link href={`/questions/${question.id}`} className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:ring-offset-1 rounded -m-1 p-1">
            Tam cavabı oxu <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </motion.div>
  );
});


// Skeleton Loader (No changes needed, usually not performance critical unless very complex)
function QuestionsSkeletonLoader({ count = 6 }) {
  return (
      <div className="grid grid-cols-1 gap-5">
        {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
              <div className="p-5 md:p-6">
                <div className="h-6 bg-gray-200 rounded w-4/5 mb-4"></div>
                <div className="space-y-2 mb-5"><div className="h-4 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded w-5/6"></div></div>
                <div className="flex flex-wrap gap-2 mb-5"><div className="h-5 bg-gray-200 rounded-full w-16"></div><div className="h-5 bg-gray-200 rounded-full w-20"></div></div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100"><div className="h-4 bg-gray-200 rounded w-24"></div><div className="h-4 bg-gray-200 rounded w-32"></div></div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </div>
            </div>
        ))}
      </div>
  );
}

// No Questions Found Component (Memoization less critical here)
function NoQuestionsFound({ onReset, hasFilters }) {
  return (
      <div className="text-center py-16 px-6 bg-white rounded-xl border border-gray-100 shadow-sm my-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-6"><Search className="h-8 w-8" /></div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Heç bir sual tapılmadı</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm leading-relaxed">{hasFilters ? "Seçdiyiniz filtrlərə uyğun nəticə yoxdur. Filtrləri dəyişməyi və ya sıfırlamağı yoxlayın." : "Görünür, hələ heç bir sual əlavə edilməyib. Zəhmət olmasa daha sonra təkrar yoxlayın."}</p>
        {hasFilters && (<button onClick={onReset} className="inline-flex items-center gap-2 px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"><RotateCcw size={16}/> Filtrləri Sıfırla</button>)}
      </div>
  );
}

// Pagination Component (Memoized)
const OptimizedPagination = memo(function Pagination({ currentPage, totalPages, onPageChange }) {
  // console.log("Rendering Pagination"); // For debugging memoization
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
