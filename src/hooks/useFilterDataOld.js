"use client"
import {useState, useEffect, useCallback} from "react";
import HttpClient from "@/util/HttpClient";
import CacheProvider from "@/util/CacheProvider";

/**
 * Custom hook for managing filter data and state
 * This centralizes the API calls and state management for filters
 */
export const useFilterDataOld = ({
                                  initialCategories = [], initialTags = [], onChange = () => {
    }
                              }) => {
    // State for filter data
    const [allCategories, setAllCategories] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(initialCategories);
    const [selectedTags, setSelectedTags] = useState(initialTags);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch metadata (categories and tags)
    const fetchMetadata = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Use caching to avoid redundant requests
            const [categoriesData, tagsData] = await Promise.all([
                CacheProvider.fetchData("categories", 300, () => HttpClient.get("/categories")),
                CacheProvider.fetchData("tags", 300, () => HttpClient.get("/tags")),
            ]);

            setAllCategories(Array.isArray(categoriesData) ? categoriesData : []);
            setAllTags(Array.isArray(tagsData) ? tagsData : []);
        } catch (error) {
            console.error("Error fetching filter metadata:", error);
            setError("Failed to load filter options");
            setAllCategories([]);
            setAllTags([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Toggle a category selection
    const handleCategoryToggle = useCallback((category) => {
        setSelectedCategories(prev =>
            prev.some(c => c.id === category.id)
                ? prev.filter(c => c.id !== category.id)
                : [...prev, category]
        );
    }, []);

    // Toggle a tag selection
    const handleTagToggle = useCallback((tag) => {
        setSelectedTags(prev =>
            prev.some(t => t.id === tag.id)
                ? prev.filter(t => t.id !== tag.id)
                : [...prev, tag]
        );
    }, []);

    // Clear all filter selections
    const clearFilters = useCallback(() => {
        setSelectedCategories([]);
        setSelectedTags([]);
    }, []);

    // Fetch data on mount
    useEffect(() => {
        fetchMetadata();
    }, [fetchMetadata]);

    // Notify parent component when selections change
    useEffect(() => {
        onChange({
            categories: selectedCategories,
            tags: selectedTags
        });
    }, [selectedCategories, selectedTags, onChange]);

    return {
        // Data
        allCategories,
        allTags,
        selectedCategories,
        selectedTags,
        loading,
        error,

        // Methods
        handleCategoryToggle,
        handleTagToggle,
        clearFilters,
        refreshData: fetchMetadata
    };
};
