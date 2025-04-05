"use client"

import { useEffect, useState, useCallback } from "react" // Added useCallback
import { useSearchParams, useRouter } from "next/navigation"
import HttpClient from "@/util/HttpClient"
import Link from "next/link"
import CacheProvider from "@/util/CacheProvider"
import Image from "next/image"
// Assuming 'books' is meant to be static for now, keep the import
import { booksData as staticBooks } from "@/components/home/Books"
import { Search, X, Loader2, BookOpen, Video, Newspaper, User, Calendar } from "lucide-react"
import VideoCard from "@/components/videos/VideoCard"; // Import icons

// --- Constants ---
const CACHE_DURATION_MINUTES = 5; // Example cache duration

// --- Main Component ---
export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial search parameters from URL
  const initialSearchValue = searchParams.get("searchValue") || "";
  const initialCategoryId = searchParams.get("categoryId") || ""; // Keep if category filtering is still relevant

  // --- State ---
  const [searchQuery, setSearchQuery] = useState(initialSearchValue); // Input field state, initialized from URL
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({ articles: [], videos: [], books: [] });
  const [error, setError] = useState(null);

  // --- Data Fetching ---
  const fetchSearchData = useCallback(async (currentSearchValue, currentCategoryId) => {
    // Only fetch if there's something to search for
    if (!currentSearchValue && !currentCategoryId) {
      setLoading(false);
      setResults({ articles: [], videos: [], books: [] }); // Clear results if search is empty
      // Optional: Redirect home if absolutely no params were ever intended
      // if (!initialSearchValue && !initialCategoryId) router.push('/');
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors

    let url = "/search?";
    const queryParams = new URLSearchParams();
    let cacheKey = "search";

    if (currentSearchValue) {
      queryParams.set('search', currentSearchValue);
      cacheKey += `_query_${currentSearchValue}`;
    }
    if (currentCategoryId) {
      queryParams.set('categoryId', currentCategoryId);
      cacheKey += `_cat_${currentCategoryId}`;
    }

    url += queryParams.toString();

    try {
      const data = await CacheProvider.fetchData(
          cacheKey,
          CACHE_DURATION_MINUTES, // Use constant for cache duration
          async () => HttpClient.get(url) // No need for .json() if HttpClient handles it
      );

      // Validate fetched data structure (optional but good practice)
      setResults({
        articles: Array.isArray(data?.articles) ? data.articles : [],
        videos: Array.isArray(data?.videos) ? data.videos : [],
        // Use static books for now as per original code, or fetch if API provides them
        books: staticBooks // Assuming books are static or handled differently
        // books: Array.isArray(data?.books) ? data.books : [], // Use if books come from API
      });
    } catch (err) {
      console.error("Error fetching search data:", err);
      setError("Axtarış zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
      setResults({ articles: [], videos: [], books: [] }); // Clear results on error
    } finally {
      setLoading(false);
    }
  }, []); // Removed router from dependencies as it's stable

  // Effect to fetch data when URL search params change
  useEffect(() => {
    fetchSearchData(initialSearchValue, initialCategoryId);
  }, [initialSearchValue, initialCategoryId, fetchSearchData]); // Depend on values from URL

  // --- Handlers ---
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    // Optionally trigger navigation immediately or wait for submit
    // router.push('/search'); // Clears URL param immediately
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery && !initialCategoryId) { // Avoid empty search navigation unless category is set
      // Optionally provide feedback instead of just returning
      return;
    }
    // Update URL to trigger fetch useEffect
    const newParams = new URLSearchParams();
    if (trimmedQuery) newParams.set('searchValue', trimmedQuery);
    if (initialCategoryId) newParams.set('categoryId', initialCategoryId); // Preserve category if present

    router.push(`/search?${newParams.toString()}`);
  };

  // Utility to generate video route
  const generateVideoRoute = (playlistId, videoId) => {
    const params = new URLSearchParams();
    if (playlistId != null) params.set("playlistId", playlistId);
    if (videoId != null) params.set("videoId", videoId);
    return `/videos?${params.toString()}`;
  };

  // --- Render Logic ---
  const hasResults = results.articles.length > 0 || results.videos.length > 0 || results.books.length > 0;
  const showNoResultsMessage = !loading && !error && !hasResults && (initialSearchValue || initialCategoryId);

  return (
      // Use a light gray background for a cleaner look
      <main className="min-h-screen w-full bg-gray-50 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">

          {/* --- Search Bar --- */}
          <div className="mb-10 md:mb-12">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-yellow-500">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Məqalə, video və ya kitab axtarın..."
                  className="flex-grow py-3 pl-11 pr-10 border-none focus:ring-0 outline-none text-gray-800 placeholder-gray-500 text-base" // Adjusted padding and styles
              />
              {searchQuery && (
                  <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      aria-label="Axtarışı təmizlə"
                  >
                    <X className="h-5 w-5" />
                  </button>
              )}
              {/* Submit button kept outside for clarity, but could be integrated */}
              <button
                  type="submit"
                  disabled={!searchQuery.trim()} // Disable if query is empty or whitespace
                  className="bg-yellow-600 text-white px-5 py-3 font-medium hover:bg-yellow-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                Axtar
              </button>
            </form>
          </div>

          {/* --- Page Title --- */}
          {(initialSearchValue || initialCategoryId) && ( // Only show title if there was a search
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 md:mb-10 text-gray-800">
                Axtarış Nəticələri {initialSearchValue && <span className="text-yellow-600">"{initialSearchValue}"</span>}
              </h1>
          )}


          {/* --- Loading State --- */}
          {loading && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 text-yellow-500 animate-spin" />
              </div>
          )}

          {/* --- Error Message --- */}
          {error && !loading && (
              <div className="text-center py-10 px-6 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
          )}

          {/* --- No Results Message --- */}
          {showNoResultsMessage && (
              <div className="text-center py-16 px-6 bg-white rounded-xl border border-gray-100 shadow-sm my-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-50 text-yellow-500 mb-6"><Search className="h-8 w-8" /></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Nəticə tapılmadı</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm leading-relaxed">
                  "{initialSearchValue}" üçün uyğun nəticə tapılmadı. Fərqli açar sözlər yoxlayın.
                </p>
              </div>
          )}

          {/* --- Results Sections --- */}
          {!loading && !error && hasResults && (
              <div className="space-y-12 md:space-y-16">
                {/* Articles Section */}
                <ModernSection title="Məqalələr" data={results.articles} icon={Newspaper}>
                  {results.articles.map((article) => (
                      <ModernCard
                          key={article.id}
                          href={`/articles/${article.id}`}
                          image={article.image || '/placeholder-image.png'} // Add fallback image
                          title={article.title}
                          info1Label="Müəllif"
                          info1={article.authorName}
                          info1Icon={User}
                          info2Label="Kateqoriyalar"
                          info2={article.categories?.join(", ") || "Təyin edilməyib"} // Handle potential undefined/empty categories
                      />
                  ))}
                </ModernSection>

                {/* Videos Section */}
                <ModernSection title="Videolar" data={results.videos} icon={Video}>
                  {results.videos.map((video) => {
                    const thumbnailUrls = video.thumbnail?.split("+") || []; // Handle potential undefined thumbnail
                    const displayThumbnail = thumbnailUrls[2] || thumbnailUrls[0] || '/placeholder-video.png'; // Better fallback logic
                    const formattedDate = video.publishedAt ? new Date(video.publishedAt).toLocaleDateString('az-AZ', { year: 'numeric', month: 'long', day: 'numeric' }) : "Naməlum"; // Improved date formatting

                    return (
                        <VideoCard
                            key={video.videoId}
                            video={video}
                            link={generateVideoRoute(video.playlistId, video.videoId)}
                            // image={displayThumbnail}
                            content={"video"}
                            // info1Label="Tarix"
                            // info1={formattedDate}
                            // info1Icon={Calendar}
                        />
                    );
                  })}
                </ModernSection>

                {/* Books Section (Using Static Data) */}
                <ModernSection title="Kitablar" data={results.books} icon={BookOpen}>
                  {results.books.map((book) => (
                      <ModernCard
                          key={book.id}
                          href={book.href || "#"} // Use books's href if available, otherwise fallback
                          image={book.image || '/placeholder-books.png'} // Add fallback
                          title={book.title}
                          info1Label="Müəllif"
                          info1={book.authorName}
                          info1Icon={User}
                          // Add info2 if available in your static books data
                      />
                  ))}
                </ModernSection>
              </div>
          )}
        </div>
      </main>
  );
}


