// src/store/filterStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Create a Zustand store with persistence and operation flags
const useFilterStore = create(
    persist(
        (set, get) => ({
            // Filter state
            selectedCategories: [],
            selectedTags: [],
            searchQuery: '',
            isOperationInProgress: false, // Flag to track operations (prevents cascading state changes)
            operationType: null, // Tracks type of operation (for more granular control)

            // --- Operation control methods ---

            // Start an operation - sets flags to prevent concurrent changes
            startOperation: (operationType) => set({
                isOperationInProgress: true,
                operationType
            }),

            // Complete an operation - clears flags
            completeOperation: () => set({
                isOperationInProgress: false,
                operationType: null
            }),

            // --- Action methods (all wrapped with operation control) ---

            // Set categories with operation control
            setSelectedCategories: (categories) => {
                const { isOperationInProgress } = get();
                if (isOperationInProgress) return; // Prevent during other operations

                set({ selectedCategories: categories });
            },

            // Set tags with operation control
            setSelectedTags: (tags) => {
                const { isOperationInProgress } = get();
                if (isOperationInProgress) return;

                set({ selectedTags: tags });
            },

            // Set search query with operation control
            setSearchQuery: (query) => {
                const { isOperationInProgress } = get();
                if (isOperationInProgress) return;

                set({ searchQuery: query });
            },

            // Toggle category with operation control
            toggleCategory: (category, forceState = null) => {
                const { selectedCategories, isOperationInProgress } = get();
                if (isOperationInProgress) return;

                const isSelected = selectedCategories.some(c => c.id === category.id);
                const newState = forceState !== null ? forceState : !isSelected;

                if (newState && !isSelected) {
                    set({ selectedCategories: [...selectedCategories, category] });
                } else if (!newState && isSelected) {
                    set({ selectedCategories: selectedCategories.filter(c => c.id !== category.id) });
                }
            },

            // Toggle tag with operation control
            toggleTag: (tag) => {
                const { selectedTags, isOperationInProgress } = get();
                if (isOperationInProgress) return;

                const isSelected = selectedTags.some(t => t.id === tag.id);

                if (isSelected) {
                    set({ selectedTags: selectedTags.filter(t => t.id !== tag.id) });
                } else {
                    set({ selectedTags: [...selectedTags, tag] });
                }
            },

            // Clear filters safely with operation control
            clearFilters:  () => {
                // Start the clear operation
                set({
                    isOperationInProgress: true,
                    operationType: 'CLEAR_FILTERS'
                });

                // Perform the clear operation in a single update
                set({
                    selectedCategories: [],
                    selectedTags: [],
                    searchQuery: ''
                });

                // Use setTimeout to ensure state updates are processed before completing
                setTimeout(() => {
                    set({
                        isOperationInProgress: false,
                        operationType: null
                    });
                }, 100);
            },

            // Select "All Articles" - clears categories with operation control
            selectAllArticles: () => {
                const { isOperationInProgress } = get();
                if (isOperationInProgress) return;

                set({
                    isOperationInProgress: true,
                    operationType: 'SELECT_ALL'
                });

                set({ selectedCategories: [] });

                setTimeout(() => {
                    set({
                        isOperationInProgress: false,
                        operationType: null
                    });
                }, 100);
            },

            // Batch update multiple filters at once (prevents multiple rerenders)
            batchUpdateFilters: (newFilters) => {
                const { isOperationInProgress } = get();
                if (isOperationInProgress) return;

                set({
                    isOperationInProgress: true,
                    operationType: 'BATCH_UPDATE'
                });

                set({
                    selectedCategories: newFilters.categories || get().selectedCategories,
                    selectedTags: newFilters.tags || get().selectedTags,
                    searchQuery: newFilters.searchQuery !== undefined ? newFilters.searchQuery : get().searchQuery
                });

                setTimeout(() => {
                    set({
                        isOperationInProgress: false,
                        operationType: null
                    });
                }, 100);
            }
        }),
        {
            name: 'filter-storage', // unique name for localStorage
            partialize: (state) => ({
                // Only persist these fields, not the operation flags
                selectedCategories: state.selectedCategories,
                selectedTags: state.selectedTags,
                searchQuery: state.searchQuery,
            }),
        }
    )
);

export default useFilterStore;
