// src/hooks/useFilterData.js
import { useState, useEffect, useCallback } from 'react';
import HttpClient from '@/util/HttpClient';
import CacheProvider from '@/util/CacheProvider';
import useFilterStore from "@/store/useFilterStore";

/**
 * Custom hook for managing filter data and state
 * Using Zustand store for persisted state management
 */
export const useFilterData = ({
                                  initialCategories = [],
                                  initialTags = [],
                                  onChange = () => {},
                              } = {}) => {
    // State for available data (not persisted)
    const [allCategories, setAllCategories] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get persisted state and actions from Zustand store
    const {
        selectedCategories,
        selectedTags,
        toggleCategory,
        toggleTag,
        clearFilters,
        selectAllArticles,
        setSelectedCategories,
        setSelectedTags
    } = useFilterStore();

    // Initialize with any provided initial values (if store is empty)
    useEffect(() => {
        // Only set initial values if store is empty and initial values are provided
        if (selectedCategories.length === 0 && initialCategories.length > 0) {
            setSelectedCategories(initialCategories);
        }

        if (selectedTags.length === 0 && initialTags.length > 0) {
            setSelectedTags(initialTags);
        }
    }, [initialCategories, initialTags, selectedCategories.length, selectedTags.length, setSelectedCategories, setSelectedTags]);

    // Fetch categories from API or cache
    const fetchCategories = useCallback(async () => {
        try {
            // Try to get from cache first
            CacheProvider.fetchData('all-categories',60,
                async() =>await HttpClient.get('/categories'))
                .then((response) => {
                    setAllCategories(response);
                });
            // if (cachedCategories) {
            //     setAllCategories(cachedCategories);
            //     return;
            // }
            //
            // const response = await HttpClient.get('/categories');
            // if (!response.ok) throw new Error('Failed to fetch categories');
            //
            // const data = await response.json();
            // const categories = data?.content || [];

            // setAllCategories(categories);
            // Cache the result
            // CacheProvider.set('all-categories', categories, 3600); // Cache for 1 hour
        } catch (error) {
            console.error('Error fetching categories:', error);
            setAllCategories([]);
        }
    }, []);

    // Fetch tags from API or cache
    const fetchTags = useCallback(async () => {
        try {
            CacheProvider.fetchData('all-tags',60,
                async() =>await HttpClient.get('/tags'))
                .then((response) => {
                    setAllTags(response);
                });
            // Try to get from cache first
            // const cachedTags = CacheProvider.get('all-tags');
            // if (cachedTags) {
            //     setAllTags(cachedTags);
            //     return;
            // }
            //
            // const response = await HttpClient.get('/tags');
            // if (!response.ok) throw new Error('Failed to fetch tags');
            //
            // const data = await response.json();
            // const tags = data?.content || [];
            //
            // setAllTags(tags);
            // // Cache the result
            // CacheProvider.set('all-tags', tags, 3600); // Cache for 1 hour
        } catch (error) {
            console.error('Error fetching tags:', error);
            setAllTags([]);
        }
    }, []);

    // Fetch filter data on component mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchCategories(), fetchTags()]);
            setLoading(false);
        };

        fetchData();
    }, [fetchCategories, fetchTags]);

    // Notify parent when filters change
    useEffect(() => {
        onChange({
            categories: selectedCategories,
            tags: selectedTags
        });
    }, [selectedCategories, selectedTags, onChange]);

    // Custom category toggle handler
    const handleCategoryToggle = useCallback((category, forceSelect = false) => {
        // Special case: "All Articles" option
        if (category.id === 'all') {
            selectAllArticles();
            return;
        }

        toggleCategory(category, forceSelect ? true : null);
    }, [toggleCategory, selectAllArticles]);

    return {
        // Data
        allCategories,
        allTags,
        selectedCategories,
        selectedTags,
        loading,

        // Actions
        handleCategoryToggle,
        handleTagToggle: toggleTag,
        clearFilters
    };
};

export default useFilterData;
