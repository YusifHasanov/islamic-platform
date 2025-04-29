// No 'use client' directive needed for SSR components
import React from 'react'; // No need for useState, useEffect
import CacheProvider from "@/util/CacheProvider";
import HttpClient from "@/util/HttpClient";
import Image from "next/image";
import Link from "next/link";
import { Clock, AlertCircle } from "lucide-react";
import {BASE_URL} from "@/util/Const"; // Icons are fine in SSR

// --- Reusable Card Component (SSR friendly) ---
// No client-side hooks or motion components
const RelatedArticleCard = ({ article, index }) => {
    const formatDate = (dateString) => {
        if (!dateString) return "";
        try {
            return new Intl.DateTimeFormat("az-AZ", {
                year: "numeric",
                month: "short",
                day: "numeric",
            }).format(new Date(dateString));
        } catch {
            return dateString;
        }
    };

    // Calculate animation delay based on index
    const animationDelay = `${index * 0.1}s`; // Stagger effect

    return (
        // Apply animation class and inline style for delay
        <div
            className="group  flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 h-full related-article-card animate-fadeInUp hover:shadow-lg"
            style={{ animationDelay }} // Apply staggered delay
        >
            {/* Image */}
            <Link href={`/articles/${article.id}`} className="block relative aspect-[16/9] overflow-hidden bg-gray-100">
                <Image
                    src={article.image || "/placeholder.svg?height=200&width=400"}
                    alt={article.title || "Oxşar məqalə"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover related-article-card-image group-hover:scale-105" // Added class for transition
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
            </Link>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-base text-gray-800 mb-2 line-clamp-2 related-article-card-title group-hover:text-emerald-700"> {/* Added class */}
                    <Link href={`/articles/${article.id}`} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true"></span>
                        {article.title || "Adsız məqalə"}
                    </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {article.description || "Bu məqalə üçün təsvir mövcud deyil."}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                        <Clock size={12} className="text-gray-400" />
                        {formatDate(article.publishedAt)}
                    </span>
                </div>
            </div>
        </div>
    );
};

// --- Loading Skeleton (Remains the same, uses Tailwind's pulse) ---
const ArticleSkeletonCard = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse h-full">
        <div className="bg-gray-200 aspect-[16/9]"></div>
        <div className="p-4">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
        </div>
    </div>
);

// --- Main SSR Component ---
// Use `async function` for server-side data fetching
async function RelatedArticles({ article }) {

    let relatedArticles = [];
    let fetchError = null;

    // Fetch data directly on the server if article.id exists
    if (article?.id) {
        const cacheKey = `related_articles_${article.id}`;
        // --- IMPORTANT ---
        // Update fetchUrl if you have a dedicated endpoint for related articles
        const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/articles/popular`; // Fallback: Use popular

        try {
            const dataJson = await fetch(`${BASE_URL}/articles/popular`);
            const data = await dataJson.json();

            // Filter and slice data on the server
            relatedArticles = (Array.isArray(data) ? data : [])
                .filter(a => a.id?.toString() !== article.id?.toString())
                .slice(0, 3); // Show top 3

        } catch (err) {
            console.error("SSR: Error fetching related articles:", err); // Log error server-side
            fetchError = "Oxşar məqalələr yüklənərkən xəta baş verdi.";
            relatedArticles = []; // Ensure empty array on error
        }
    } else {
        // Handle case where the main article is invalid (optional)
        // fetchError = "Əsas məqalə tapılmadı.";
        console.warn("SSR: RelatedArticles component received invalid or missing article prop.");
    }


    // --- Render Logic (Server-Side) ---
    const renderContent = () => {
        // NOTE: Loading state isn't really applicable in SSR fetch-then-render.
        // Skeletons could be shown if data fetching was *deferred* client-side,
        // but here we wait for the fetch before rendering.

        if (fetchError) {
            return (
                <div className="text-center py-10 px-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="mx-auto mb-2 text-red-500" size={32} />
                    <p className="text-red-700 font-medium">{fetchError}</p>
                </div>
            );
        }

        if (relatedArticles.length === 0) {
            // Don't show the "not found" message if the main article was invalid
            if (!article?.id) return null;
            return (
                <div className="text-center py-10 px-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-gray-600">Bu məqaləyə oxşar məqalə tapılmadı.</p>
                </div>
            );
        }

        // Render the grid with cards, applying CSS animation via className and index
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((item, index) => (
                    <RelatedArticleCard key={item.id} article={item} index={index} />
                ))}
            </div>
        );
    }

    // Decide whether to render the section at all
    // Render if there was an error OR if there are articles to show
    const shouldRenderSection = fetchError || relatedArticles.length > 0;

    if (!shouldRenderSection) {
        return null; // Don't render the section if no error and no articles
    }


    return (
        <div className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center md:text-left">
                    Oxşar məqalələr
                </h2>
                {renderContent()}
            </div>
        </div>
    );
}

export default RelatedArticles;
