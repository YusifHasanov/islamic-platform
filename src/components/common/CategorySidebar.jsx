// components/articles/ArticleCategorySidebar.js
"use client";

import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, LayoutGrid, FolderTree } from 'lucide-react'; // Import necessary icons

// --- Loading Skeleton for Categories ---
const CategorySkeleton = memo(() => (
    <div className="space-y-3 animate-pulse pt-2">
        {/* Simulate "All Articles" */}
        <div className="h-8 bg-gray-200 rounded-md w-full mb-3"></div>
        {/* Simulate category items */}
        {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between pl-3">
                <div className={`h-5 bg-gray-200 rounded ${i % 3 === 0 ? 'w-1/2' : 'w-3/4'}`}></div>
                {i % 2 === 0 && <div className="h-4 w-4 bg-gray-200 rounded-full mr-2"></div>}
            </div>
        ))}
    </div>
));
CategorySkeleton.displayName = 'CategorySkeleton';


// --- Main Sidebar Component ---
const ArticleCategorySidebar = ({
                                    categories = [],            // Array of category objects { id, name, parentId }
                                    selectedCategory = "",    // ID (string) of the currently selected category, or "" for all
                                    onCategorySelect,         // Function to call when a category is selected (passes categoryId string or "")
                                    isLoading = false,        // Boolean to show loading skeleton
                                    initialExpanded = {},     // Optional: Initially expanded categories { [categoryId]: true }
                                    className = "",
                                    title // Optional: Allow passing custom classes
                                }) => {
    const [expandedCategories, setExpandedCategories] = useState(initialExpanded);

    console.log("title:", title);
    // Toggle category expansion state
    const toggleCategory = useCallback((categoryId) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    }, []); // No dependencies needed as it only uses its own state setter

    // --- Recursive Category Tree Rendering ---
    const renderCategoryTree = useCallback((parentId = null, level = 0) => {
        const filteredCategories = categories.filter((cat) => {
            const catParentId = cat.parentId === undefined ? null : cat.parentId;
            return catParentId === parentId;
        });

        if (filteredCategories.length === 0) return null;

        return (
            // Apply indentation and a subtle left border for visual hierarchy
            <ul className={`transition-all duration-300 ease-in-out ${level > 0 ? "pl-3.5 border-l border-gray-200 ml-3" : ""}`}>
                {filteredCategories.map((category) => {
                    const categoryIdStr = category.id.toString();
                    const hasChildren = categories.some((cat) => cat.parentId === category.id);
                    const isSelected = selectedCategory === categoryIdStr;
                    const isExpanded = !!expandedCategories[category.id]; // Ensure boolean

                    return (
                        <li key={category.id} className="my-0.5 relative"> {/* Reduced vertical margin */}
                            {/* Optional: Vertical line connector for tree appearance */}
                            {level > 0 && (
                                <span className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" style={{ left: '-0.625rem' }} aria-hidden="true"></span>
                            )}
                            <div
                                className={`flex items-center justify-between group rounded-md transition-colors duration-150 ease-in-out ${
                                    isSelected ? "bg-emerald-50" : "hover:bg-emerald-50/60"
                                }`}
                            >
                                {/* Optional: Horizontal line connector */}
                                {level > 0 && (
                                    <span className="absolute top-1/2 -mt-px h-px w-2 bg-gray-200" style={{ left: '-0.625rem' }} aria-hidden="true"></span>
                                )}
                                {/* Use Button for Semantics & Accessibility */}
                                <button
                                    onClick={() => onCategorySelect(categoryIdStr)}
                                    className={`flex-grow text-left px-3 py-2 text-sm truncate min-w-0 rounded-l-md focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 ${
                                        isSelected ? "font-semibold text-emerald-800" : "text-gray-700 group-hover:text-emerald-700"
                                    }`}
                                    title={category.name}
                                >
                                    {category.name}
                                </button>

                                {hasChildren && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleCategory(category.id); }}
                                        className="p-1.5 mr-1 rounded-md text-gray-400 hover:bg-emerald-100 hover:text-emerald-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 transition-colors flex-shrink-0" // Added focus-visible
                                        aria-label={isExpanded ? `${category.name} alt kateqoriyalarını bağla` : `${category.name} alt kateqoriyalarını aç`}
                                        aria-expanded={isExpanded}
                                    >
                                        <ChevronDown size={16} className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : "rotate-0"}`} />
                                    </button>
                                )}
                                {/* Alignment Spacer */}
                                {!hasChildren && <div className="w-[30px] h-[30px] mr-1 flex-shrink-0"></div>}
                            </div>

                            {/* Animated Children Container */}
                            <AnimatePresence initial={false}>
                                {hasChildren && isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="overflow-hidden pt-0.5" // Consistent spacing
                                    >
                                        {renderCategoryTree(category.id, level + 1)}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                    );
                })}
            </ul>
        );
    }, [categories, selectedCategory, expandedCategories, onCategorySelect, toggleCategory]); // Dependencies for useCallback


    // --- Render Component ---
    return (
        <div className={`h-full ${className}`}> {/* Apply passed className */}
            {/* Sticky container */}
            <div className="sticky top-10 bg-white rounded-lg shadow border border-gray-100/80 p-5">
                {/* Header */}
                <h2 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
                    <FolderTree size={20} className="text-emerald-600 flex-shrink-0" />
                    Kateqoriyalar
                </h2>
                {/* Scrollable Content */}
                <div className="mt-3 -mr-2 pr-2 max-h-[65vh] sm:max-h-[70vh] overflow-y-auto custom-scrollbar-thin">
                    {isLoading ? (
                        <CategorySkeleton />
                    ) : (
                        <>
                            {/* "All Articles" Button */}
                            <button
                                onClick={() => onCategorySelect("")} // Pass empty string for "all"
                                className={`flex items-center w-full text-left px-3 py-2 rounded-md text-sm mb-1 transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 ${
                                    selectedCategory === ""
                                        ? "font-semibold text-emerald-800 bg-emerald-100"
                                        : "text-gray-700 hover:bg-emerald-50/60 hover:text-emerald-700"
                                }`}
                            >
                                <LayoutGrid size={16} className="mr-2.5 flex-shrink-0 opacity-80" />
                                {title}
                            </button>

                            {/* Category Tree */}
                            {categories.length > 0 ? (
                                renderCategoryTree() // Start rendering from root (parentId = null)
                            ) : (
                                <p className="text-sm text-gray-500 px-3 py-2 italic">Kateqoriya tapılmadı.</p>
                            )}
                        </>
                    )}
                </div>
                {/* Optional: Add global styles for scrollbar here if not already present */}
                <style jsx global>{`
                    .custom-scrollbar-thin::-webkit-scrollbar { width: 5px; height: 5px; }
                    .custom-scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; } /* Tailwind gray-300 */
                    .custom-scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #94a3b8; } /* Tailwind gray-400 */
                 `}</style>
            </div>
        </div>
    );
};

// Memoize the component
export default memo(ArticleCategorySidebar);
