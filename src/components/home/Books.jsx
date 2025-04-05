"use client";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import Image from "next/image";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi"; // Using react-icons

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


// Static data defined outside component
export const booksData = [
    {
        id: 1,
        image: "https://res.cloudinary.com/dhhlnrons/image/upload/v1742722148/esm/books/tujvd6zrscuqiqhskvxp.jpg",
        title: "Əhli-Sünnə Əqidəsi",
        authorName: "Əhli-Sünnə Mədrəsəsi",
        category: 'Əqidə',
        description: 'İslam əqidəsinin əsasları, tövhid, şirk və digər mühüm mövzular Əhli-Sünnə prizmasından geniş izah olunur. Hər bir müsəlmanın bilməsi vacib olan məsələlər əhatə olunub.',
        price: '3 AZN',
        contactPhone: '+994 55 585 03 69',
        chapters: ['Tövhidin növləri', 'Şirk və onun təhlükələri', 'İmanın şərtləri', 'Qədərə iman']

    },
    {
        id: 2,
        image: "https://res.cloudinary.com/dhhlnrons/image/upload/v1742722145/esm/books/qwqgjoagkondanp5gktf.jpg",
        title: "Müxtəsər Elmihal", // Example: Different title
        authorName: "Əhli-Sünnə Mədrəsəsi",
        category: 'Fiqh',
        description: 'Gündəlik ibadətlər (namaz, oruc, zəkat, həcc), təharət qaydaları və muamilatla bağlı əsas fiqhi hökmlər sadə dildə izah edilir.',
        price: '4 AZN',
        contactPhone: '+994 55 585 03 69',
        chapters: ['Təharət bəhsi', 'Namazın qaydaları', 'Orucun hökmləri', 'Zəkat və sədəqə']

    },
    {
        id: 3,
        image: "https://res.cloudinary.com/dhhlnrons/image/upload/v1742722117/esm/books/zxwlxh1zsjutjhocvi1x.jpg",
        title: "İmanın Əsasları", // Example: Different title
        authorName: "Əhli-Sünnə Mədrəsəsi",
        category: 'Əqidə',
        description: 'İmanın altı şərti (Allaha, mələklərə, kitablara, peyğəmbərlərə, axirət gününə, qədərə iman) dəlillərlə və ətraflı şəkildə şərh olunur.',
        price: '3 AZN',
        contactPhone: '+994 55 585 03 69',
        chapters: ['Allaha iman', 'Mələklərə iman', 'Kitablara iman', 'Peyğəmbərlərə iman', 'Axirətə iman', 'Qədərə iman']

    },
    { // Add more books if available
        id: 4,
        image: "https://res.cloudinary.com/dhhlnrons/image/upload/v1742722148/esm/books/tujvd6zrscuqiqhskvxp.jpg", // Placeholder image
        title: "Fiqh Dərsləri",
        authorName: "Əhli-Sünnə Mədrəsəsi",
        category: 'Əqidə',
        description: 'İmanın altı şərti (Allaha, mələklərə, kitablara, peyğəmbərlərə, axirət gününə, qədərə iman) dəlillərlə və ətraflı şəkildə şərh olunur.',
        price: '3 AZN',
        contactPhone: '+994 55 585 03 69',
        chapters: ['Allaha iman', 'Mələklərə iman', 'Kitablara iman', 'Peyğəmbərlərə iman', 'Axirətə iman', 'Qədərə iman']

    },
];

