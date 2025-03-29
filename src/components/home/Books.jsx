'use client'
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import {Pagination, Navigation} from "swiper/modules";


export const books = [
    {
        id: 1,
        image: "https://res.cloudinary.com/dhhlnrons/image/upload/v1742722148/esm/books/tujvd6zrscuqiqhskvxp.jpg",
        title: "Əhli-Sünnə Əqidəsi",
        authorName: "Əhli-Sünnə Mədrəsəsi"
    },
    {
        id: 2,
        image: "https://res.cloudinary.com/dhhlnrons/image/upload/v1742722145/esm/books/qwqgjoagkondanp5gktf.jpg",
        title: "Əhli-Sünnə Əqidəsi",
        authorName: "Əhli-Sünnə Mədrəsəsi"
    },
    {
        id: 3,
        image: "https://res.cloudinary.com/dhhlnrons/image/upload/v1742722117/esm/books/zxwlxh1zsjutjhocvi1x.jpg",
        title: "Əhli-Sünnə Əqidəsi",
        authorName: "Əhli-Sünnə Mədrəsəsi"
    }

];
export default function Component() {

    // useEffect(() => {
    //         HttpClient.get('/books')
    //             .then(res => res.json())
    //             .then(books => setBooks(books))
    //             .catch(err => console.log(err))
    //     console.log("dsdas")
    //
    //     },
    //     [])


    return (
        <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold tracking-tight">Kitablarımız</h2>
                <div className="mt-2 mx-auto h-1 w-24 bg-orange-500"/>
            </div>

            <div className="relative px-12">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    breakpoints={{
                        640: {slidesPerView: 2},
                        1024: {slidesPerView: 3},
                        1280: {slidesPerView: 3},
                    }}
                    className="!px-4"
                >
                    {books.map((book, index) => (
                        <SwiperSlide key={index} className="!flex justify-center">
                            <div
                                className="group flex w-full max-w-[250px] flex-col items-center transition-all duration-300 hover:-translate-y-2">
                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-lg">
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="mt-4 text-center text-lg font-semibold">{book.title}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom navigation buttons */}
                <button
                    className="swiper-button-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
                    </svg>
                </button>
                <button
                    className="swiper-button-next absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}
