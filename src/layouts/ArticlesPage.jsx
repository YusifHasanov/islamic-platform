"use client"
import {useEffect, useState} from "react"
import {useRouter, useSearchParams} from "next/navigation"
import {motion, AnimatePresence} from "framer-motion"
import Image from "next/image"
import ArticleCard from "@/components/articles/ArticleCard"
import Pagination from "@/components/common/Pagination"
import HttpClient from "@/util/HttpClient"
import CacheProvider from "@/util/CacheProvider"
import {ChevronDown, LayoutGrid, FolderTree, SearchX} from "lucide-react" // Added icons

const ArticlesPage = ({page: initialPage = 0, category: initialCategory}) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Helper to safely parse query params
    const getQueryParam = (param, defaultValue) => {
        const value = searchParams.get(param)
        if (param === "page" && value !== null) {
            const num = parseInt(value, 10)
            return !isNaN(num) && num >= 0 ? num : defaultValue
        }
        return value !== null ? value : defaultValue
    }

    const [articles, setArticles] = useState([])
    const [categories, setCategories] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(() => getQueryParam("page", initialPage))
    const [selectedCategory, setSelectedCategory] = useState(() => getQueryParam("category", initialCategory || ""))
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingCategories, setIsLoadingCategories] = useState(true); // Separate loading state for categories
    const [expandedCategories, setExpandedCategories] = useState({})
    const PAGE_SIZE = 12

    // Update state if query params change externally (e.g., browser back/forward)
    useEffect(() => {
        setCurrentPage(getQueryParam("page", initialPage))
        setSelectedCategory(getQueryParam("category", initialCategory || ""))
    }, [searchParams, initialPage, initialCategory])


    // Fetch articles based on current page and selected category
    useEffect(() => {
        setIsLoading(true)
        const fetchArticles = async () => {
            try {
                // Construct URL carefully
                const params = new URLSearchParams({
                    page: currentPage.toString(),
                    size: PAGE_SIZE.toString(),
                });
                if (selectedCategory) {
                    params.set("category", selectedCategory);
                }

                // Assume HttpClient.get returns the full Response object
                const response = await HttpClient.get(`/articles?${params.toString()}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // Parse JSON body

                setArticles(data.content || []) // Ensure it's an array
                setTotalPages(data.totalPages || 0)

            } catch (error) {
                console.error("Error fetching articles:", error)
                setArticles([]) // Reset articles on error
                setTotalPages(0)
                // Optionally set an error state here to display to the user
            } finally {
                setIsLoading(false)
            }
        }

        fetchArticles()
        // Depend on currentPage and selectedCategory which are derived from searchParams
    }, [currentPage, selectedCategory])


    // Fetch categories
    useEffect(() => {
        setIsLoadingCategories(true);
        CacheProvider.fetchData("article_categories", 300, async () => HttpClient.get("/categories")) // Increased cache time
            .then((data) => {
                // Ensure data is an array, default to empty array if not
                const fetchedCategories = Array.isArray(data) ? data : [];
                setCategories(fetchedCategories);
                // Pre-expand categories if a category is selected on load
                if (selectedCategory && fetchedCategories.length > 0) {
                    const initialExpanded = {};
                    let currentId = selectedCategory;
                    while (currentId) {
                        const cat = fetchedCategories.find(c => c.id.toString() === currentId);
                        if (cat && cat.parentId) {
                            initialExpanded[cat.parentId] = true;
                            currentId = cat.parentId.toString();
                        } else {
                            currentId = null;
                        }
                    }
                    setExpandedCategories(initialExpanded);
                }
            })
            .catch((err) => {
                console.error("Error fetching categories:", err)
                setCategories([]) // Reset categories on error
                // Optionally set an error state for categories
            })
            .finally(() => {
                setIsLoadingCategories(false);
            })
        // Run only once on mount unless selectedCategory changes *initially*
        // Note: The dependency array is tricky here. If you want it to re-run if `selectedCategory` changes later,
        // add it, but be mindful of potential infinite loops if not handled carefully with the pre-expansion logic.
        // For now, keeping it simple to run once and handle initial expansion.
    }, []); // Removed selectedCategory dependency to avoid re-running expansion logic on every select


    // Update URL query parameters without causing a full page reload
    const updateQueryParams = (page, category) => {
        const params = new URLSearchParams(searchParams.toString()) // Use current searchParams
        params.set("page", page.toString())
        if (category) {
            params.set("category", category)
        } else {
            params.delete("category")
        }
        // Use router.push with shallow routing or just update URL without navigation if needed
        // router.push(`/articles?${params.toString()}`, undefined, { shallow: true }); // Option 1: Shallow routing (might not refetch if only hash changes)
        router.push(`/articles?${params.toString()}`); // Option 2: Standard push, triggers useEffects based on param changes
    }

    // Handle page change
    const handlePageChange = (newPage) => {
        // setCurrentPage(newPage); // State update will happen via useEffect watching searchParams
        updateQueryParams(newPage, selectedCategory)
    }

    // Handle category selection
    const handleCategorySelect = (categoryId) => {
        const newCategory = categoryId.toString();
        // setSelectedCategory(newCategory); // State update will happen via useEffect watching searchParams
        // setCurrentPage(0); // Reset page, will also update via useEffect
        updateQueryParams(0, newCategory)
    }


    // Toggle category expansion
    const toggleCategory = (categoryId) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }))
    }

    // --- Enhanced Category Tree Rendering ---
    const renderCategoryTree = (parentId = null, level = 0) => {
        const filteredCategories = categories.filter((cat) => {
            // Handle both null/undefined parentId for root level
            const catParentId = cat.parentId === undefined ? null : cat.parentId;
            return catParentId === parentId;
        });

        if (filteredCategories.length === 0) return null

        return (
            <ul className={`transition-all duration-300 ease-in-out ${level > 0 ? "pl-3 border-l border-emerald-100 ml-3" : ""}`}>
                {filteredCategories.map((category) => {
                    const categoryIdStr = category.id.toString(); // Consistent string comparison
                    const hasChildren = categories.some((cat) => cat.parentId === category.id)
                    const isSelected = selectedCategory === categoryIdStr;
                    const isExpanded = expandedCategories[category.id];

                    return (
                        <li key={category.id} className="my-1">
                            <div
                                className={`flex items-center justify-between group rounded-md transition-all duration-150 ease-in-out ${
                                    isSelected ? "bg-emerald-50" : "hover:bg-gray-50"
                                }`}
                            >
                                {/* Clickable area for selecting the category */}
                                <button
                                    onClick={() => handleCategorySelect(category.id)}
                                    className={`flex-grow text-left px-2.5 py-1.5 text-sm truncate ${
                                        isSelected
                                            ? "font-semibold text-emerald-700"
                                            : "text-gray-700 group-hover:text-emerald-600"
                                    }`}
                                    title={category.name} // Add title for potentially truncated names
                                >
                                    {category.name}
                                </button>

                                {/* Expand/Collapse Button (only if has children) */}
                                {hasChildren && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering category select
                                            toggleCategory(category.id);
                                        }}
                                        className="p-1.5 mr-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-300 transition-colors"
                                        aria-label={isExpanded ? "Kateqoriyanı bağla" : "Kateqoriyanı aç"}
                                        aria-expanded={isExpanded}
                                    >
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform duration-200 ${
                                                isExpanded ? "rotate-180" : "rotate-0"
                                            }`}
                                        />
                                    </button>
                                )}
                                {/* Placeholder for alignment if no children */}
                                {!hasChildren && <div className="w-[30px] mr-1"></div>}
                            </div>

                            {/* Recursive call for children with animation */}
                            <AnimatePresence initial={false}>
                                {hasChildren && isExpanded && (
                                    <motion.div
                                        initial={{height: 0, opacity: 0}}
                                        animate={{height: "auto", opacity: 1}}
                                        exit={{height: 0, opacity: 0}}
                                        transition={{duration: 0.25, ease: "easeInOut"}}
                                        className="overflow-hidden pt-1" // Add padding-top for spacing when expanded
                                    >
                                        {renderCategoryTree(category.id, level + 1)}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                    )
                })}
            </ul>
        )
    }
    // --- End of Enhanced Category Tree ---

    // Loading skeleton for articles
    const ArticleSkeleton = () => (
        <div className="bg-white rounded-xl overflow-hidden shadow-md h-full animate-pulse">
            <div className="bg-gray-200 aspect-[16/9]"></div>
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
    )

    // Loading skeleton for categories
    const CategorySkeleton = () => (
        <div className="space-y-3 animate-pulse">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center justify-between">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    {i % 2 === 0 && <div className="h-5 w-5 bg-gray-200 rounded-full"></div>}
                </div>
            ))}
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-emerald-800 to-emerald-600 text-white py-16 md:py-20">
                <div className="absolute inset-0 overflow-hidden opacity-30">
                    {/* Subtle background pattern (optional) */}
                    {/* <svg className="absolute inset-0 h-full w-full stroke-emerald-700/40" fill="none" aria-hidden="true">
                        <defs>
                            <pattern id="pattern-hero" width="72" height="72" patternUnits="userSpaceOnUse" patternTransform="translate(0.5 0.5)">
                                <path d="M0 72V0h72" strokeWidth="1"></path>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#pattern-hero)"></rect>
                    </svg> */}
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
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start"> {/* Use items-start */}
                    {/* Sidebar with Categories */}
                    <div className="lg:col-span-1 h-full">
                        {/* Sticky container */}
                        <div className="sticky top-10 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <FolderTree size={20} className="mr-2 text-emerald-600 flex-shrink-0"/>
                                Kateqoriyalar
                            </h2>
                            <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1"> {/* Scrollable category list */}
                                {isLoadingCategories ? (
                                    <CategorySkeleton/>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleCategorySelect("")}
                                            className={`flex items-center w-full text-left px-2.5 py-1.5 rounded-md text-sm mb-2 transition-colors ${
                                                selectedCategory === ""
                                                    ? "font-semibold text-emerald-700 bg-emerald-50"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                                            }`}
                                        >
                                            <LayoutGrid size={16} className="mr-2 flex-shrink-0"/>
                                            Bütün məqalələr
                                        </button>
                                        {categories.length > 0 ? (
                                            renderCategoryTree()
                                        ) : (
                                            <p className="text-sm text-gray-500 px-2 py-1">Kateqoriya tapılmadı.</p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Articles Grid / Loading / Empty State */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[...Array(PAGE_SIZE)].map((_, index) => ( // Show skeleton for PAGE_SIZE
                                    <ArticleSkeleton key={index}/>
                                ))}
                            </div>
                        ) : articles && articles.length > 0 ? ( // Check articles array exists and has items
                            <>
                                <motion.div
                                    layout // Animate layout changes when articles update
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    <AnimatePresence mode="popLayout"> {/* Use popLayout for smoother transitions */}
                                        {articles.map((article, index) => (
                                            <motion.div
                                                key={article.id} // Ensure key is stable
                                                layout // Animate position changes
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
                                                {/* Pass necessary props */}
                                                <ArticleCard id={article.id}
                                                             key={index}
                                                             title={article.title}
                                                             description={article.description}
                                                             image={article.image}
                                                             date={article.publishedAt}
                                                             authorImage={article.authorImage}
                                                             authorName={article.authorName}/>
                                                {/* Previous way:
                                                <ArticleCard
                                                    id={article.id}
                                                    title={article.title}
                                                    description={article.description}
                                                    image={article.image}
                                                    date={article.publishedAt}
                                                    authorName={article.author?.name} // Example: Access nested author data
                                                    authorImage={article.author?.image} // Example: Access nested author data
                                                    category={article.category?.name} // Example: Access category name
                                                    readTime={article.readTime} // Example: Pass read time if available
                                                /> */}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-12">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            // Enhanced Empty State
                            <motion.div
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 md:p-16 text-center"
                            >
                                <div className="flex flex-col items-center justify-center">
                                    <SearchX size={48} className="text-emerald-400 mb-5"/>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Məqalə Tapılmadı</h3>
                                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                                        {selectedCategory
                                            ? "Bu kateqoriyada heç bir məqalə mövcud deyil."
                                            : "Heç bir məqalə tapılmadı. Zəhmət olmasa daha sonra yenidən yoxlayın."}
                                    </p>
                                    {selectedCategory && ( // Show button only if a category was selected
                                        <button
                                            onClick={() => handleCategorySelect("")}
                                            className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition-all duration-150 ease-in-out shadow-sm hover:shadow-md text-sm font-medium"
                                        >
                                            Bütün Məqalələri Göstər
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticlesPage




// "use client"
// import { useEffect, useState, useMemo, useCallback } from "react" // Added useCallback
// import { useRouter, useSearchParams } from "next/navigation"
// import { motion, AnimatePresence } from "framer-motion"
// import Image from "next/image" // Keep if used within ArticleCard
// import ArticleCard from "@/components/articles/ArticleCard" // Assuming this is styled well
// import Pagination from "@/components/common/Pagination" // Assuming this is styled well
// import HttpClient from "@/util/HttpClient"
// import CacheProvider from "@/util/CacheProvider"
// import { ChevronDown, LayoutGrid, FolderTree, SearchX, Loader2 } from "lucide-react" // Added Loader2
//
// const ArticlesPage = ({ page: initialPage = 0, category: initialCategory }) => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//
//     // --- State ---
//     const [articles, setArticles] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [totalPages, setTotalPages] = useState(0);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isLoadingCategories, setIsLoadingCategories] = useState(true);
//     const [expandedCategories, setExpandedCategories] = useState({});
//     const [error, setError] = useState(null); // State for fetch errors
//
//     // --- Derived State from URL ---
//     // Memoize query param getters for stability if needed elsewhere, but basic is fine here
//     const getQueryParam = useCallback((param, defaultValue) => {
//         const value = searchParams.get(param);
//         if (param === "page" && value !== null) {
//             const num = parseInt(value, 10);
//             // Ensure page is non-negative
//             return !isNaN(num) && num >= 0 ? num : defaultValue;
//         }
//         // For category, allow empty string as default/initial state
//         return value !== null ? value : defaultValue;
//     }, [searchParams]);
//
//     const currentPage = useMemo(() => getQueryParam("page", initialPage), [getQueryParam, initialPage]);
//     const selectedCategory = useMemo(() => getQueryParam("category", initialCategory || ""), [getQueryParam, initialCategory]);
//
//     const PAGE_SIZE = 12; // Articles per page
//
//     // --- Data Fetching Effects ---
//
//     // Fetch Articles
//     useEffect(() => {
//         let isMounted = true; // Prevent state updates on unmounted component
//         setIsLoading(true);
//         setError(null); // Reset error on new fetch
//
//         const fetchArticles = async () => {
//             try {
//                 const params = new URLSearchParams({
//                     page: currentPage.toString(),
//                     size: PAGE_SIZE.toString(),
//                 });
//                 if (selectedCategory) {
//                     params.set("category", selectedCategory);
//                 }
//
//                 const response = await HttpClient.get(`/articles?${params.toString()}`);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const data = await response.json();
//
//                 if (isMounted) {
//                     setArticles(data.content || []);
//                     setTotalPages(data.totalPages || 0);
//                 }
//             } catch (err) {
//                 console.error("Error fetching articles:", err);
//                 if (isMounted) {
//                     setError("Məqalələr yüklənərkən xəta baş verdi.");
//                     setArticles([]);
//                     setTotalPages(0);
//                 }
//             } finally {
//                 if (isMounted) {
//                     setIsLoading(false);
//                 }
//             }
//         };
//
//         fetchArticles();
//
//         return () => {
//             isMounted = false; // Cleanup function
//         };
//     }, [currentPage, selectedCategory]); // Depend only on derived state
//
//     // Fetch Categories & Handle Initial Expansion
//     useEffect(() => {
//         let isMounted = true;
//         setIsLoadingCategories(true);
//
//         CacheProvider.fetchData("article_categories", 600, () => HttpClient.get("/categories")) // Longer cache time
//             .then((data) => {
//                 if (!isMounted) return;
//                 const fetchedCategories = Array.isArray(data) ? data : [];
//                 setCategories(fetchedCategories);
//
//                 // Pre-expand categories only if a category is selected *on initial load*
//                 // or if categories are fetched *after* a selection is already present
//                 if (selectedCategory && fetchedCategories.length > 0) {
//                     setExpandedCategories(prevExpanded => {
//                         // Avoid re-calculating if categories haven't changed significantly (optional optimization)
//                         const initialExpanded = { ...prevExpanded }; // Start with potentially existing state
//                         let currentId = selectedCategory;
//                         const processed = new Set(); // Prevent infinite loops in case of cyclic data
//
//                         while (currentId && !processed.has(currentId)) {
//                             processed.add(currentId);
//                             const cat = fetchedCategories.find(c => c.id.toString() === currentId);
//                             if (cat && cat.parentId) {
//                                 initialExpanded[cat.parentId] = true;
//                                 currentId = cat.parentId.toString();
//                             } else {
//                                 currentId = null; // Reached root or category not found
//                             }
//                         }
//                         return initialExpanded;
//                     });
//                 }
//             })
//             .catch((err) => {
//                 console.error("Error fetching categories:", err);
//                 if (isMounted) setCategories([]);
//                 // Consider setting a category-specific error state
//             })
//             .finally(() => {
//                 if (isMounted) setIsLoadingCategories(false);
//             });
//
//         return () => {
//             isMounted = false;
//         };
//         // Run once on mount, selectedCategory dependency handles initial expansion if needed
//     }, [selectedCategory]);
//
//
//     // --- Handlers ---
//
//     // Update URL (triggers state updates via useEffect watching searchParams)
//     const updateQueryParams = useCallback((page, category) => {
//         const params = new URLSearchParams(searchParams.toString());
//         params.set("page", page.toString());
//         if (category) {
//             params.set("category", category);
//         } else {
//             params.delete("category");
//         }
//         // Push new URL, causing re-render and useEffects to run
//         router.push(`/articles?${params.toString()}`, { scroll: false }); // Prevent scroll jump
//     }, [router, searchParams]);
//
//     // Page Change
//     const handlePageChange = useCallback((newPage) => {
//         updateQueryParams(newPage, selectedCategory);
//     }, [selectedCategory, updateQueryParams]);
//
//     // Category Selection
//     const handleCategorySelect = useCallback((categoryId) => {
//         const newCategory = categoryId ? categoryId.toString() : ""; // Ensure empty string for "all"
//         updateQueryParams(0, newCategory); // Reset to page 0 on category change
//     }, [updateQueryParams]);
//
//     // Category Expansion Toggle
//     const toggleCategory = useCallback((categoryId) => {
//         setExpandedCategories(prev => ({
//             ...prev,
//             [categoryId]: !prev[categoryId],
//         }));
//     }, []);
//
//
//     // --- Category Tree Rendering ---
//     const renderCategoryTree = useCallback((parentId = null, level = 0) => {
//         const filteredCategories = categories.filter((cat) => {
//             const catParentId = cat.parentId === undefined ? null : cat.parentId;
//             return catParentId === parentId;
//         });
//
//         if (filteredCategories.length === 0) return null;
//
//         return (
//             <ul className={`transition-all duration-300 ease-in-out ${level > 0 ? "pl-4 border-l border-gray-200 ml-2.5" : ""}`}>
//                 {filteredCategories.map((category) => {
//                     const categoryIdStr = category.id.toString();
//                     const hasChildren = categories.some((cat) => cat.parentId === category.id);
//                     const isSelected = selectedCategory === categoryIdStr;
//                     const isExpanded = !!expandedCategories[category.id]; // Ensure boolean
//
//                     return (
//                         <li key={category.id} className="my-0.5 relative"> {/* Relative positioning for potential pseudo-elements */}
//                             {/* Optional: Vertical line connector for tree appearance */}
//                             {level > 0 && (
//                                 <span className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" style={{ left: '-0.625rem' }} aria-hidden="true"></span>
//                             )}
//                             <div
//                                 className={`flex items-center justify-between group rounded-md transition-colors duration-150 ease-in-out ${ isSelected ? "bg-emerald-50" : "hover:bg-emerald-50/60" }`}
//                             >
//                                 {/* Optional: Horizontal line connector */}
//                                 {level > 0 && (
//                                     <span className="absolute top-1/2 -mt-px h-px w-2 bg-gray-200" style={{ left: '-0.625rem' }} aria-hidden="true"></span>
//                                 )}
//                                 <button
//                                     onClick={() => handleCategorySelect(category.id)}
//                                     className={`flex-grow text-left px-3 py-2 text-sm truncate min-w-0 ${ isSelected ? "font-semibold text-emerald-800" : "text-gray-700 group-hover:text-emerald-700" }`}
//                                     title={category.name}
//                                 >
//                                     {category.name}
//                                 </button>
//
//                                 {hasChildren && (
//                                     <button
//                                         onClick={(e) => { e.stopPropagation(); toggleCategory(category.id); }}
//                                         className="p-1.5 mr-1 rounded-md text-gray-400 hover:bg-emerald-100 hover:text-emerald-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 transition-colors"
//                                         aria-label={isExpanded ? "Kateqoriyanı bağla" : "Kateqoriyanı aç"}
//                                         aria-expanded={isExpanded}
//                                     >
//                                         <ChevronDown size={16} className={`transition-transform duration-200 ${ isExpanded ? "rotate-180" : "rotate-0" }`} />
//                                     </button>
//                                 )}
//                                 {!hasChildren && <div className="w-[30px] mr-1 flex-shrink-0"></div>} {/* Alignment spacer */}
//                             </div>
//
//                             <AnimatePresence initial={false}>
//                                 {hasChildren && isExpanded && (
//                                     <motion.div
//                                         initial={{ height: 0, opacity: 0 }}
//                                         animate={{ height: "auto", opacity: 1 }}
//                                         exit={{ height: 0, opacity: 0 }}
//                                         transition={{ duration: 0.25, ease: "easeInOut" }}
//                                         className="overflow-hidden pt-0.5" // Slight spacing when open
//                                     >
//                                         {renderCategoryTree(category.id, level + 1)}
//                                     </motion.div>
//                                 )}
//                             </AnimatePresence>
//                         </li>
//                     );
//                 })}
//             </ul>
//         );
//     }, [categories, selectedCategory, expandedCategories, handleCategorySelect, toggleCategory]);
//
//
//     // --- Skeletons ---
//     const ArticleSkeleton = () => (
//         <div className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm h-full animate-pulse">
//             <div className="bg-gray-200 aspect-[16/9]"></div>
//             <div className="p-5">
//                 <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
//                 <div className="h-6 bg-gray-300 rounded w-4/5 mb-4"></div>
//                 <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
//                 <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
//                 <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                         <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
//                         <div className="h-4 bg-gray-200 rounded w-24"></div>
//                     </div>
//                     <div className="h-4 bg-gray-200 rounded w-16"></div>
//                 </div>
//             </div>
//         </div>
//     );
//
//     const CategorySkeleton = ({ count = 6 }) => (
//         <div  className="space-y-3 animate-pulse pt-2">
//             <div className="h-8 bg-gray-200 rounded-md w-full mb-3"></div> {/* Simulating "All Articles" */}
//             {[...Array(count)].map((_, index) => (
//                 <div key={index} className="flex items-center justify-between pl-3">
//                     <div className={`h-6 bg-gray-200 rounded ${index % 3 === 0 ? 'w-1/2' : 'w-3/4'}`}></div>
//                     {index % 2 === 0 && <div className="h-4 w-4 bg-gray-200 rounded-full mr-2"></div>}
//                 </div>
//             ))}
//
//         </div>
//     );
//
//     // --- Render Logic ---
//     return (
//         <div className="bg-gray-50 min-h-screen">
//             {/* Hero Section - Enhanced */}
//             <div className="relative bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 text-white overflow-hidden">
//                 {/* Optional subtle pattern */}
//                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
//                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
//                     <motion.h1
//                         initial={{ opacity: 0, y: -25 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
//                         className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-4 tracking-tight text-shadow" // Add text-shadow utility if desired
//                     >
//                         Məqalələr Arxivi
//                     </motion.h1>
//                     <motion.p
//                         initial={{ opacity: 0, y: -15 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1]  }}
//                         className="text-lg md:text-xl text-center max-w-3xl mx-auto text-emerald-100/90 leading-relaxed"
//                     >
//                         İslam elmləri, əxlaq və gündəlik həyata dair müxtəlif mövzularda dərin biliklər və maarifləndirici yazılar.
//                     </motion.p>
//                 </div>
//             </div>
//
//             {/* Main Content Area */}
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//                 {/* Optional: Display Fetch Error */}
//                 {error && (
//                     <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
//                         {error}
//                     </div>
//                 )}
//
//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 xl:gap-12 items-start">
//                     {/* Sidebar */}
//                     <aside className="lg:col-span-1 h-full">
//                         <div className="sticky top-10 bg-white rounded-lg shadow border border-gray-100/80 p-5">
//                             <h2 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
//                                 <FolderTree size={20} className="text-emerald-600 flex-shrink-0" />
//                                 Kateqoriyalar
//                             </h2>
//                             {/* Scrollable container with refined styling */}
//                             <div className="mt-3 -mr-2 pr-2 max-h-[70vh] overflow-y-auto custom-scrollbar-thin">
//                                 {isLoadingCategories ? (
//                                     <CategorySkeleton />
//                                 ) : (
//                                     <>
//                                         <button
//                                             onClick={() => handleCategorySelect("")} // Pass empty string
//                                             className={`flex items-center w-full text-left px-3 py-2 rounded-md text-sm mb-1 transition-colors duration-150 ease-in-out ${
//                                                 selectedCategory === ""
//                                                     ? "font-semibold text-emerald-800 bg-emerald-100"
//                                                     : "text-gray-700 hover:bg-emerald-50/60 hover:text-emerald-700"
//                                             }`}
//                                         >
//                                             <LayoutGrid size={16} className="mr-2.5 flex-shrink-0 opacity-80" />
//                                             Bütün məqalələr
//                                         </button>
//                                         {categories.length > 0 ? (
//                                             renderCategoryTree()
//                                         ) : (
//                                             <p className="text-sm text-gray-500 px-3 py-2 italic">Kateqoriya tapılmadı.</p>
//                                         )}
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                     </aside>
//
//                     {/* Articles Section */}
//                     <main className="lg:col-span-3">
//                         {isLoading ? (
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 {[...Array(PAGE_SIZE)].map((_, index) => <ArticleSkeleton key={index} />)}
//                             </div>
//                         ) : articles.length > 0 ? (
//                             <>
//                                 {/* Using AnimatePresence for adding/removing items */}
//                                 <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <AnimatePresence mode="popLayout">
//                                         {articles.map((article, index) => (
//                                             <motion.div
//                                                 key={article.id} // MUST be stable ID
//                                                 layout // Animate position changes
//                                                 initial={{ opacity: 0, y: 10, scale: 0.98 }}
//                                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                                 exit={{ opacity: 0, scale: 0.95 }}
//                                                 transition={{
//                                                     duration: 0.35,
//                                                     delay: index * 0.04, // Subtle stagger
//                                                     ease: [0.16, 1, 0.3, 1] // Expo Out
//                                                 }}
//                                             >
//                                                 {/* Ensure ArticleCard handles props correctly */}
//                                                 <ArticleCard
//                                                     id={article.id}
//                                                     title={article.title}
//                                                     description={article.description}
//                                                     image={article.image}
//                                                     date={article.publishedAt} // Or createdDate etc.
//                                                     authorName={article.authorName} // Adjust based on actual data structure
//                                                     authorImage={article.authorImage}
//                                                     // Pass other relevant props if needed
//                                                     // categoryName={article.category?.name}
//                                                 />
//                                             </motion.div>
//                                         ))}
//                                     </AnimatePresence>
//                                 </motion.div>
//
//                                 {totalPages > 1 && (
//                                     <div className="mt-12 md:mt-16">
//                                         <Pagination
//                                             currentPage={currentPage}
//                                             totalPages={totalPages}
//                                             onPageChange={handlePageChange}
//                                         />
//                                     </div>
//                                 )}
//                             </>
//                         ) : (
//                             // Enhanced Empty State
//                             <motion.div
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.5 }}
//                                 className="bg-white rounded-xl shadow border border-gray-100/80 p-12 md:p-20 text-center flex flex-col items-center justify-center min-h-[400px]" // Added min-height
//                             >
//                                 <SearchX size={56} className="text-emerald-400 mb-6 stroke-1" />
//                                 <h3 className="text-2xl font-semibold text-gray-800 mb-3">Məqalə Tapılmadı</h3>
//                                 <p className="text-gray-600 max-w-lg mx-auto mb-8 leading-relaxed">
//                                     {selectedCategory
//                                         ? "Seçilmiş kateqoriya üzrə heç bir məqalə mövcud deyil. Zəhmət olmasa başqa bir kateqoriya seçin."
//                                         : "Sistemdə heç bir məqalə tapılmadı. Daha sonra yenidən yoxlayın."}
//                                 </p>
//                                 {selectedCategory && (
//                                     <button
//                                         onClick={() => handleCategorySelect("")}
//                                         className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 transition-all duration-150 ease-in-out shadow hover:shadow-md text-sm font-medium"
//                                     >
//                                         <LayoutGrid size={18}/>
//                                         Bütün Məqalələri Göstər
//                                     </button>
//                                 )}
//                             </motion.div>
//                         )}
//                     </main>
//                 </div>
//             </div>
//             {/* Add Custom Scrollbar CSS to global styles if needed */}
//             <style jsx global>{`
//               .custom-scrollbar-thin::-webkit-scrollbar { width: 5px; height: 5px; }
//               .custom-scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
//               .custom-scrollbar-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; } /* Tailwind gray-300 */
//               .custom-scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #94a3b8; } /* Tailwind gray-400 */
//               .text-shadow { text-shadow: 0 1px 3px rgba(0,0,0,0.2); } /* Example text shadow */
//             `}</style>
//         </div>
//     );
// };
//
// export default ArticlesPage;
