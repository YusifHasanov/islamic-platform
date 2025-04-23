"use client"
import React, { useCallback, useEffect, useRef } from "react";
import ReusableFilterSidebar, { ActiveFilters, MobileFilterTrigger } from "@/components/common/Filter/ReusableFilterSidebar";
import { Search, Tag, X } from "lucide-react";
import { useFilterData } from "@/hooks/useFilterData";
import { CategoryFilter } from "@/components/common/Filter/CategoryTreeItem";
import TagFilter from "@/components/common/Filter/TagFilter";
import useFilterStore from "@/store/useFilterStore";

/**
 * A complete filtering solution with Zustand-backed state management
 */
export const FilterProvider = ({
                                   initialCategories = [],
                                   initialTags = [],
                                   initialSearchQuery = "",
                                   onFiltersChange = () => {},
                                   searchPlaceholder = "Axtar...",
                                   className = "",
                                   searchInputRef = null,
                                   showMobileFilter = true,
                                   children,
                               }) => {
    // Flag to track if we're in a reset operation
    const isResettingRef = useRef(false);

    // Use our custom hook for all filter data
    const {
        allCategories,
        allTags,
        selectedCategories,
        selectedTags,
        loading,
        handleCategoryToggle,
        handleTagToggle,
        clearFilters
    } = useFilterData({
        initialCategories,
        initialTags,
        onChange: ({ categories, tags }) => {
            // Skip callback during reset operations
            if (isResettingRef.current) return;

            // Pass the updated filters to the parent (categories and tags)
            onFiltersChange({
                categories,
                tags,
                searchQuery
            });
        }
    });

    // Get search query and setter from Zustand store
    const { searchQuery, setSearchQuery, clearFilters: clearAllFiltersFn } = useFilterStore();

    // Initialize search query if provided
    useEffect(() => {
        if (!searchQuery && initialSearchQuery) {
            setSearchQuery(initialSearchQuery);
        }
    }, [initialSearchQuery, searchQuery, setSearchQuery]);

    // Handle search input changes
    const handleSearchChange = useCallback((event) => {
        setSearchQuery(event.target.value);
    }, [setSearchQuery]);

    // Notify parent of search changes
    useEffect(() => {
        // Skip callback during reset operations
        if (isResettingRef.current) return;

        onFiltersChange({
            categories: selectedCategories,
            tags: selectedTags,
            searchQuery
        });
    }, [searchQuery, selectedCategories, selectedTags, onFiltersChange]);

    // Clear search input
    const clearSearchInput = useCallback(() => {
        setSearchQuery("");
        if (searchInputRef?.current) {
            searchInputRef.current.focus();
        }
    }, [setSearchQuery, searchInputRef]);

    // Clear all filters including search - Improved version
    const clearAllFilters = useCallback((focusSearch = true) => {
        // Set the resetting flag to prevent multiple callbacks
        isResettingRef.current = true;

        // Clear filters in the store
        clearAllFiltersFn();

        // Use requestAnimationFrame to ensure the store updates are processed
        requestAnimationFrame(() => {
            // After a small delay, notify the parent and reset the flag
            setTimeout(() => {
                // Notify the parent of the cleared filters
                onFiltersChange({
                    categories: [],
                    tags: [],
                    searchQuery: ''
                });

                // Reset the resetting flag
                isResettingRef.current = false;

                // Focus search input if requested
                if (focusSearch && searchInputRef?.current) {
                    searchInputRef.current.focus();
                }
            }, 50);
        });
    }, [clearAllFiltersFn, onFiltersChange, searchInputRef]);

    // Mobile filter state (this is UI state, not persisted)
    const [isMobileFilterVisible, setIsMobileFilterVisible] = React.useState(false);

    // Prepare filter sections for the sidebar
    const filterSections = [
        {
            title: "Kateqoriyalar",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-emerald-600">
                    <path fillRule="evenodd" d="M2.25 3A.75.75 0 0 0 1.5 3.75v1.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75v-1.5A.75.75 0 0 0 3.75 3h-1.5ZM1.5 9.75A.75.75 0 0 1 2.25 9h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-1.5ZM2.25 15A.75.75 0 0 0 1.5 15.75v1.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75h-1.5ZM6.04 4.28l-.147.146a.75.75 0 1 0 1.06 1.06l4.5-4.5a.75.75 0 0 0-1.06-1.06l-4.5 4.5ZM6 10.5a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 4.5a.75.75 0 1 0 0 1.5h9a.75.75 0 1 0 0-1.5h-9Z" clipRule="evenodd" />
                </svg>
            ),
            badgeCount: selectedCategories.length,
            badgeColor: "emerald",
            content: (
                <CategoryFilter
                    allCategories={allCategories}
                    selectedCategories={selectedCategories}
                    onCategoryToggle={handleCategoryToggle}
                    loading={loading}
                />
            ),
        },
        {
            title: "Taqlər",
            icon: <Tag className="w-5 h-5 text-emerald-600" />,
            badgeCount: selectedTags.length,
            badgeColor: "blue",
            content: (
                <TagFilter
                    allTags={allTags}
                    selectedTags={selectedTags}
                    onTagToggle={handleTagToggle}
                    loading={loading}
                />
            ),
        },
    ];

    // Create active filters array
    const activeFiltersArray = [];

    // Add search query filter if present
    if (searchQuery) {
        activeFiltersArray.push({
            label: searchQuery,
            icon: <Search size={12} />,
            value: searchQuery,
            bgClass: "bg-gray-200",
            textClass: "text-gray-800",
            closeButtonClass: "text-gray-500 hover:text-gray-700",
            onRemove: () => clearSearchInput(),
        });
    }

    // Add category filters
    selectedCategories.forEach(category => {
        activeFiltersArray.push({
            label: category.name,
            value: category.id,
            bgClass: "bg-emerald-100",
            textClass: "text-emerald-800",
            closeButtonClass: "text-emerald-600 hover:text-emerald-800",
            onRemove: () => handleCategoryToggle(category),
        });
    });

    // Add tag filters
    selectedTags.forEach(tag => {
        activeFiltersArray.push({
            label: tag.name,
            value: tag.id,
            bgClass: "bg-blue-100",
            textClass: "text-blue-800",
            closeButtonClass: "text-blue-600 hover:text-blue-800",
            onRemove: () => handleTagToggle(tag),
        });
    });

    const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedTags.length > 0;

    return (
        <div className={className}>
            <div className="lg:grid lg:grid-cols-4 lg:gap-8 items-start">
                {/* Filter Sidebar (Desktop) */}
                <aside className="h-full hidden lg:block lg:col-span-1">
                    <ReusableFilterSidebar
                        filterSections={filterSections}
                        hasActiveFilters={hasActiveFilters}
                        onClearAllFilters={clearAllFilters}
                        className="sticky top-24 max-[500px] "
                    />
                </aside>

                {/* Main Content Area */}
                <main className="lg:col-span-3">
                    {/* Top Bar: Search & Mobile Filter Trigger */}
                    <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
                        <div className="relative flex-grow w-full">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                ref={searchInputRef}
                                type="search"
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="block w-full pl-11 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-base"
                            />
                            {searchQuery && (
                                <button
                                    onClick={clearSearchInput}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    aria-label="Axtarışı təmizlə"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>

                        {/* Mobile Filter Trigger */}
                        {showMobileFilter && (
                            <MobileFilterTrigger
                                onClick={() => setIsMobileFilterVisible(true)}
                                badgeCount={selectedCategories.length + selectedTags.length + (searchQuery ? 1 : 0)}
                                label="Filtrlər"
                            />
                        )}
                    </div>

                    {/* Active Filters */}
                    {activeFiltersArray.length > 0 && (
                        <ActiveFilters
                            filters={activeFiltersArray}
                            onClearAll={clearAllFilters}
                        />
                    )}

                    {/* Slot for child components (content) */}
                    {children}
                </main>
            </div>

            {/* Mobile Filter Panel */}
            <ReusableFilterSidebar
                isMobile={true}
                isVisible={isMobileFilterVisible}
                onCloseMobile={() => setIsMobileFilterVisible(false)}
                filterSections={filterSections}
                hasActiveFilters={hasActiveFilters}
                onClearAllFilters={clearAllFilters}
            />
        </div>
    );
};

export default FilterProvider;
