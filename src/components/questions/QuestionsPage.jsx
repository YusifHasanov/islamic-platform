// Usage example in QuestionsPage
"use client"
import React, {useState, useEffect, useCallback, useRef, memo} from "react";
import { FilterProvider } from "@/components/common/Filter/FilterProvider";
import HttpClient from "@/util/HttpClient";
import useDebounce from "@/hooks/useDebounce";
import {
    NoQuestionsFound,
    OptimizedPagination, OptimizedQuestionCard,
    QuestionsSkeletonLoader
} from "@/components/questions/QuestionComponents";


export default function QuestionsPage() {
    // --- State Variables ---
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        categories: [],
        tags: [],
        searchQuery: ""
    });
    // const debouncedSearchQuery = useDebounce(filters.searchQuery, 300);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const searchInputRef = useRef(null);

    // --- Data Fetching ---
    const fetchQuestions = useCallback(async () => {
        setLoading(true);
        setError(null);
        console.log("triggerede fetch")
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                maxResult: "9",
                containsTag: '1',
                containsCategory: '1',
            });

            if (filters.searchQuery) params.set('searchQuery', filters.searchQuery);
            if (filters.categories.length > 0) params.set('categoryIds', filters.categories.map(c => c.id).join(','));
            if (filters.tags.length > 0) params.set('tagIds', filters.tags.map(t => t.id).join(','));

            const response = await HttpClient.get(`/questions?${params.toString()}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

            const content = data?.content || [];
            const pageInfo = data?.page || {};

            // Transform the data as needed...
            setQuestions(content.map((q) => ({
                id: q.id,
                question: q.question ?? "Sual başlığı yoxdur",
                answer: q.answer ?? "Cavab yoxdur",
                categories: Array.isArray(q.categories) ? q.categories.map(c => ({ id: c.id, name: c.name })) : [],
                tags: Array.isArray(q.tags) ? q.tags.map(t => ({ id: t.id, name: t.name })) : [],
                createdDate: q.createdDate || new Date().toISOString(),
                readCount: q.viewCount ?? Math.floor(Math.random() * 100) + 10,
            })));
            setTotalPages(pageInfo.totalPages ?? 1);
        } catch (err) {
            console.error("Error fetching questions:", err);
            setError("Suallar yüklənərkən xəta baş verdi.");
            setQuestions([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [page, filters.searchQuery, filters.categories, filters.tags]);

    // Fetch questions when relevant state changes
    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    // Reset page when filters change
// Add a guard to prevent unnecessary state updates
    useEffect(() => {
        // Only reset the page when filters change, not when the page itself changes
        setPage(0);
    }, [filters.searchQuery, filters.categories, filters.tags]); // REMOVE 'page' from here

    // Handle filter changes
    const handleFiltersChange = useCallback((newFilters) => {
        // Only update if the filters have actually changed
        if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
            setFilters(newFilters);
        }
    }, [filters]); // Add filters as dependency

    // Pagination handler
    const paginate = useCallback((newPage) => {
        const zeroIndexedPage = newPage - 1;
        if (zeroIndexedPage >= 0 && zeroIndexedPage < totalPages) {
            setPage(zeroIndexedPage);
        }
    }, [totalPages]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-12 md:py-16">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Header content... */}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 relative">
                {/* Use our new FilterProviderOld component */}
                <FilterProvider
                    initialCategories={[]}
                    initialTags={[]}
                    initialSearchQuery=""
                    onFiltersChange={handleFiltersChange}
                    searchPlaceholder="Suallar arasında axtar..."
                    searchInputRef={searchInputRef}
                >
                    {/* Questions List Area */}
                    <div id="questions-list-start" className="mt-6">
                        {error && (
                            <div className="my-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <QuestionsSkeletonLoader count={9} />
                        ) : questions.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 gap-5">
                                    {questions.map((question) => (
                                        <OptimizedQuestionCard key={question.id} question={question} />
                                    ))}
                                </div>
                                {totalPages > 1 && (
                                    <OptimizedPagination
                                        currentPage={page + 1}
                                        totalPages={totalPages}
                                        onPageChange={paginate}
                                    />
                                )}
                            </>
                        ) : (
                            !error && (
                                <NoQuestionsFound
                                    onReset={() => {
                                        // FilterProviderOld handles the reset internally
                                    }}
                                    hasFilters={filters.searchQuery || filters.categories.length > 0 || filters.tags.length > 0}
                                />
                            )
                        )}
                    </div>
                </FilterProvider>
            </div>
        </div>
    );
}

