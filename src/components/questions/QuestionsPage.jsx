'use client';
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import HttpClient from "@/util/HttpClient";
import Link from "next/link";
import {SearchIcon, ChevronLeft, ChevronRight, ClockIcon, MessageCircle, ThumbsUp, TagIcon, XIcon} from "lucide-react";
import CacheProvider from "@/util/CacheProvider";



export default function QuestionsListPage() {
    const [questions, setQuestions] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0); // Geçerli sayfa
    const [totalPages, setTotalPages] = useState(1); // Toplam sayfa sayısı
    const [maxResult, setMaxResult] = useState(12); // Sayfa başına öğe sayısı
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [totalElements, setTotalElements] = useState([]);

    // API çağrıları için memoize edilmiş fonksiyonlar
    const fetchQuestions = useCallback(async () => {
        setLoading(true);
        try {
            const tagIdsQuery =
                selectedTags.length > 0
                    ? `&tagIds=${selectedTags.map(tag => tag.id).join(",")}`
                    : "";
            const response = await HttpClient.get(
                `/questions?page=${page}&containsTag=1&maxResult=${maxResult}${tagIdsQuery}`
            );
            const data = await response.json();
            setQuestions(data.content);
            setTotalPages(data.page.totalPages);
            setTotalElements(data.page.totalElements);
        } catch (error) {
            console.error("Error fetching questions:", error);
        } finally {
            setLoading(false);
        }
    }, [page, maxResult, selectedTags]);

    const fetchTags = useCallback(async () => {
        try {
            const data = await CacheProvider.fetchData("tags", 5, () =>
                HttpClient.get("/tags")
            );
            setTags(data);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    }, []);

    // Sayfa ve diğer filtre değerleri değiştiğinde, eğer seçili etiketler değişikliği sonucu sayfa 0 değilse önce sayfayı sıfırlıyoruz.
    useEffect(() => {
        if (selectedTags.length > 0 && page !== 0) {
            setPage(0);
            return;
        }
        fetchQuestions();
    }, [page, maxResult, selectedTags, fetchQuestions]);

    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    // Arama sonuçlarını state üzerinden değil, useMemo kullanarak türetiyoruz.
    const filteredQuestions = useMemo(() => {
        if (search.trim() === "") return questions;
        return questions.filter(question =>
            question.question.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, questions]);

    const handlePageChange = useCallback(
        (direction) => {
            setPage((prev) => {
                if (direction === "next" && prev < totalPages - 1) return prev + 1;
                if (direction === "prev" && prev > 0) return prev - 1;
                return prev;
            });
        },
        [totalPages]
    );

    const handleTagSelect = useCallback((tag) => {
        setSelectedTags((prev) =>
            prev.some((x) => x.id === tag.id)
                ? prev.filter((item) => item.id !== tag.id)
                : [...prev, tag]
        );
    }, []);

    const resetFilters = useCallback(() => {
        setSelectedTags([]);
        setSearch("");
    }, []);

    const pageNumbers = useMemo(() => {
        const total = totalPages;
        const currentPage = page; // 0-indexed
        let pages = [];
        if (total <= 7) {
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages = [1, 2, 3, 4, '...', total];
            } else if (currentPage >= total - 4) {
                pages = [1, '...', total - 3, total - 2, total - 1, total];
            } else {
                const displayCurrent = currentPage + 1;
                pages = [1, '...', displayCurrent - 1, displayCurrent, displayCurrent + 1, '...', total];
            }
        }
        return pages;
    }, [page, totalPages]);

    return (
        <div className="bg-gray-50  px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-screen-xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
                    <div className={"w-full px-4"}>

                        <h1 className="text-3xl font-bold mb-4 text-center">Suallar</h1>

                        {/* Search and filter section */}
                        <div className="mb-8 mx-auto">
                            <div className="relative mb-2">
                                <SearchIcon
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                                <input
                                    type="text"
                                    placeholder="Search questions..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                                />
                                {search && (
                                    <button
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                        onClick={() => {
                                            setSearch("")
                                            setPage(0) // Reset to first page when clearing search
                                        }}
                                    >
                                        <XIcon className="h-4 w-4"/>
                                        <span className="sr-only">Clear search</span>
                                    </button>
                                )}
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    {/*<h2 className="text-lg font-medium">Filter by tags</h2>*/}
                                    {(selectedTags.length > 0 || search) && (
                                        <button
                                            onClick={resetFilters}
                                            className="text-sm px-2 py-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Clear all filters
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <div
                                            key={tag.id}
                                            onClick={() => handleTagSelect(tag)}
                                            className={`
                  px-2.5 py-0.5 text-sm font-medium rounded-full cursor-pointer transition-colors
                  ${
                                                selectedTags.includes(tag)
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-200"
                                                    : "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-600"
                                            }
                `}
                                        >
                                            {tag.name}
                                            {selectedTags.includes(tag) && <XIcon className="ml-1 h-3 w-3 inline"/>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Results count */}
                        {/*<div className="mb-6 mx-auto">*/}
                        {/*    <p className="text-gray-500 dark:text-gray-400">*/}
                        {/*        Showing {filteredQuestions.length} of {totalElements} questions*/}
                        {/*        (page {page + 1} of{" "}*/}
                        {/*        {totalPages || 1})*/}
                        {/*    </p>*/}
                        {/*</div>*/}

                    </div>
                </div>

                {/* İçerik */}
                {loading ? (
                    <SkeletonLoader maxResult={maxResult}/>
                ) : filteredQuestions && filteredQuestions.length > 0 ? (

                    <>
                        <>
                            <div className="container mx-auto  px-4">

                                {/* Questions grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                                    {filteredQuestions.length > 0 ? (
                                        filteredQuestions.map((question) => (
                                            <div
                                                key={question.id}
                                                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full bg-white dark:bg-gray-800"
                                            >
                                                {/* Card Header */}
                                                <div className="p-4 pb-2">
                                                    <Link href={`/questions/${question.id}`}>
                                                        <h2 className="text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                                                            {question.question}
                                                        </h2>
                                                    </Link>
                                                </div>

                                                {/* Card Content */}
                                                {/*<div className="px-4 pb-3 flex-grow">*/}
                                                {/*    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3">dsadsdas</p>*/}
                                                {/*    <div*/}
                                                {/*        className="flex flex-wrap gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400">*/}
                                                {/*        <div className="flex items-center">*/}
                                                {/*            <ClockIcon className="mr-1 h-3 w-3"/>*/}
                                                {/*            timeToRead {12}*/}
                                                {/*        </div>*/}
                                                {/*        <div className="flex items-center">*/}
                                                {/*            <MessageCircle className="mr-1 h-3 w-3"/>*/}
                                                {/*            comment*/}
                                                {/*        </div>*/}
                                                {/*        <div className="flex items-center">*/}
                                                {/*            <ThumbsUp className="mr-1 h-3 w-3"/>*/}
                                                {/*            likes {2}*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}

                                                {/* Card Footer */}
                                                <div className="px-4 pb-4 pt-0">
                                                    <div className="w-full">
                                                        <div className="flex items-center gap-1 mb-1">
                                                            <TagIcon
                                                                className="h-3 w-3 text-gray-500 dark:text-gray-400"/>
                                                            <span
                                                                className="text-xs text-gray-500 mb-2 dark:text-gray-400">Tags:</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {question.tags.map((tag) => (
                                                                <span
                                                                    key={tag.id}
                                                                    className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-300 rounded-full cursor-pointer"
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        handleTagSelect(tag)
                                                                    }}
                                                                >
                        {tag.name}
                      </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-12">
                                            <h3 className="text-lg font-medium mb-2">No questions found</h3>
                                            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or
                                                filter criteria</p>
                                            <button
                                                className="mt-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                onClick={resetFilters}
                                            >
                                                Clear all filters
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Pagination */}
                                <div className="flex w-full items-center justify-center mt-8 space-x-1">
                                    {/* First page button */}
                                    <button
                                        onClick={() => setPage(0)}
                                        disabled={page === 0}
                                        className={`p-2 rounded-md ${
                                            page === 0
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                        }`}
                                        aria-label="Go to first page"
                                    >
                                        <ChevronLeft className="h-5 w-5"/>
                                    </button>

                                    {/* Previous page button */}
                                    <button
                                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                                        disabled={page === 0}
                                        className={`p-2 rounded-md ${
                                            page === 0
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                        }`}
                                        aria-label="Go to previous page"
                                    >
                                        <ChevronLeft className="h-5 w-5"/>
                                    </button>

                                    {/* Page numbers */}
                                    {pageNumbers.map((pageNumber, index) => (
                                        <button
                                            key={index}
                                            onClick={() => typeof pageNumber === "number" && setPage(pageNumber - 1)}
                                            disabled={pageNumber === '...'}
                                            className={`px-3 py-1 rounded-md ${
                                                pageNumber === (page + 1)
                                                    ? "bg-blue-100 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-300"
                                                    : pageNumber === '...'
                                                        ? "text-gray-500 dark:text-gray-400 cursor-default"
                                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                            }`}
                                            aria-label={typeof pageNumber === "number" ? `Go to page ${pageNumber}` : "More pages"}
                                            aria-current={pageNumber === (page + 1) ? "page" : undefined}
                                        >
                                            {pageNumber}
                                        </button>
                                    ))}

                                    {/* Next page button */}
                                    <button
                                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                                        disabled={page === totalPages - 1 || totalPages === 0}
                                        className={`p-2 rounded-md ${
                                            page === totalPages - 1 || totalPages === 0
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                        }`}
                                        aria-label="Go to next page"
                                    >
                                        <ChevronRight className="h-5 w-5"/>
                                    </button>

                                    {/* Last page button */}
                                    <button
                                        onClick={() => setPage(totalPages - 1)}
                                        disabled={page === totalPages - 1 || totalPages === 0}
                                        className={`p-2 rounded-md ${
                                            page === totalPages - 1 || totalPages === 0
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                        }`}
                                        aria-label="Go to last page"
                                    >
                                        <ChevronRight className="h-5 w-5"/>
                                    </button>
                                </div>

                            </div>
                        </>
                    </>

                ) : (
                    <QuestionNotFound onReset={resetFilters}/>
                )}
            </div>
        </div>
    );
}


// Skeleton loader ve "Soru Bulunamadı" bileşenlerini React.memo ile dışa taşıyarak gereksiz render'ları azaltıyoruz.
const SkeletonLoader = React.memo(({maxResult}) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 ">
        {[...Array(maxResult)].map((_, index) => (
            <div
                key={index}
                className="p-5 bg-gray-200 rounded-lg shadow-md animate-pulse flex flex-col justify-between h-36"
            >
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded mt-auto"></div>
            </div>
        ))}
    </div>
));

const QuestionNotFound = React.memo(({onReset}) => (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-white shadow-md rounded-lg p-6">
        <img
            src="/question_not_found.jpg"
            alt="No Questions Found"
            className="w-40 h-40 mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Uygun bir sual tapılmadı
        </h2>
        <p className="text-gray-500 text-center mb-4">
            Seçdiyiniz filtrelere uyğun heç bir sual tapılmadı. <br/>
            Başqa bir şey axtarmağa çalışın və ya filtreləri sıfırlayın.
        </p>
        <button
            onClick={onReset}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
        >
            Filtreleri Sıfırla
        </button>
    </div>
));