// --- Section Component ---
function ModernSection({ title, data, children, icon: Icon }) {
  // Only render section if data exists
  if (!data || data.length === 0) {
    return null; // Don't render empty sections
  }

  return (
      <section>
        <div className="flex items-center mb-5 md:mb-6 border-b border-gray-200 pb-3">
          {Icon && <Icon className="h-6 w-6 mr-3 text-yellow-600" />}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
          {children}
        </div>
      </section>
  );
}


// --- Card Component ---
function ModernCard({ href, image, title, info1Label, info1, info1Icon: Info1Icon, info2Label, info2, info2Icon: Info2Icon }) {
  return (
      <Link href={href} className="group block bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300">
        <div className="relative w-full aspect-video overflow-hidden"> {/* Aspect ratio for consistent image height */}
          <img
              src={image}
              alt={title || "Card image"}
              // fill // Use fill to cover the container
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" // Optimize image loading
              className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Optional: Add a subtle gradient overlay for text contrast if needed */}
          {/* <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div> */}
        </div>
        <div className="p-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-yellow-700 mb-2 line-clamp-2 transition-colors">
            {title}
          </h3>
          <div className="text-xs md:text-sm text-gray-600 space-y-1.5"> {/* Slightly increased space */}
            {info1 && (
                <p className="flex items-center">
                  {Info1Icon && <Info1Icon className="h-3.5 w-3.5 mr-1.5 text-gray-400 flex-shrink-0" />}
                  <span className="font-medium text-gray-700 mr-1">{info1Label}:</span>
                  <span className="line-clamp-1">{info1}</span> {/* Prevent long text overflow */}
                </p>
            )}
            {info2 && (
                <p className="flex items-center">
                  {Info2Icon && <Info2Icon className="h-3.5 w-3.5 mr-1.5 text-gray-400 flex-shrink-0" />}
                  <span className="font-medium text-gray-700 mr-1">{info2Label}:</span>
                  <span className="line-clamp-1">{info2}</span>
                </p>
            )}
          </div>
        </div>
      </Link>
  );
}

