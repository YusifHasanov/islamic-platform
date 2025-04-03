"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import HttpClient from "@/util/HttpClient"
import CacheProvider from "@/util/CacheProvider"
import { ChevronDown, FolderTree, LayoutGrid } from "lucide-react" // Import necessary icons

const ArticleDetailCategories = () => {
    const [categories, setCategories] = useState([])
    const [expandedCategories, setExpandedCategories] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        // Fetch categories using CacheProvider
        CacheProvider.fetchData("article_categories", 300, async () => HttpClient.get("/categories")) // Use same cache key and time
            .then((data) => {
                // Ensure data is an array
                setCategories(Array.isArray(data) ? data : [])
            })
            .catch((err) => {
                console.error("Error fetching categories:", err)
                setCategories([]) // Set to empty array on error
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    // Toggle category expansion state
    const toggleCategory = (categoryId) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }))
    }

    // --- Replicated Enhanced Category Tree Rendering ---
    const renderCategoryTree = (parentId = null, level = 0) => {
        // Filter categories for the current parentId
        const filteredCategories = categories.filter((cat) => {
            const catParentId = cat.parentId === undefined ? null : cat.parentId;
            return catParentId === parentId;
        });

        // Return null if no categories found for this level
        if (filteredCategories.length === 0) return null

        return (
            // Apply indentation and border for nested levels
            <ul className={`transition-all duration-300 ease-in-out ${level > 0 ? "pl-3 border-l border-emerald-100 ml-3" : ""}`}>
                {filteredCategories.map((category) => {
                    const categoryIdStr = category.id.toString();
                    // Check if the current category has children
                    const hasChildren = categories.some((cat) => cat.parentId === category.id)
                    // Check if the current category is expanded
                    const isExpanded = expandedCategories[category.id];

                    return (
                        <li key={category.id} className="my-1">
                            {/* Container for the category item row */}
                            <div className="flex items-center justify-between group rounded-md hover:bg-gray-50 transition-all duration-150 ease-in-out">
                                {/* Link to navigate to the category's article list */}
                                <Link
                                    href={`/articles?page=0&category=${categoryIdStr}`}
                                    className="flex-grow text-left px-2.5 py-1.5 text-sm truncate text-gray-700 group-hover:text-emerald-600"
                                    title={category.name} // Tooltip for long names
                                >
                                    {category.name}
                                </Link>

                                {/* Expand/Collapse Button */}
                                {hasChildren && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent link navigation
                                            toggleCategory(category.id);
                                        }}
                                        className="p-1.5 mr-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-300 transition-colors"
                                        aria-label={isExpanded ? "Kateqoriyanı bağla" : "Kateqoriyanı aç"}
                                        aria-expanded={isExpanded}
                                    >
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : "rotate-0"}`}
                                        />
                                    </button>
                                )}
                                {/* Placeholder for alignment when no children */}
                                {!hasChildren && <div className="w-[30px] mr-1"></div>}
                            </div>

                            {/* Animated container for child categories */}
                            <AnimatePresence initial={false}>
                                {hasChildren && isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="overflow-hidden pt-1" // Padding when expanded
                                    >
                                        {/* Recursive call to render children */}
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
    // --- End of Replicated Category Tree ---

    // Loading skeleton for categories
    const CategorySkeleton = () => (
        <div className="space-y-3 animate-pulse mt-2">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center justify-between h-7"> {/* Set fixed height */}
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    {i % 3 === 0 && <div className="h-4 w-4 bg-gray-200 rounded-full mr-2"></div>}
                </div>
            ))}
        </div>
    );

    return (
        // Main container with consistent styling
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8">
            {/* Header */}
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FolderTree size={20} className="mr-2 text-emerald-600 flex-shrink-0" />
                Kateqoriyalar
            </h2>
            {/* Category List Container */}
            <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1"> {/* Optional: Limit height and enable scroll */}
                {/* "All Articles" Link */}
                <Link
                    href="/articles"
                    className="flex items-center w-full text-left px-2.5 py-1.5 rounded-md text-sm mb-2 text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors"
                >
                    <LayoutGrid size={16} className="mr-2 flex-shrink-0" />
                    Bütün məqalələr
                </Link>

                {/* Conditional Rendering: Loading Skeleton or Category Tree */}
                {isLoading ? (
                    <CategorySkeleton />
                ) : categories.length > 0 ? (
                    renderCategoryTree()
                ) : (
                    <p className="text-sm text-gray-500 px-2 py-1">Kateqoriya tapılmadı.</p>
                )}
            </div>
        </div>
    )
}

export default ArticleDetailCategories
