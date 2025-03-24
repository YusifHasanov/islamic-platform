"use client";

import React, {useEffect, useLayoutEffect, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import HttpClient from "@/util/HttpClient";
import Link from "next/link";
import CacheProvider from "@/util/CacheProvider";
import Spinner from "@/components/search/Spinner";
import Image from "next/image";
import ConsoleLog from "@/components/common/ConsoleLog";

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // Get the initial categoryId from query params (if any)
    const initialCategoryId = searchParams.get("categoryId") || "";
    const searchValue = searchParams.get("searchValue") || "";

    // Local state for user input in the search bar
    const [searchState, setSearchState] = useState('');

    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [videos, setVideos] = useState([]);
    const [books, setBooks] = useState([]);

    // Fetch data whenever `categoryId` in the URL changes
    useEffect(() => {
        if (searchValue === '' && initialCategoryId === '') {
            router.push("/");
        }
        console.log("fetch")
        fetchSearchData()
    }, [initialCategoryId, searchValue]);

    const fetchSearchData = () => {
        // if (!initialCategoryId) {
        //     // If there's no categoryId in the URL, we may choose to skip fetching or do a default fetch
        //     setLoading(false);
        //     return;
        // }
        // setLoading(true);
        let url = '/search?';
        let key = "search";
        if (initialCategoryId || initialCategoryId !== "") {
            url += `categoryId=${initialCategoryId}`;
            key += `_${initialCategoryId}`
        }

        if (searchValue || searchValue !== "") {
            url += `search=${searchValue}`
            key += `_${searchValue}`
        }

        CacheProvider.fetchData(key, 0.1, async () => HttpClient.get(url))
            // .then((res) => res.json())
            .then((data) => {
                setArticles(data.articles);
                setVideos(data.videos);
                setBooks(data.books);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            })
            .finally(() => setLoading(false));
    }

    // Handle search form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Navigate to /search?categoryId=searchValue
        if (!searchState) return;
        router.push(`/search?searchValue=${searchState}`);
    };

    if (loading) {
        return (
            <div
                className="flex items-center justify-center min-h-[60vh] bg-gradient-to-r from-yellow-50 to-yellow-100">
                <Spinner/>
            </div>
        );
    }

    return (
        <main className="min-h-screen w-full bg-gradient-to-b from-yellow-50 to-orange-50">
            {/* Search Bar */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <form
                    onSubmit={handleSearchSubmit}
                    className="flex items-center gap-2 bg-white shadow-md rounded-lg py-3 px-4"
                >
                    <input
                        type="text"
                        value={searchState}
                        onChange={(e) => setSearchState(e.target.value)}
                        placeholder="Axtaris"
                        className="flex-1 border-none outline-none text-gray-700"
                    />
                    <button
                        disabled={searchState === null || searchState === undefined || searchState.trim() === ""}
                        type="submit"
                        className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-gradient bg-gradient-to-r from-yellow-600 via-orange-500 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
                    Axtarışın nəticələri
                </h1>

                <ConsoleLog log={articles} />
                {/* Articles Section */}
                <Section title="Məqalələr" data={articles}>
                    {articles?.map((article) => (
                        <Card
                            href={`/articles/${article.id}`}
                            key={article.id}
                            image={article.image}
                            title={article.title}
                            info1Label="Kategoriyalar"
                            info1={article.categories.join(", ")}
                            info2Label="Müəllif"
                            info2={article.authorName}
                        />
                    ))}
                </Section>

                {/* Videos Section */}
                <Section title="Videolar" data={videos}>
                    {videos?.map((video) => {
                        const thumbnailUrls = video.thumbnail.split("+");
                        return (
                            <Card
                                href={`/videos?playlistId=${video.playlistId}&videoId=${video.videoId}`}
                                key={video.videoId}
                                image={thumbnailUrls[2] ?? thumbnailUrls[0]}
                                title={video.title}
                                info1Label="Published At"
                                info1={new Date(video.publishedAt).toLocaleDateString()}
                            />
                        );
                    })}
                </Section>

                {/* Books Section */}
                <Section title="Kitablar" data={books}>
                    {books?.map((book) => (
                        <Card
                            href={"/"}
                            key={book.id}
                            image={book.image}
                            title={book.title}
                            info1Label="Author"
                            info1={book.authorName}
                        />
                    ))}
                </Section>
            </div>
        </main>
    );
}



/**
 * Section Component
 * Renders a heading and a grid of items (children).
 */
function Section({title, data, children}) {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
            {data?.length === 0 ? (
                <p className="text-gray-600">{title.toLowerCase()} tapılmadı.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {children}
                </div>
            )}
        </section>
    );
}

/**
 * Card Component
 * A more modern card with hover animations and subtle styling.
 */
function Card({image, title, info1Label, info1, info2Label, info2, href}) {
    return (
        <div
            className="group relative flex flex-col border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
            {/* Image */}
            <div className="overflow-hidden h-40 md:h-48">
                <Image
                    height={50}
                    width={500}
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Card Body */}
            <div className="p-4 flex flex-col justify-between flex-1">
                <h3 className="text-lg hover:text-yellow-600 font-semibold mb-2 text-gray-800 line-clamp-2">
                    <Link href={href}>
                        {title}
                    </Link>
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                    {info1 && (
                        <p>
                            <span className="font-semibold">{info1Label}: </span>
                            {info1}
                        </p>
                    )}
                    {info2 && (
                        <p>
                            <span className="font-semibold">{info2Label}: </span>
                            {info2}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
