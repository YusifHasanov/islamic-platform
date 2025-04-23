"use client"
import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

/**
 * CategoryTreeItem - A recursive component for displaying category hierarchies
 *
 * @param {Object} props
 * @param {Object} props.category - The category object
 * @param {Array} props.allCategories - All categories in the system (for finding children)
 * @param {Array} props.selectedCategories - Currently selected categories
 * @param {Function} props.onCategoryToggle - Function called when a category is toggled
 * @param {number} props.level - Current nesting level (for indentation)
 */
const CategoryTreeItem = memo(function CategoryTreeItem({
                                                            category,
                                                            allCategories,
                                                            selectedCategories,
                                                            onCategoryToggle,
                                                            level = 0, // Indentation level
                                                        }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Find direct children of this category
    const children = allCategories.filter(c => c.parentId === category.id);
    const hasChildren = children.length > 0;

    const isSelected = selectedCategories.some(c => c.id === category.id);

    const handleToggleExpand = (e) => {
        e.stopPropagation(); // Prevent triggering category toggle
        setIsExpanded(!isExpanded);
    };

    const handleToggleSelect = () => {
        onCategoryToggle(category);
    };

    // Indentation style
    const indentationStyle = { paddingLeft: `${level * 1.25}rem` };

    return (
        <div className="relative">
            {/* Vertical connecting line for levels > 0 */}
            {level > 0 && (
                <span
                    className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"
                    style={{ left: `${(level - 1) * 1.25 + 0.625}rem` }}
                    aria-hidden="true"
                />
            )}

            {/* Category Row */}
            <div
                className={`flex items-center justify-between group rounded transition-colors cursor-pointer text-sm relative ${
                    isSelected ? 'font-semibold text-emerald-700' : 'text-gray-700'
                }`}
                style={indentationStyle}
                onClick={handleToggleSelect}
            >
                {/* Horizontal connecting line stub */}
                {level > 0 && (
                    <span
                        className="absolute top-1/2 -translate-y-1/2 w-2.5 h-px bg-gray-200"
                        style={{ left: `${(level - 1) * 1.25 + 0.625}rem` }}
                        aria-hidden="true"
                    />
                )}

                <div className="flex items-center gap-1.5 py-1.5 flex-grow min-w-0 pr-2">
                    {/* Expansion Chevron (only if has children) */}
                    {hasChildren ? (
                        <button
                            onClick={handleToggleExpand}
                            className={`p-0.5 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-700 flex-shrink-0 ${
                                level > 0 ? '-ml-1' : ''
                            }`}
                            aria-label={isExpanded ? `Collapse ${category.name}` : `Expand ${category.name}`}
                            aria-expanded={isExpanded}
                        >
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                    ) : (
                        // Placeholder for alignment if no children
                        <span className={`w-[20px] h-[20px] flex-shrink-0 ${level > 0 ? '-ml-1' : ''}`} aria-hidden="true"></span>
                    )}

                    {/* Category Name (allow wrapping) */}
                    <span className="truncate group-hover:text-emerald-600">{category.name}</span>
                </div>

                {/* Selection Indicator (Circle) */}
                <span
                    className={`
            flex-shrink-0 h-5 w-5 border rounded-full flex items-center justify-center mr-1 ml-2
            transition-all duration-150 ease-in-out
            ${
                        isSelected
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
                        className="overflow-hidden"
                    >
                        {/* Container for children */}
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

export default CategoryTreeItem;



export const CategoryFilter = ({
                            allCategories,
                            selectedCategories,
                            onCategoryToggle,
                            loading = false
                        }) => {
    if (loading) {
        return (
            <div className="space-y-2 animate-pulse pt-1">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-8 bg-gray-100 rounded w-11/12"></div>
                ))}
            </div>
        );
    }

    if (allCategories.length === 0) {
        return (
            <div className="pt-1 text-sm text-gray-500 italic px-2">
                Kateqoriyalar yoxdur.
            </div>
        );
    }

    return (
        <div style={{
            maxHeight: "400px",
            overflowY: "auto",
        }} className="space-y-0.5 pt-1 ">
            {/* "All Articles" Button */}
            <button
                onClick={() => onCategoryToggle({ id: 'all', name: 'all' }, true)}
                className={`flex items-center gap-2 w-full text-left px-2 py-1.5 mb-1 rounded text-sm transition-colors
          ${selectedCategories.length === 0 ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                    <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v1A1.5 1.5 0 0 0 3.5 6h1A1.5 1.5 0 0 0 6 4.5v-1A1.5 1.5 0 0 0 4.5 2h-1ZM2 8.5A1.5 1.5 0 0 1 3.5 7h1A1.5 1.5 0 0 1 6 8.5v1A1.5 1.5 0 0 1 4.5 11h-1A1.5 1.5 0 0 1 2 9.5v-1ZM3.5 12A1.5 1.5 0 0 0 2 13.5v1A1.5 1.5 0 0 0 3.5 16h1a1.5 1.5 0 0 0 1.5-1.5v-1A1.5 1.5 0 0 0 4.5 12h-1ZM8.5 2A1.5 1.5 0 0 0 7 3.5v1A1.5 1.5 0 0 0 8.5 6h1A1.5 1.5 0 0 0 11 4.5v-1A1.5 1.5 0 0 0 9.5 2h-1ZM7 8.5A1.5 1.5 0 0 1 8.5 7h1A1.5 1.5 0 0 1 11 8.5v1A1.5 1.5 0 0 1 9.5 11h-1A1.5 1.5 0 0 1 7 9.5v-1Zm1.5 3.5A1.5 1.5 0 0 0 7 13.5v1a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-1a1.5 1.5 0 0 0-1.5-1.5h-1ZM13.5 2A1.5 1.5 0 0 0 12 3.5v1a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-1A1.5 1.5 0 0 0 14.5 2h-1ZM12 8.5A1.5 1.5 0 0 1 13.5 7h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1Zm1.5 3.5a1.5 1.5 0 0 0-1.5 1.5v1a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-1a1.5 1.5 0 0 0-1.5-1.5h-1Z" />
                </svg>
                Bütün məqalələr
            </button>

            {/* Category Tree */}
            {allCategories.filter(cat => !cat.parentId).map((category) => (
                <CategoryTreeItem
                    key={category.id}
                    category={category}
                    allCategories={allCategories}
                    selectedCategories={selectedCategories}
                    onCategoryToggle={onCategoryToggle}
                    level={0}
                />
            ))}
        </div>
    );
};
