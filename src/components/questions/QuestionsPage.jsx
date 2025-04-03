"use client"
import React, { useEffect, useState, useRef, useCallback, memo } from "react" // Import React and memo
import HttpClient from "@/util/HttpClient"
import Link from "next/link"
import {
    Search,
    Filter, // Keep for mobile trigger icon
    Tag,
    X,
    ChevronDown,
    ChevronUp,
    MessageSquare,
    Clock,
    Calendar,
    ChevronLeft,
    ChevronRight,
    ListFilter, // Use for sidebar header and mobile trigger
    RotateCcw, // Icon for Reset
    BookOpen, HelpCircle, // Icon for Page Header
} from "lucide-react"
import CacheProvider from "@/util/CacheProvider"
import { motion, AnimatePresence } from "framer-motion"
import { formatDate } from "@/util/DateUtil"; // Ensure this utility exists and works

// --- Constants ---
const QUESTIONS_PER_PAGE = 9;
const SEARCH_DEBOUNCE_TIME = 300; // milliseconds

// --- Custom Hook for Debouncing ---
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}


// --- Main Page Component ---
export default function QuestionsPage() {
  // --- State Variables ---
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQueryInput, setSearchQueryInput] = useState("");
  const debouncedSearchQuery = useDebounce(searchQueryInput, SEARCH_DEBOUNCE_TIME);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [page, setPage] = useState(0); // 0-indexed page for API
  const [totalPages, setTotalPages] = useState(1);
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  const searchInputRef = useRef(null);
  const mobileFilterRef = useRef(null);

  // --- Data Fetching ---
  // Using useCallback here is fine, but its primary benefit comes when passed
  // as a prop to memoized children. Since it's used in useEffect, the effect's
  // dependency array already controls when it runs.
  const fetchQuestions = useCallback(async (currentPage, currentSearch, currentCategories, currentTags) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        maxResult: QUESTIONS_PER_PAGE.toString(),
        containsTag: '1', // Keep if needed by API
        containsCategory: '1', // Keep if needed by API
      });
      if (currentSearch) params.set('searchQuery', currentSearch);
      if (currentCategories.length > 0) params.set('categoryIds', currentCategories.map(c => c.id).join(','));
      if (currentTags.length > 0) params.set('tagIds', currentTags.map(t => t.id).join(','));

      const response = await HttpClient.get(`/questions?${params.toString()}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      const content = data?.content || [];
      const pageInfo = data?.page || {};

      if (!Array.isArray(content)) throw new Error("Invalid data format: 'content' is not an array.");

      const receivedQuestions = content.map((q) => ({
        id: q.id,
        question: q.question ?? "Sual başlığı yoxdur",
        answer: q.answer ?? "Cavab yoxdur",
        categories: Array.isArray(q.categories) ? q.categories.map(c => ({ id: c.id, name: c.name })) : [],
        tags: Array.isArray(q.tags) ? q.tags.map(t => ({ id: t.id, name: t.name })) : [],
        createdDate: q.createdDate || new Date().toISOString(),
        readCount: q.viewCount ?? Math.floor(Math.random() * 100) + 10, // Using viewCount if available
      }));

      setQuestions(receivedQuestions);
      setTotalPages(pageInfo.totalPages ?? 1);

    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Suallar yüklənərkən xəta baş verdi.");
      setQuestions([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, []); // No state dependencies needed here as they are passed in via useEffect

  // Fetch metadata (using useCallback is good practice here)
  const fetchMetadata = useCallback(async () => {
    try {
      // Use caching to avoid redundant requests
      const [categoriesData, tagsData] = await Promise.all([
        CacheProvider.fetchData("categories", 300, () => HttpClient.get("/categories")),
        CacheProvider.fetchData("tags", 300, () => HttpClient.get("/tags")),
      ]);
      setAllCategories(Array.isArray(categoriesData) ? categoriesData : []);
      setAllTags(Array.isArray(tagsData) ? tagsData : []);
    } catch (error) {
      console.error("Error fetching metadata:", error);
      // Optionally set an error state for metadata loading
      setAllCategories([]);
      setAllTags([]);
    }
  }, []); // Empty dependency array means this runs once on mount

  // --- Effects ---
  // Fetch metadata on mount
  useEffect(() => {
    fetchMetadata();
  }, [fetchMetadata]);

  // Fetch questions when relevant state changes
  useEffect(() => {
    // fetchQuestions itself is stable due to useCallback
    fetchQuestions(page, debouncedSearchQuery, selectedCategories, selectedTags);
  }, [page, debouncedSearchQuery, selectedCategories, selectedTags, fetchQuestions]);

  // Reset page when filters or search change
  useEffect(() => {
    // Only reset if the page is not already 0
    if (page !== 0) {
      setPage(0);
    }
    // IMPORTANT: This effect should *only* depend on the filters/search themselves.
    // Do NOT add `page` to this dependency array, or it will cause an infinite loop
    // when combined with the previous effect.
  }, [debouncedSearchQuery, selectedCategories, selectedTags]);

  // Click Outside Handler for Mobile Filter
  useEffect(() => {
    const handleClickOutside = (event) => {
      const triggerButton = document.getElementById('mobile-filter-trigger');
      if ( mobileFilterRef.current && !mobileFilterRef.current.contains(event.target) && (!triggerButton || !triggerButton.contains(event.target)) ) {
        setIsMobileFilterVisible(false);
      }
    };
    if (isMobileFilterVisible) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileFilterVisible]);


  // --- Filter & Pagination Handlers (wrapped in useCallback for stable refs) ---
  const handleCategoryToggle = useCallback((category) => {
    setSelectedCategories(prev =>
        prev.some(c => c.id === category.id)
            ? prev.filter(c => c.id !== category.id)
            : [...prev, category]
    );
    // Page reset is handled by the useEffect hook watching selectedCategories
  }, []);

  const handleTagToggle = useCallback((tag) => {
    setSelectedTags(prev =>
        prev.some(t => t.id === tag.id)
            ? prev.filter(t => t.id !== tag.id)
            : [...prev, tag]
    );
    // Page reset is handled by the useEffect hook watching selectedTags
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchQueryInput(event.target.value);
    // Page reset is handled by the useEffect hook watching debouncedSearchQuery
  }, []);

  const clearSearchInput = useCallback(() => {
    setSearchQueryInput("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    // Page reset handled by useEffect
  }, []); // Dependency on searchInputRef.current isn't needed for useCallback

  const clearFilters = useCallback((focusSearch = true) => {
    setSearchQueryInput("");
    setSelectedCategories([]);
    setSelectedTags([]);
    // setPage(0); // Page reset is now handled by the useEffect watching the filters/search
    if (focusSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    setIsMobileFilterVisible(false);
  }, []); // No dependencies needed for these state setters

  // Pagination handler (updates 0-indexed page state)
  const paginate = useCallback((newPage) => { // newPage is 1-indexed from Pagination component
    const zeroIndexedPage = newPage - 1;
    if (zeroIndexedPage >= 0 && zeroIndexedPage < totalPages) {
      setPage(zeroIndexedPage);
      // Optional scroll to top of list
      // document.getElementById('questions-list-start')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [totalPages]); // Depends on totalPages


  const hasActiveFilters = debouncedSearchQuery || selectedCategories.length > 0 || selectedTags.length > 0;
  const hasFilterInputs = searchQueryInput || selectedCategories.length > 0 || selectedTags.length > 0; // Use this for UI like clear button visibility


  // --- Render ---
  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white">
          {/* Header */}
          <div className="bg-white border-b border-gray-200">
              <div
                  className="container mx-auto px-4 py-12 md:py-16"> {/* Removed text-center for better button placement */}
                  <div
                      className="flex flex-col md:flex-row justify-between items-center gap-4"> {/* Flex layout for title and button */}
                      {/* Left side: Title and description */}
                      <div className="text-center md:text-left">
                          <BookOpen size={48} className="text-emerald-600 mx-auto md:mx-0 mb-4"/>
                          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">Suallar və
                              Cavablar</h1>
                          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto md:mx-0">
                              Tez-tez verilən suallara cavabları kəşf edin və axtardığınız məlumatı tapın.
                          </p>
                      </div>

                      {/* Right side: Ask Question Button */}
                      <div className="mt-6 md:mt-0 flex-shrink-0">
                          <Link
                              href="/questions/ask"
                              className="
            inline-flex items-center justify-center gap-2          {/* Flex alignment */}
            px-5 py-2.5                                           {/* Padding */}
            text-sm font-semibold                                {/* Font styling */}
            text-white
            bg-emerald-500                                       {/* Slightly brighter base */}
            rounded-lg                                             {/* Rounding */}
            shadow-[0_4px_14px_0_rgb(0,194,120,38%)]                {/* Custom colored shadow */}
            transition-all duration-200 ease-in-out                {/* Transitions */}
            hover:bg-emerald-600                                   {/* Darker on hover */}
            hover:shadow-[0_6px_20px_0_rgb(0,194,120,23%)]         {/* Softer, wider shadow on hover */}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 {/* Focus adjusted slightly */}
            transform hover:-translate-y-px                       {/* Hover lift */}
        "
                              // Example custom shadow definition (add to tailwind.config.js if using often):
                              // theme: { extend: { boxShadow: { 'emerald-glow': '0 4px 14px 0 rgb(0,194,120,38%)' } } }
                          >
                              <HelpCircle size={18} strokeWidth={2.5}/>
                              Sual Ver
                          </Link>
                      </div>
                  </div>
              </div>
          </div>

          <div className="container mx-auto px-4 py-8 relative">
              <div className="lg:grid lg:grid-cols-4 lg:gap-8 items-start">

                  {/* Filter Sidebar (Desktop) */}
                  <aside className="hidden h-full lg:block lg:col-span-1">
                      <div className="sticky top-8 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                          {/* Memoized Sidebar */}
                          <OptimizedFilterSidebarContent
                              allCategories={allCategories}
                              allTags={allTags}
                              selectedCategories={selectedCategories}
                              selectedTags={selectedTags}
                              onCategoryToggle={handleCategoryToggle}
                              onTagToggle={handleTagToggle}
                              onClearFilters={() => clearFilters(false)} // Pass stable callback
                              hasActiveFilters={hasFilterInputs} // Use input state for immediate UI feedback
                          />
                      </div>
                  </aside>

                  {/* Main Content Area */}
                  <main className="lg:col-span-3">
                      {/* Top Bar: Search & Mobile Filter Trigger */}
                      <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
                      <div className="relative flex-grow w-full">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                  <Search className="h-5 w-5 text-gray-400"/>
                              </div>
                              <input
                                  ref={searchInputRef}
                                  type="search"
                                  placeholder="Suallar arasında axtar..."
                                  value={searchQueryInput}
                                  onChange={handleSearchChange} // Use useCallback wrapped handler
                                  className="block w-full pl-11 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-base"
                              />
                              {searchQueryInput && (
                                  <button onClick={clearSearchInput}
                                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                          aria-label="Axtarışı təmizlə">
                                      <X className="h-5 w-5"/>
                                  </button>
                              )}
                          </div>
                          {/* Mobile Filter Trigger Button */}
                          <button id="mobile-filter-trigger" onClick={() => setIsMobileFilterVisible(v => !v)}
                                  className="flex lg:hidden items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 w-full md:w-auto shadow-sm relative"
                                  aria-haspopup="true" aria-expanded={isMobileFilterVisible}>
                              <ListFilter className="h-5 w-5"/>
                              <span>Filtrlər</span>
                              {/* Use hasFilterInputs for immediate badge update */}
                              {hasFilterInputs && (<span
                                  className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-emerald-600 rounded-full">{selectedCategories.length + selectedTags.length + (searchQueryInput ? 1 : 0)}</span>)}
                          </button>
                      </div>

                      {/* Active Filters Display (Memoized) */}
                      <OptimizedActiveFiltersDisplay
                          searchQuery={searchQueryInput} // Display current input value
                          selectedCategories={selectedCategories}
                          selectedTags={selectedTags}
                          onClearSearch={clearSearchInput} // Use stable callback
                          onRemoveCategory={handleCategoryToggle} // Use stable callback
                          onRemoveTag={handleTagToggle} // Use stable callback
                          onClearAll={() => clearFilters(false)} // Pass stable callback
                      />

                      {/* Questions List Area */}
                      <div id="questions-list-start" className="mt-6">
                          {error && (
                              <div
                                  className="my-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
                                  {error}
                              </div>
                          )}

                          {loading ? (
                              <QuestionsSkeletonLoader count={QUESTIONS_PER_PAGE}/>
                          ) : questions.length > 0 ? (
                              <>
                                  <div className="grid grid-cols-1 gap-5">
                                      {/* Use Memoized Question Card */}
                                      {questions.map((question) => (
                                          <OptimizedQuestionCard key={question.id} question={question}/>
                                      ))}
                                  </div>
                                  {totalPages > 1 && (
                                      // Use Memoized Pagination
                                      <OptimizedPagination
                                          currentPage={page + 1} // Pass 1-indexed page
                                          totalPages={totalPages}
                                          onPageChange={paginate} // Use stable callback
                                      />
                                  )}
                              </>
                          ) : (
                              !error &&
                              <NoQuestionsFound onReset={() => clearFilters(true)} hasFilters={hasActiveFilters}/> // Use debounced value here
                          )}
                      </div>
                  </main>
              </div>

              {/* Mobile Filter Panel (Slide-in) */}
              <AnimatePresence>
                  {isMobileFilterVisible && (
                      <>
                          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                                      transition={{duration: 0.3}} className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                                      onClick={() => setIsMobileFilterVisible(false)}/>
                          <motion.div ref={mobileFilterRef} initial={{x: "-100%"}} animate={{x: 0}} exit={{x: "-100%"}}
                                      transition={{type: "tween", duration: 0.3, ease: "easeInOut"}}
                                      className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-50 overflow-y-auto flex flex-col lg:hidden">
                              <div className="p-5 flex-grow">
                                  {/* Memoized Sidebar Content */}
                                  <OptimizedFilterSidebarContent
                                      allCategories={allCategories}
                                      allTags={allTags}
                                      selectedCategories={selectedCategories}
                                      selectedTags={selectedTags}
                                      onCategoryToggle={handleCategoryToggle}
                                      onTagToggle={handleTagToggle}
                                      onClearFilters={() => clearFilters(false)}
                                      hasActiveFilters={hasFilterInputs}
                                  />
                              </div>
                              <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end">
                                  <button onClick={() => setIsMobileFilterVisible(false)}
                                          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm font-medium">Göstər
                                  </button>
                              </div>
                          </motion.div>
                      </>
                  )}
              </AnimatePresence>
          </div>
      </div>
  );
}


// --- Memoized Sub Components ---

// FilterSidebarContent (Memoized)
// --- Memoized Sub Components ---

// Import the new CategoryTreeItem (make sure path is correct)
// import CategoryTreeItem from './CategoryTreeItem'; // Adjust path if needed

// (Include the CategoryTreeItem component code from above here or import it)


// FilterSidebarContent (Modernized with Tree View)
const OptimizedFilterSidebarContent = memo(function FilterSidebarContent({
                                                                             allCategories,
                                                                             allTags,
                                                                             selectedCategories,
                                                                             selectedTags,
                                                                             onCategoryToggle,
                                                                             onTagToggle,
                                                                             onClearFilters,
                                                                             hasActiveFilters,
                                                                         }) {
    // State for expanding the main sections (Categories, Tags)
    // Keep these separate from individual category item expansion
    const [categoriesSectionExpanded, setCategoriesSectionExpanded] = useState(true);
    const [tagsSectionExpanded, setTagsSectionExpanded] = useState(true);

    // console.log("Rendering FilterSidebarContent"); // For debugging memoization

    const selectedCategoryCount = selectedCategories.length;
    const selectedTagCount = selectedTags.length;

    // Prepare categories for the tree structure
    const topLevelCategories = allCategories.filter(cat => !cat.parentId); // Adjust condition if parentId can be 0

    // --- Handler for "All Articles" ---
    // This clears only the *category* selections
    const handleSelectAllCategories = () => {
        // If categories are already cleared, do nothing (or maybe toggle?)
        // For simplicity, let's just clear them.
        if (selectedCategories.length > 0) {
            // Create a synthetic event or pass null if onCategoryToggle doesn't need event
            // We need to clear all selected categories. Since onCategoryToggle likely adds/removes one,
            // we need a different approach or modify onCategoryToggle.
            // Let's assume we call a modified onClearFilters or a new prop for this.
            // Easiest might be to trigger the main clear button logic *just for categories*.

            // Option 1: Call a specific clear function (preferred)
            // Assume you modify the parent to pass `onClearCategoryFilters`
            // onClearCategoryFilters();

            // Option 2: Call the existing toggle for each selected category to remove it
            selectedCategories.forEach(cat => onCategoryToggle(cat));

            // Option 3: Modify onClearFilters to accept a type (less clean)
            // onClearFilters('categories');
        }
        // If no categories were selected, maybe select "all" conceptually?
        // For filtering, clearing is usually the goal of an "All" button.
    };


    return (
        <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-200 flex-shrink-0">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    {/* Use a more relevant icon maybe? ListFilter is okay */}
                    <ListFilter className="h-5 w-5 text-emerald-600" />
                    Filtrlər
                </h3>
                <AnimatePresence>
                    {hasActiveFilters && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => onClearFilters()} // Pass the main clear function
                            className="text-xs font-medium text-emerald-600 hover:text-emerald-800 flex items-center gap-1 p-1 -m-1 rounded hover:bg-emerald-50 transition-colors"
                            aria-label="Bütün filtrləri sıfırla"
                        >
                            <RotateCcw size={14} /> Sıfırla
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Filter Sections Container */}
            {/* Make this div scrollable if content exceeds height */}
            <div className="flex-grow overflow-y-auto space-y-5 pr-1 custom-scrollbar -mr-1">

                {/* === Categories Section (Tree View) === */}
                <div>
                    {/* Section Header Button */}
                    <button
                        onClick={() => setCategoriesSectionExpanded(!categoriesSectionExpanded)}
                        className="flex items-center justify-between w-full mb-2 text-left group p-1 -m-1 rounded hover:bg-gray-100 transition-colors"
                        aria-expanded={categoriesSectionExpanded}
                        aria-controls="categories-filter-content"
                    >
                        <div className="flex items-center gap-2">
                            {/* You might want a category-specific icon here */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-emerald-600">
                                <path fillRule="evenodd" d="M2.25 3A.75.75 0 0 0 1.5 3.75v1.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75v-1.5A.75.75 0 0 0 3.75 3h-1.5ZM1.5 9.75A.75.75 0 0 1 2.25 9h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-1.5ZM2.25 15A.75.75 0 0 0 1.5 15.75v1.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75h-1.5ZM6.04 4.28l-.147.146a.75.75 0 1 0 1.06 1.06l4.5-4.5a.75.75 0 0 0-1.06-1.06l-4.5 4.5ZM6 10.5a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 4.5a.75.75 0 1 0 0 1.5h9a.75.75 0 1 0 0-1.5h-9Z" clipRule="evenodd" />
                            </svg>
                            <h4 className="text-sm font-semibold text-gray-800 group-hover:text-emerald-600">Kateqoriyalar</h4>
                            {selectedCategoryCount > 0 && (
                                <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-1.5 py-0.5 rounded-full ml-auto">
                  {selectedCategoryCount}
                </span>
                            )}
                        </div>
                        <ChevronDown
                            size={18}
                            className={`text-gray-400 group-hover:text-emerald-600 transition-transform duration-200 ${categoriesSectionExpanded ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {/* Categories Content Area */}
                    <AnimatePresence initial={false}>
                        {categoriesSectionExpanded && (
                            <motion.div
                                id="categories-filter-content"
                                key="categories-section-content"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                {/* "All Articles" Button */}
                                {/* Decide if this should be visually selected when selectedCategories.length === 0 */}
                                <button
                                    onClick={handleSelectAllCategories}
                                    className={`
                     flex items-center gap-2 w-full text-left px-2 py-1.5 mb-1 rounded text-sm transition-colors
                     ${selectedCategories.length === 0 ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}
                  `}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                                        <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v1A1.5 1.5 0 0 0 3.5 6h1A1.5 1.5 0 0 0 6 4.5v-1A1.5 1.5 0 0 0 4.5 2h-1ZM2 8.5A1.5 1.5 0 0 1 3.5 7h1A1.5 1.5 0 0 1 6 8.5v1A1.5 1.5 0 0 1 4.5 11h-1A1.5 1.5 0 0 1 2 9.5v-1ZM3.5 12A1.5 1.5 0 0 0 2 13.5v1A1.5 1.5 0 0 0 3.5 16h1a1.5 1.5 0 0 0 1.5-1.5v-1A1.5 1.5 0 0 0 4.5 12h-1ZM8.5 2A1.5 1.5 0 0 0 7 3.5v1A1.5 1.5 0 0 0 8.5 6h1A1.5 1.5 0 0 0 11 4.5v-1A1.5 1.5 0 0 0 9.5 2h-1ZM7 8.5A1.5 1.5 0 0 1 8.5 7h1A1.5 1.5 0 0 1 11 8.5v1A1.5 1.5 0 0 1 9.5 11h-1A1.5 1.5 0 0 1 7 9.5v-1Zm1.5 3.5A1.5 1.5 0 0 0 7 13.5v1a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-1a1.5 1.5 0 0 0-1.5-1.5h-1ZM13.5 2A1.5 1.5 0 0 0 12 3.5v1a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-1A1.5 1.5 0 0 0 14.5 2h-1ZM12 8.5A1.5 1.5 0 0 1 13.5 7h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1Zm1.5 3.5a1.5 1.5 0 0 0-1.5 1.5v1a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-1a1.5 1.5 0 0 0-1.5-1.5h-1Z" />
                                    </svg>
                                    Bütün məqalələr
                                </button>

                                {/* Category Tree Root */}
                                <div className="space-y-0.5 pt-1"> {/* Reduced space between items */}
                                    {topLevelCategories.length > 0 ? topLevelCategories.map((category) => (
                                        <CategoryTreeItem
                                            key={category.id}
                                            category={category}
                                            allCategories={allCategories} // Pass full list down
                                            selectedCategories={selectedCategories}
                                            onCategoryToggle={onCategoryToggle}
                                            level={0} // Start at level 0
                                        />
                                    )) : (
                                        <p className="text-xs text-gray-400 italic px-2 py-1">Kateqoriya yoxdur.</p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* === Tags Section (Remains largely the same) === */}
                <div>
                    <button
                        onClick={() => setTagsSectionExpanded(!tagsSectionExpanded)}
                        className="flex items-center justify-between w-full mb-2 text-left group p-1 -m-1 rounded hover:bg-gray-100 transition-colors"
                        aria-expanded={tagsSectionExpanded}
                        aria-controls="tags-filter-content"
                    >
                        <div className="flex items-center gap-2">
                            <Tag className="w-5 h-5 text-emerald-600"/> {/* Use Tag icon */}
                            <h4 className="text-sm font-semibold text-gray-800 group-hover:text-emerald-600">Taqlər</h4>
                            {selectedTagCount > 0 && (
                                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-1.5 py-0.5 rounded-full ml-auto">
                  {selectedTagCount}
                </span>
                            )}
                        </div>
                        <ChevronDown
                            size={18}
                            className={`text-gray-400 group-hover:text-emerald-600 transition-transform duration-200 ${tagsSectionExpanded ? 'rotate-180' : ''}`}
                        />
                    </button>
                    <AnimatePresence initial={false}>
                        {tagsSectionExpanded && (
                            <motion.div
                                id="tags-filter-content"
                                key="tags-section-content"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="pt-1"> {/* Added padding top */}
                                    <div className="flex flex-wrap gap-1.5 px-1 py-1"> {/* Reduced gap, added padding */}
                                        {allTags.length > 0 ? allTags.map((tag) => (
                                            <button
                                                key={tag.id}
                                                onClick={() => onTagToggle(tag)}
                                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                                                    selectedTags.some(t => t.id === tag.id)
                                                        ? "bg-blue-100 text-blue-800 border-blue-300 ring-blue-300 font-medium" // Slightly softer selected state
                                                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 focus:ring-blue-400"
                                                }`}
                                                aria-pressed={selectedTags.some(t => t.id === tag.id)}
                                            >
                                                {tag.name}
                                            </button>
                                        )) : (
                                            <p className="text-xs text-gray-400 italic px-1.5 py-1">Taq yoxdur.</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div> {/* End Filter Sections Container */}

        </div>
    );
});


// Make sure to include OptimizedActiveFiltersDisplay, OptimizedQuestionCard, etc. below this
// Also include the helper components like QuestionsSkeletonLoader, NoQuestionsFound, OptimizedPagination

// ActiveFiltersDisplay (Memoized)
const OptimizedActiveFiltersDisplay = memo(function ActiveFiltersDisplay({ searchQuery, selectedCategories, selectedTags, onClearSearch, onRemoveCategory, onRemoveTag, onClearAll }) {
  // console.log("Rendering ActiveFiltersDisplay"); // For debugging memoization
  if (!searchQuery && selectedCategories.length === 0 && selectedTags.length === 0) return null;

  const hasAnyFilter = searchQuery || selectedCategories.length > 0 || selectedTags.length > 0;

  return (
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200 ">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">Aktiv filtrlər:</span>
          {searchQuery && (
              <span className="inline-flex items-center gap-1.5 pl-2.5 pr-1 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
            <Search size={12}/> {searchQuery}
                <button onClick={onClearSearch} className="text-gray-500 hover:text-gray-700 flex-shrink-0 ml-1" aria-label="Axtarışı sil">
                <X size={14} />
            </button>
          </span>
          )}
          {selectedCategories.map(category => (
              <span key={category.id} className="inline-flex items-center gap-1.5 pl-2.5 pr-1 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            {category.name}
                <button onClick={() => onRemoveCategory(category)} className="text-emerald-600 hover:text-emerald-800 flex-shrink-0 ml-1" aria-label={`${category.name} kateqoriyasını sil`}>
                <X size={14} />
            </button>
          </span>
          ))}
          {selectedTags.map(tag => (
              <span key={tag.id} className="inline-flex items-center gap-1.5 pl-2.5 pr-1 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {tag.name}
                <button onClick={() => onRemoveTag(tag)} className="text-blue-600 hover:text-blue-800 flex-shrink-0 ml-1" aria-label={`${tag.name} taqını sil`}>
                <X size={14} />
            </button>
          </span>
          ))}
          {hasAnyFilter && (
              <button onClick={() => onClearAll()} className="ml-auto text-xs font-medium text-gray-500 hover:text-red-600 underline flex-shrink-0 self-center">
                Hamısını təmizlə
              </button>
          )}
        </div>
      </div>
  );
});

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
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
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
                className="overflow-hidden" // Crucial for clipping content during animation
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
                                  <Tag className="mr-1 h-3 w-3"/>{tag.name}
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


const CategoryTreeItem = memo(function CategoryTreeItem({
                                                            category,
                                                            allCategories,
                                                            selectedCategories,
                                                            onCategoryToggle,
                                                            level = 0, // Indentation level
                                                        }) {
    const [isExpanded, setIsExpanded] = useState(false); // State for expansion

    // Find direct children of this category
    const children = allCategories.filter(c => c.parentId === category.id);
    const hasChildren = children.length > 0;

    const isSelected = selectedCategories.some(c => c.id === category.id);

    const handleToggleExpand = (e) => {
        e.stopPropagation(); // Prevent triggering category toggle when clicking the chevron
        setIsExpanded(!isExpanded);
    };

    const handleToggleSelect = () => {
        onCategoryToggle(category);
    };

    // Indentation style
    const indentationStyle = { paddingLeft: `${level * 1.25}rem` }; // 1.25rem = pl-5 per level

    return (
        <div className="relative">
            {/* Vertical connecting line for levels > 0 */}
            {level > 0 && (
                <span
                    className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"
                    style={{ left: `${(level -1) * 1.25 + 0.625}rem` }} // Position line between levels
                    aria-hidden="true"
                />
            )}

            {/* Category Row */}
            <div
                className={`flex items-center justify-between group rounded transition-colors cursor-pointer text-sm relative ${isSelected ? 'font-semibold text-emerald-700' : 'text-gray-700' }`}
                style={indentationStyle}
                onClick={handleToggleSelect} // Allow clicking the row to select
            >
                {/* Horizontal connecting line stub */}
                {level > 0 && (
                    <span
                        className="absolute top-1/2 -translate-y-1/2 w-2.5 h-px bg-gray-200"
                        style={{ left: `${(level - 1) * 1.25 + 0.625}rem` }} // Align with vertical line
                        aria-hidden="true"
                    />
                )}

                <div className="flex items-center gap-1.5 py-1.5 flex-grow min-w-0 pr-2">
                    {/* Expansion Chevron (only if has children) */}
                    {hasChildren ? (
                        <button
                            onClick={handleToggleExpand}
                            className={`p-0.5 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-700 flex-shrink-0 ${level > 0 ? '-ml-1' : '' }`} // Slight negative margin for alignment
                            aria-label={isExpanded ? `Collapse ${category.name}` : `Expand ${category.name}`}
                            aria-expanded={isExpanded}
                        >
                            {isExpanded ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
                        </button>
                    ) : (
                        // Placeholder for alignment if no children
                        <span className={`w-[20px] h-[20px] flex-shrink-0 ${level > 0 ? '-ml-1' : '' }`} aria-hidden="true"></span>
                    )}

                    {/* Category Name (allow wrapping) */}
                    <span className="truncate group-hover:text-emerald-600">{category.name}</span>
                </div>

                {/* Selection Indicator (Circle) */}
                <span
                    className={`
                flex-shrink-0 h-5 w-5 border rounded-full flex items-center justify-center mr-1 ml-2
                transition-all duration-150 ease-in-out
                ${isSelected
                        ? 'bg-emerald-600 border-emerald-600 shadow-sm'
                        : 'bg-white border-gray-300 group-hover:border-emerald-400'
                    }
            `}
                    aria-hidden="true"
                >
             {/* Inner dot for selected state */}
                    {isSelected && <span className="h-1.5 w-1.5 bg-white rounded-full"></span>}
         </span>
            </div>

            {/* Children (Render recursively) */}
            <AnimatePresence initial={false}>
                {isExpanded && hasChildren && (
                    <motion.div
                        key="children"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden" // Apply overflow hidden here
                    >
                        {/* Add a container for children to manage spacing/borders if needed */}
                        <div className="pt-1">
                            {children.map((child) => (
                                <CategoryTreeItem
                                    key={child.id}
                                    category={child}
                                    allCategories={allCategories}
                                    selectedCategories={selectedCategories}
                                    onCategoryToggle={onCategoryToggle}
                                    level={level + 1}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});
