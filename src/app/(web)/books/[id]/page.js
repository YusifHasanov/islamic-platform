'use client'
// pages/kitablar/[slug].js (or app/kitablar/[slug]/page.js)
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {useParams, useRouter} from 'next/navigation'; // For fallback state in pages router
// import { useParams } from 'next/navigation'; // For app router
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Phone } from 'lucide-react';
import {booksData} from "@/components/home/Books"; // Example icons

// --- Sample Data Fetching (Replace with actual logic) ---
// This function simulates fetching a single books by its slug
 function getBookData(slug) {
    console.log("Fetching books for slug:", slug);
    // In a real app, fetch from your API:
    // const res = await fetch(`/api/books/${slug}`);
    // if (!res.ok) return null;
    // return await res.json();

    // Simulate finding the books from sample data
    const book = booksData.find(b => b.id == slug); // Use the sample data from listing page example
    // await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
    return book || null;
}

// Reuse sample data from listing page for simulation

// --- End Sample Data ---


// --- Using Pages Router (getStaticProps/getServerSideProps) ---
/*
export async function getStaticPaths() {
    // Fetch all books slugs from your API or source
    // const slugs = await fetch('/api/books-slugs').then(res => res.json());
    const slugs = sampleAllBooks.map(books => books.slug);

    const paths = slugs.map((slug) => ({
        params: { slug },
    }));

    return { paths, fallback: true }; // fallback: true or 'blocking' needed for dynamic paths
}

export async function getStaticProps({ params }) {
    const bookData = await getBookData(params.slug);

    if (!bookData) {
        return {
            notFound: true, // Return 404 if books not found
        };
    }

    return {
        props: {
            books: bookData,
        },
        revalidate: 60 * 10, // Optional: Revalidate data every 10 minutes
    };
}

export default function BookDetailPage({ books }) {
    const router = useRouter();

    // Handle fallback state while page is generating
    if (router.isFallback) {
        return <div className="flex justify-center items-center min-h-screen"><Loader2 className="h-12 w-12 animate-spin text-emerald-600"/></div>;
    }

     // Book not found (if getStaticProps returned notFound: true) - should be handled by Next.js 404
    if (!books) {
       return <div>Kitab tapılmadı.</div>; // Or render custom 404 component
    }
    */

// --- Using App Router (generateStaticParams & Page Component) ---
// app/kitablar/[slug]/page.js

/*
export async function generateStaticParams() {
  // Fetch all books slugs
  // const slugs = await fetch('/api/books-slugs').then(res => res.json());
   const slugs = sampleAllBooks.map(books => books.slug);

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

async function getBook(slug) {
   // Use the same getBookData function or API call
   return await getBookData(slug);
}

export default async function BookDetailPage({ params }) {
   const books = await getBook(params.slug);

   if (!books) {
     notFound(); // Use Next.js notFound function for 404
   }
*/

// --- Combined Component Logic (Adapt based on Router choice above) ---
// Assuming 'books' is passed as a prop (from getStaticProps/getServerSideProps)
// or fetched inside async component (App Router)
// This is the JSX part, usable with either router pattern