export default function Books() {
    // useEffect(() => {
    //   // Fetch books data here if needed
    //   // Example: fetch('/api/books').then(res => res.json()).then(setBooks);
    // }, []);

    return (
        // Container is now managed by the HomePage section
        // Removed max-w-7xl and px-4 from here
        <div className="relative">
            {/* Swiper Container - Added padding for navigation buttons */}
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{clickable: true, el: '.books-pagination'}} // Custom pagination element
                navigation={{
                    prevEl: ".books-button-prev",
                    nextEl: ".books-button-next",
                }}
                breakpoints={{
                    640: {slidesPerView: 2, spaceBetween: 20},
                    768: {slidesPerView: 3, spaceBetween: 30},
                    1024: {slidesPerView: 4, spaceBetween: 30}, // Show more on larger screens
                }}
                className="!pb-12" // Add padding bottom for pagination
            >
                {booksData.map((book) => (
                    <SwiperSlide key={book.id} className="!flex justify-center">
                        {/* Book Card */}
                        <div
                            className="group flex w-full max-w-[220px] sm:max-w-[250px] flex-col items-center text-center">
                            <div
                                className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    fill
                                    sizes="(max-width: 640px) 80vw, (max-width: 768px) 40vw, (max-width: 1024px) 30vw, 250px" // Optimized sizes
                                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                    priority={book.id <= 3} // Prioritize loading first few books images
                                />
                                {/* Optional: Add a subtle overlay on hover */}
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="mt-4 text-base sm:text-lg font-semibold text-gray-800">{book.title}</h3>
                            <p className="text-sm text-gray-500">{book.authorName}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom navigation buttons */}
            <button
                aria-label="Previous book"
                className="books-button-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-2 shadow-md transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <FiChevronLeft className="h-6 w-6 text-gray-700"/>
            </button>
            <button
                aria-label="Next book"
                className="books-button-next absolute right-0 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-2 shadow-md transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <FiChevronRight className="h-6 w-6 text-gray-700"/>
            </button>

            {/* Custom pagination container */}
            <div className="books-pagination flex justify-center space-x-2 mt-8"></div>

            {/* Custom Swiper pagination styles */}
            <style jsx global>{`
                .books-pagination .swiper-pagination-bullet {
                    background-color: #d1d5db; /* gray-300 */
                    opacity: 0.8;
                    transition: background-color 0.3s ease, width 0.3s ease;
                    width: 8px;
                    height: 8px;
                }

                .books-pagination .swiper-pagination-bullet-active {
                    background-color: #f97316; /* orange-500 */
                    opacity: 1;
                    width: 16px; /* Make active bullet wider */
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
}


// "use client"
// import { Swiper, SwiperSlide } from "swiper/react"
// import "swiper/css"
// import "swiper/css/navigation"
// import "swiper/css/pagination"
// import Image from "next/image"
// import { Pagination, Navigation } from "swiper/modules"
//
// export const books = [
//   {
//     id: 1,
//     image: "https://res.cloudinary.com/dhhlnrons/image/upload/v1742722148/esm/books/tujvd6zrscuqiqhskvxp.jpg",
//     title: "Əhli-Sünnə Əqidəsi",
//     authorName: "Əhli-Sünnə Mədrəsəsi",
//   },
//   {
//     id: 2,
//     image: "https://res.cloudinary.com/dhhlnrons/image/upload/v1742722145/esm/books/qwqgjoagkondanp5gktf.jpg",
//     title: "Əhli-Sünnə Əqidəsi",
//     authorName: "Əhli-Sünnə Mədrəsəsi",
//   },
//   {
//     id: 3,
//     image: "https://res.cloudinary.com/dhhlnrons/image/upload/v1742722117/esm/books/zxwlxh1zsjutjhocvi1x.jpg",
//     title: "Əhli-Sünnə Əqidəsi",
//     authorName: "Əhli-Sünnə Mədrəsəsi",
//   },
// ]
// export default function Component() {
//   // useEffect(() => {
//   //         HttpClient.get('/books')
//   //             .then(res => res.json())
//   //             .then(books => setBooks(books))
//   //             .catch(err => console.log(err))
//   //     console.log("dsdas")
//   //
//   //     },
//   //     [])
//
//   return (
//     <div className="mx-auto max-w-7xl px-4 py-16">
//       <div className="mb-12 text-center">
//         <h2 className="text-4xl font-bold tracking-tight">Kitablarımız</h2>
//         <div className="mt-2 mx-auto h-1 w-24 bg-orange-500" />
//       </div>
//
//       <div className="relative px-12">
//         <Swiper
//           modules={[Navigation, Pagination]}
//           spaceBetween={30}
//           slidesPerView={1}
//           navigation={{
//             prevEl: ".swiper-button-prev",
//             nextEl: ".swiper-button-next",
//           }}
//           breakpoints={{
//             640: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//             1280: { slidesPerView: 3 },
//           }}
//           className="!px-4"
//         >
//           {books.map((books, index) => (
//             <SwiperSlide key={index} className="!flex justify-center">
//               <div className="group flex w-full max-w-[250px] flex-col items-center transition-all duration-300 hover:-translate-y-2">
//                 <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-lg">
//                   <Image
//                     src={books.image}
//                     alt={books.title}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
//                   />
//                 </div>
//                 <h3 className="mt-4 text-center text-lg font-semibold">{books.title}</h3>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//
//         {/* Custom navigation buttons */}
//         <button className="swiper-button-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-100">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             className="h-6 w-6"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//           </svg>
//         </button>
//         <button className="swiper-button-next absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-100">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             className="h-6 w-6"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   )
// }
//
