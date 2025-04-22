"use client"
import React, {useState, memo} from "react";
import {motion} from "framer-motion";
import {
    Calendar,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Clock,
    MessageSquare,
    RotateCcw,
    Search,
    TagIcon
} from "lucide-react";
import Link from "next/link";
import {formatDate} from "@/util/DateUtil";
import useFilterStore from "@/store/useFilterStore";

// Question Card (Memoized + Animation Fix)
export const OptimizedQuestionCard = memo(function QuestionCard({question}) {
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
            initial={{opacity: 0, y: 15}}
            animate={{opacity: 1, y: 0}}
            // exit animation can be added if list uses AnimatePresence
            transition={{duration: 0.3, type: "spring", stiffness: 100, damping: 20}}
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
                        initial={needsExpansion ? {height: collapsedHeight} : {height: "auto"}}
                        // Animate height based on isExpanded state *only if* expansion is needed
                        animate={{height: isExpanded || !needsExpansion ? "auto" : collapsedHeight}}
                        transition={{duration: 0.3, ease: "easeInOut"}}
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
                            {isExpanded ? <ChevronUp className="ml-1 h-4 w-4"/> :
                                <ChevronDown className="ml-1 h-4 w-4"/>}
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
                              <span
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 group-hover:bg-blue-200 transition-colors cursor-pointer">
                                  <TagIcon className="mr-1 h-3 w-3"/>{tag.name}
                              </span>
                            </Link>
                        ))}
                    </div>
                )}
                {/* Meta Info */}
                <div
                    className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <span className="flex items-center" title="Yaradılma tarixi">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400"/>
                      {formattedDate}
                  </span>
                    <div className="flex items-center gap-x-3">
                        {question.categories && question.categories.length > 0 && (
                            <span className="flex items-center" title="Kateqoriyalar">
                              <MessageSquare className="h-3.5 w-3.5 mr-1 text-gray-400"/>
                                {question.categories.length} kateqoriya
                          </span>
                        )}
                        {question.readCount != null && ( // Check for null/undefined explicitly
                            <span className="flex items-center" title="Oxunma sayı">
                              <Clock className="h-3.5 w-3.5 mr-1 text-gray-400"/>
                                {question.readCount} oxunma
                          </span>
                        )}
                    </div>
                </div>
            </div>
            {/* Link to Full Question */}
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <Link href={`/questions/${question.id}`}
                      className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:ring-offset-1 rounded -m-1 p-1">
                    Tam cavabı oxu <ChevronRight className="ml-1 h-4 w-4"/>
                </Link>
            </div>
        </motion.div>
    );
});

// Skeleton Loader
export function QuestionsSkeletonLoader({count = 6}) {
    return (
        <div className="grid grid-cols-1 gap-5">
            {Array.from({length: count}).map((_, index) => (
                <div key={index}
                     className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
                    <div className="p-5 md:p-6">
                        <div className="h-6 bg-gray-200 rounded w-4/5 mb-4"></div>
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

// No Questions Found Component
// NoQuestionsFound Component - Fixed Version
export function NoQuestionsFound({onReset, hasFilters}) {
    const {clearFilters} = useFilterStore();
    const [isResetting, setIsResetting] = useState(false);

    // Handle the reset with a flag to prevent double API calls
    const handleReset = () => {
        // If already resetting, do nothing
        if (isResetting) return;

        // Clear filters (this will set isResetting=true in the store)
        clearFilters();

        // If parent has a reset handler, call it after filters are cleared
        if (typeof onReset === 'function') {
            setTimeout(() => {
                onReset();
            }, 100);
        }
    };

    return (
        <div className="text-center py-16 px-6 bg-white rounded-xl border border-gray-100 shadow-sm my-6">
            <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-6">
                <Search className="h-8 w-8"/>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Heç bir sual tapılmadı</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm leading-relaxed">
                {hasFilters
                    ? "Seçdiyiniz filtrlərə uyğun nəticə yoxdur. Filtrləri dəyişməyi və ya sıfırlamağı yoxlayın."
                    : "Görünür, hələ heç bir sual əlavə edilməyib. Zəhmət olmasa daha sonra təkrar yoxlayın."}
            </p>
            {hasFilters && (
                <button
                    onClick={handleReset}
                    disabled={isResetting}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white ${
                        isResetting
                            ? "bg-emerald-400 cursor-not-allowed"
                            : "bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    } transition-colors`}
                >
                    <RotateCcw size={16}/> {isResetting ? 'Sıfırlanır...' : 'Filtrləri Sıfırla'}
                </button>
            )}
        </div>
    );
}

// Pagination Component (Memoized)
export const OptimizedPagination = memo(function Pagination({currentPage, totalPages, onPageChange}) {
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
                <ChevronLeft className="h-5 w-5"/>
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
                <ChevronRight className="h-5 w-5"/>
            </button>
        </div>
    );
});