// "use client"
//
// import { useEffect, useState } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import HttpClient from "@/util/HttpClient"
// import Link from "next/link"
// import CacheProvider from "@/util/CacheProvider"
// import Spinner from "@/components/search/Spinner"
// import Image from "next/image"
// import { books } from "@/components/home/Books"
//
// export default function SearchPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   // Get the initial categoryId from query params (if any)
//   const initialCategoryId = searchParams.get("categoryId") || ""
//   const searchValue = searchParams.get("searchValue") || ""
//
//   // Local state for user input in the search bar
//   const [searchState, setSearchState] = useState("")
//
//   const [loading, setLoading] = useState(true)
//   const [articles, setArticles] = useState([])
//   const [videos, setVideos] = useState([])
//   // const [books, setBooks] = useState([]);
//
//   // Fetch data whenever `categoryId` in the URL changes
//   useEffect(() => {
//     if (searchValue === "" && initialCategoryId === "") {
//       router.push("/")
//     }
//     // console.log("fetch")
//     fetchSearchData()
//   }, [initialCategoryId, searchValue])
//
//   const fetchSearchData = () => {
//     // if (!initialCategoryId) {
//     //     // If there's no categoryId in the URL, we may choose to skip fetching or do a default fetch
//     //     setLoading(false);
//     //     return;
//     // }
//     // setLoading(true);
//     let url = "/search?"
//     let key = "search"
//     if (initialCategoryId || initialCategoryId !== "") {
//       url += `categoryId=${initialCategoryId}`
//       key += `_${initialCategoryId}`
//     }
//
//     if (searchValue || searchValue !== "") {
//       url += `search=${searchValue}`
//       key += `_${searchValue}`
//     }
//
//     CacheProvider.fetchData(key, 0.1, async () => HttpClient.get(url))
//       // .then((res) => res.json())
//       .then((data) => {
//         setArticles(data.articles)
//         setVideos(data.videos)
//         // setBooks(data.books);
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err)
//       })
//       .finally(() => setLoading(false))
//   }
//
//   // Handle search form submission
//   const handleSearchSubmit = (e) => {
//     e.preventDefault()
//     // Navigate to /search?categoryId=searchValue
//     if (!searchState) return
//     router.push(`/search?searchValue=${searchState}`)
//   }
//
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh] bg-gradient-to-r from-yellow-50 to-yellow-100">
//         <Spinner />
//       </div>
//     )
//   }
//
//   const generateRoute = (playlistId, videoId) => {
//     const searchParams = new URLSearchParams()
//     if (playlistId != null) {
//       searchParams.set("playlistId", playlistId)
//     }
//
//     if (videoId != null) {
//       searchParams.set("videoId", videoId)
//     }
//
//     return `/videos?${searchParams}`
//   }
//
//   return (
//     <main className="min-h-screen w-full bg-gradient-to-b from-yellow-50 to-orange-50">
//       {/* Search Bar */}
//       <div className="max-w-6xl mx-auto px-4 py-6">
//         <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 bg-white shadow-md rounded-lg py-3 px-4">
//           <input
//             type="text"
//             value={searchState}
//             onChange={(e) => setSearchState(e.target.value)}
//             placeholder="Axtaris"
//             className="flex-1 border-none outline-none text-gray-700"
//           />
//           <button
//             disabled={searchState === null || searchState === undefined || searchState.trim() === ""}
//             type="submit"
//             className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-gradient bg-gradient-to-r from-yellow-600 via-orange-500 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
//           Axtarışın nəticələri
//         </h1>
//
//         {/*<ConsoleLog log={articles} />*/}
//         {/* Articles Section */}
//         <Section title="Məqalələr" data={articles}>
//           {articles?.map((article) => (
//             <Card
//               href={`/articles/${article.id}`}
//               key={article.id}
//               image={article.image}
//               title={article.title}
//               info1Label="Kategoriyalar"
//               info1={article.categories.join(", ")}
//               info2Label="Müəllif"
//               info2={article.authorName}
//             />
//           ))}
//         </Section>
//
//         {/* Videos Section */}
//         <Section title="Videolar" data={videos}>
//           {videos?.map((video) => {
//             const thumbnailUrls = video.thumbnail.split("+")
//             return (
//               <Card
//                 href={generateRoute(video.playlistId, video.videoId)}
//                 key={video.videoId}
//                 image={thumbnailUrls[2] ?? thumbnailUrls[0]}
//                 title={video.title}
//                 info1Label="Published At"
//                 info1={new Date(video.publishedAt).toLocaleDateString()}
//               />
//             )
//           })}
//         </Section>
//
//         {/* Books Section */}
//         <Section title="Kitablar" data={books}>
//           {books?.map((books) => (
//             <Card
//               href={"#"}
//               key={books.id}
//               image={books.image}
//               title={books.title}
//               info1Label="Müəllif"
//               info1={books.authorName}
//             />
//           ))}
//         </Section>
//       </div>
//     </main>
//   )
// }
//
// /**
//  * Section Component
//  * Renders a heading and a grid of items (children).
//  */
// function Section({ title, data, children }) {
//   return (
//     <section className="mb-12">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
//       {data?.length === 0 ? (
//         <p className="text-gray-600">{title.toLowerCase()} tapılmadı.</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{children}</div>
//       )}
//     </section>
//   )
// }
//
// /**
//  * Card Component
//  * A more modern card with hover animations and subtle styling.
//  */
// function Card({ image, title, info1Label, info1, info2Label, info2, href }) {
//   return (
//     <div className="group relative flex flex-col border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
//       {/* Image */}
//       <div className="overflow-hidden h-40 md:h-48">
//         <Image
//           height={50}
//           width={500}
//           src={image}
//           alt={title}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//       </div>
//
//       {/* Card Body */}
//       <div className="p-4 flex flex-col justify-between flex-1">
//         <h3 className="text-lg hover:text-yellow-600 font-semibold mb-2 text-gray-800 line-clamp-2">
//           <Link href={href}>{title}</Link>
//         </h3>
//         <div className="text-sm text-gray-600 space-y-1">
//           {info1 && (
//             <p>
//               <span className="font-semibold">{info1Label}: </span>
//               {info1}
//             </p>
//           )}
//           {info2 && (
//             <p>
//               <span className="font-semibold">{info2Label}: </span>
//               {info2}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
//
