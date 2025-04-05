// pages/kitablar/index.js (or app/kitablar/page.js)
"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, ListFilter, X, ArrowRight, Loader2, SearchX } from 'lucide-react'; // Added SearchX
import debounce from 'lodash.debounce';
import { motion, AnimatePresence } from "framer-motion";
import { booksData as sampleAllBooks } from "@/components/home/Books";
import CategorySidebar from "@/components/common/CategorySidebar"; // Renamed import for clarity

// --- Import the HIERARCHICAL sidebar component ---

// --- !!! UPDATED SAMPLE DATA STRUCTURE !!! ---
// Categories now need id, name, parentId
const sampleHierarchicalCategories = [
    { id: '1', name: 'Əqidə', parentId: null },
    { id: '2', name: 'Fiqh', parentId: null },
    { id: '3', name: 'Hənəfi Fiqhi', parentId: '2' }, // Child of Fiqh
    { id: '4', name: 'Şafi Fiqhi', parentId: '2' },   // Child of Fiqh
    { id: '5', name: 'Hədis', parentId: null },
    { id: '6', name: 'Təfsir', parentId: null },
    { id: '7', name: 'Əxlaq', parentId: null },
    { id: '8', name: 'İbadət Əxlaqı', parentId: '7' }, // Child of Əxlaq
];

// Assume booksData now has categoryId (You MUST update your actual data source)
// Example update to sampleAllBooks if needed:
// const sampleAllBooks = [
//    { id: '1', title: 'Əhli-Sünnə Əqidəsi', author: '...', imageUrl: '...', slug: '...', categoryId: '1', category: 'Əqidə'},
//    { id: '2', title: 'Müxtəsər Elmihal', author: '...', imageUrl: '...', slug: '...', categoryId: '3', category: 'Hənəfi Fiqhi'}, // Example assignment
//    ...
// ];
// --- End Updated Sample Data ---