// Add this part inside the function component definition (either default export or the async one)
const BookDetailContent = ({ book }) => { // Renamed to avoid conflict if used with App Router pattern
    const router = useRouter(); // Still useful for back navigation

    if (!book) { // Basic check if needed (App Router handles via notFound())
        return <div className="flex justify-center items-center min-h-screen">Kitab tapılmadı.</div>;
    }

    const contactPhoneNumber = book.contactPhone || '+994555850369'; // Fallback phone
    const phoneLink = `tel:${contactPhoneNumber.replace(/\s/g, '')}`;
    const whatsappLink = `https://wa.me/${contactPhoneNumber.replace(/\D/g, '')}`; // Basic WhatsApp link generation


    return (
        <>
            <Head>
                <title>{book.title} - Əhli-Sünnə Mədrəsəsi</title>
                <meta name="description" content={book.description?.substring(0, 160) || `Əhli-Sünnə Mədrəsəsi tərəfindən nəşr olunan ${book.title} kitabı haqqında məlumat.`} />
                {/* Add Open Graph tags for social sharing */}
                <meta property="og:title" content={`${book.title} - Əhli-Sünnə Mədrəsəsi`} />
                <meta property="og:description" content={book.description?.substring(0, 160)} />
                <meta property="og:image" content={book.image} /> {/* Use absolute URL */}
                <meta property="og:type" content="book" />
            </Head>

            <div className="bg-white min-h-screen">
                {/* Back Navigation (Optional) */}
                <div className="bg-gray-50 border-b border-gray-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-emerald-700 transition-colors"
                        >
                            <ArrowLeft size={16} />
                            Kitablar Siyahısına Qayıt
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">

                        {/* Book Cover Image */}
                        <div className="lg:col-span-1 md:sticky md:top-10 h-fit"> {/* Make image sticky */}
                            <div className="aspect-[3/4] relative w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-200">
                                <Image
                                    src={book.image || '/images/placeholder_book.png'}
                                    alt={book.title}
                                    layout="fill"
                                    objectFit="cover"
                                    priority // Prioritize loading the main image
                                />
                            </div>
                            {/* Price Badge */}
                            {book.price && (
                                <div className="mt-4 text-center text-2xl font-bold text-emerald-600">
                                    {book.price}
                                </div>
                            )}
                        </div>

                        {/* Book Details & Content */}
                        <div className="lg:col-span-2">
                            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                                {book.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {book.title}
                            </h1>
                            <p className="text-lg text-gray-600 mb-6">
                                {book.author}
                            </p>

                            {/* Description */}
                            <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed mb-8">
                                {book.description ? (
                                    <p>{book.description}</p> // Render description (consider markdown/rich text)
                                ) : (
                                    <p className="italic text-gray-500">Kitab haqqında ətraflı məlumat yoxdur.</p>
                                )}
                            </div>

                            {/* Chapters/Content List (If applicable) */}
                            {book.chapters && book.chapters.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Kitabın İçindəkilər</h3>
                                    <ul className="list-disc list-inside space-y-1.5 text-gray-600 pl-2">
                                        {book.chapters.map((chapter, index) => (
                                            <li key={index}>{chapter}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Order/Contact Information */}
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Kitabı Əldə Etmək Üçün</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Kitabı sifariş vermək və ya əlavə məlumat almaq üçün aşağıdakı nömrə ilə əlaqə saxlaya bilərsiniz:
                                </p>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                    <a
                                        href={phoneLink}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-md shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-colors text-sm font-medium"
                                    >
                                        <Phone size={16} />
                                        Zəng Et ({contactPhoneNumber})
                                    </a>
                                    {/* Optional WhatsApp Button */}
                                    <a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition-colors text-sm font-medium"
                                    >
                                        {/* You can use a WhatsApp icon here */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.273-.099-.471-.148-.67.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.67-1.611-.916-2.206-.242-.579-.487-.501-.67-.51-.173-.008-.371-.01-.57-.01s-.521.074-.795.372c-.273.296-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path></svg>
                                        WhatsApp ilə Əlaqə
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// Determine which export method based on your router choice
// For Pages Router:
// (Keep the getStaticProps/getStaticPaths/default export structure from the commented-out Pages Router section)
// export default BookDetailPage; // Using the prop 'books'

// For App Router:
// (Keep the generateStaticParams/async Page structure from the commented-out App Router section)
// And rename the content part:
// export default async function BookDetailPage({ params }) {
//    const books = await getBook(params.slug);
//    if (!books) { notFound(); }
//    return <BookDetailContent books={books} />; // Use the JSX part here
// }


// --- TEMPORARY Export for testing (REMOVE based on your router) ---
// You'll need to integrate the 'BookDetailContent' into the correct Next.js data fetching pattern
// For now, just exporting the content part for viewing structure
export default function TemporaryExport() {
    const params = useParams()
    const mockBook = getBookData(params.id); // Use first books for example
    console.log(mockBook);
    if (!mockBook) return <div>Loading or Book not found...</div>; // Basic loading/error
    return <BookDetailContent book={mockBook} />
}
// --------------------------------------------------------------------
