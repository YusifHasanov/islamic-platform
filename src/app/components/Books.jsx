'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import {Pagination,Navigation} from "swiper/modules";

const books = [
    { title: 'Yâ Bâkî Entel Bâkî', image: 'https://hayalhanem.com/wp-content/uploads/2024/10/nasil-dayandin-ya-resulallah-1.jpeg' },
    { title: 'Sa’d bin Ebî Vakkâs (R.A.)', image: 'https://hayalhanem.com/wp-content/uploads/2024/10/nasil-dayandin-ya-resulallah-1.jpeg' },
    { title: 'Zübeyr bin Avvâm (R.A.)', image: 'https://hayalhanem.com/wp-content/uploads/2024/10/nasil-dayandin-ya-resulallah-1.jpeg' },
    { title: 'Saîd bin Zeyd (R.A.)', image: 'https://hayalhanem.com/wp-content/uploads/2024/10/nasil-dayandin-ya-resulallah-1.jpeg' },
];

export default function BooksCarousel() {
    return (
        <div className="max-w-7xl mx-auto py-12">
            <h2 className="text-center text-3xl font-bold mb-6">MEHMET YILDIZ'IN TÜM KİTAPLARI</h2>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="w-full"
            >
                {books.map((book, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex flex-col items-center p-4">
                            <Image
                                src={book.image}
                                alt={book.title}
                                width={200}
                                height={300}
                                className="rounded-lg object-cover"
                            />
                            <h3 className="mt-4 text-xl font-semibold">{book.title}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}