// --- Book Card Component (Keep as is) ---
const BookCard = React.memo(({ book }) => (
    <Link href={`/books/${book.id}`} passHref // Changed link path assuming book detail uses id
          className="group block bg-white rounded-lg shadow-md border border-gray-200/80 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">

        <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
                src={book.image || '/images/placeholder_book.png'}
                alt={book.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
            />
        </div>
        <div className="p-4 flex flex-col flex-grow justify-between">
            <div>
                <h3 className="text-base font-semibold text-gray-800 mb-1 group-hover:text-emerald-700 line-clamp-2">
                    {book.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                    {book.author}
                </p>
            </div>
            {/* Display category name still, but filtering uses ID */}
            <span
                className="mt-2 text-xs inline-block bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-medium self-start">
                    {book.category}
                </span>
        </div>

    </Link>
));
BookCard.displayName = 'BookCard';


// --- REMOVE the old FilterSidebar definition ---


// --- Main Page Component ---
export default function BooksListPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State for search, filter, data, loading
    const [searchTerm, setSearchTerm] = useState(() => searchParams.get('q') || '');
    // --- Selected Category now stores ID string ---
    const [selectedCategoryId, setSelectedCategoryId] = useState(() => searchParams.get('category') || '');
    const [allBooks, setAllBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    // --- Categories state now holds hierarchical objects ---
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true); // Added for sidebar loading


    // Fetch initial data
    useEffect(() => {
        setIsLoading(true);
        setIsLoadingCategories(true); // Start category loading indicator
        // Simulate fetching books and HIERARCHICAL categories
        Promise.all([
            Promise.resolve(sampleAllBooks),           // Replace with your book fetch
            Promise.resolve(sampleHierarchicalCategories) // Replace with your hierarchical category fetch
        ]).then(([fetchedBooks, fetchedCategories]) => {
            // --- Make sure books have categoryId ---
            // You might need to map/transform fetchedBooks here if they don't have categoryId yet
            setAllBooks(fetchedBooks);
            setCategories(fetchedCategories);
            // Apply initial filtering based on URL params (using category ID now)
            filterAndSearchBooks(fetchedBooks, searchTerm, selectedCategoryId);
        }).catch(error => {
            console.error("Error fetching initial books data:", error);
        }).finally(() => {
            setIsLoading(false);
            setIsLoadingCategories(false); // Finish category loading indicator
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- UPDATED Filtering Logic ---
    const filterAndSearchBooks = (books, term, categoryId) => {
        let result = books;

        // Filter by category ID
        if (categoryId) {
            // This assumes your book objects have a `categoryId` property
            // Convert both to string for reliable comparison if IDs might be numbers
            result = result.filter(book => book.categoryId?.toString() === categoryId.toString());
            // If books only have category NAME, you'd need a lookup:
            // const selectedCatObj = categories.find(c => c.id.toString() === categoryId.toString());
            // if (selectedCatObj) {
            //    result = result.filter(book => book.category === selectedCatObj.name);
            // }
        }

        // Filter by search term
        if (term) {
            const lowerCaseTerm = term.toLowerCase();
            result = result.filter(book =>
                book.title.toLowerCase().includes(lowerCaseTerm) ||
                book.author.toLowerCase().includes(lowerCaseTerm)
            );
        }
        setFilteredBooks(result);
    };


    // Debounced search handler (Passes category ID now)
    const debouncedSearch = useCallback(
        debounce((term, categoryId) => {
            const params = new URLSearchParams(searchParams.toString());
            if (term) params.set('q', term); else params.delete('q');
            if (categoryId) params.set('category', categoryId); else params.delete('category'); // Use categoryId
            router.push(`/books?${params.toString()}`, { scroll: false });

            setIsFiltering(true);
            filterAndSearchBooks(allBooks, term, categoryId); // Use categoryId
            setTimeout(() => setIsFiltering(false), 200);
        }, 300),
        [allBooks, router, searchParams]
    );


    // Update state and trigger debounced search when inputs change
    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        debouncedSearch(newSearchTerm, selectedCategoryId); // Pass category ID
    };

    // --- Handler for category selection (takes ID) ---
    const handleCategorySelect = (categoryId) => { // Renamed and accepts ID string
        setSelectedCategoryId(categoryId);
        debouncedSearch(searchTerm, categoryId); // Use category ID
    };

    // --- Clear filters now sets category ID to empty ---
    const handleClearFilters = () => {
        handleCategorySelect(''); // Use the selection handler with empty string
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        debouncedSearch('', selectedCategoryId); // Pass category ID
    }

    return (
        <>
            <Head>
                <title>Kitablar - Əhli-Sünnə Mədrəsəsi</title>
                <meta name="description" content="Əhli-Sünnə Mədrəsəsi tərəfindən nəşr olunan kitabları kəşf edin." />
            </Head>

            <div className="bg-gray-50 min-h-screen">
                {/* Simple Header (Keep as is) */}
                <div className="bg-white border-b border-gray-200 py-8">
                    {/* ... header content ... */}
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                            Mədrəsəmizin Kitabları
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">Axtardığınız elmi və mənəvi qaynaqları burada
                            tapın.</p>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="lg:grid lg:grid-cols-4 lg:gap-8 items-start">

                        {/* === USE ArticleCategorySidebar === */}
                        <aside className="lg:col-span-1">
                            <CategorySidebar
                                categories={categories}            // Pass hierarchical categories
                                selectedCategory={selectedCategoryId} // Pass selected ID string
                                onCategorySelect={handleCategorySelect} // Pass ID selection handler
                                isLoading={isLoadingCategories}   // Pass category loading state
                            />
                            {/* The old FilterSidebar is removed */}
                        </aside>
                        {/* =============================== */}


                        {/* Main Content Area (Keep as is) */}
                        <main className="lg:col-span-3 mt-8 lg:mt-0">
                            {/* Search Bar */}
                            {/* ... search bar JSX ... */}
                            <div className="relative mb-8">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400"/>
                                </div>
                                <input
                                    type="search"
                                    placeholder="Kitab adı və ya müəllif axtar..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-base"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={handleClearSearch}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        aria-label="Axtarışı təmizlə"
                                    >
                                        <X className="h-5 w-5"/>
                                    </button>
                                )}
                            </div>


                            {/* Loading / Results Grid */}
                            {/* ... loading/filtering/results JSX ... */}
                            {/* Loading / Results Grid */}
                            {isLoading ? (
                                // More detailed Skeleton Grid
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {[...Array(9)].map((_, i) => (
                                        <div key={i}
                                             className="bg-white rounded-lg shadow-sm border border-gray-100 animate-pulse">
                                            <div className="aspect-[3/4] bg-gray-200 rounded-t-lg"></div>
                                            <div className="p-4 space-y-3">
                                                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : isFiltering ? (
                                // Filtering Indicator
                                <div className="flex items-center justify-center py-16 text-gray-500">
                                    <Loader2 className="h-8 w-8 animate-spin mr-3"/>
                                    <span>Filterlənir...</span>
                                </div>
                            ) : filteredBooks.length > 0 ? (
                                // Books Grid with animation
                                <motion.div
                                    layout // Animate layout changes
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {filteredBooks.map((book) => (
                                            <motion.div
                                                key={book.id}
                                                layout
                                                initial={{opacity: 0, scale: 0.95}}
                                                animate={{opacity: 1, scale: 1}}
                                                exit={{opacity: 0, scale: 0.95}}
                                                transition={{duration: 0.2}}
                                            >
                                                <BookCard book={book}/>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            ) : (
                                // No Results Found
                                <div
                                    className="text-center py-16 px-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <SearchX className="h-12 w-12 mx-auto text-emerald-400 mb-4"/>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Nəticə Tapılmadı</h3>
                                    <p className="text-gray-600">Axtarışınıza və ya seçdiyiniz filtrə uyğun kitab
                                        tapılmadı.</p>
                                    <button
                                        onClick={handleClearFilters}
                                        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                                    >
                                        Filtrləri Sıfırla
                                    </button>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
