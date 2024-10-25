'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import {Autoplay, Pagination} from "swiper/modules";

export default function Feedbacks() {
    const testimonials = [
        {
            text: 'Selamın aleyküm abi. Öğretmenimiz bize performans ödevi verdi. Okuduğunuz kitabın özeti ve yazar hakkında bilgi yazın dedi. Hemen aklıma sen geldin abi. Ben aşk 5 vakittir in özetini yazdım yazarken çok ama çok mutlu oldum. Tekrar olsa tekrar yazarım abi. Ve senin sayende 100 aldım çok mutlu oldum. Mutluluğumu seninle de paylaşmak istedim Allah\'a emanet olun abi.',
            rating: 5,
            icon: '/images/testimonial-icon.png', // Görsel yolunu buraya ekleyin
        },
        {
            text: 'İkinci yorum burada olabilir. Yorum içeriğini buraya ekleyin.',
            rating: 4,
            icon: '/images/testimonial-icon.png',
        },
        {
            text: 'Üçüncü yorum burada olabilir. Yorum içeriğini buraya ekleyin.',
            rating: 5,
            icon: '/images/testimonial-icon.png',
        },
    ];

    return (
        <div className="bg-gray-100 py-12">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }} // Yuvarlak pagination
                autoplay={{ delay: 5000, disableOnInteraction: false }} // 5 saniyelik otomatik geçiş
                spaceBetween={50}
                slidesPerView={1}
                className="max-w-4xl mx-auto"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
                            {/* Yorum İkonu */}
                            <div className="mb-4">
                                <Image
                                    src={testimonial.icon}
                                    alt="Testimonial Icon"
                                    width={50}
                                    height={50}
                                />
                            </div>
                            {/* Yorum Metni */}
                            <p className="text-lg text-gray-700 mb-4">{testimonial.text}</p>
                            {/* Yıldız Değerlendirmesi */}
                            <div className="flex justify-center mb-4">
                                {Array.from({ length: testimonial.rating }).map((_, idx) => (
                                    <span key={idx} className="text-yellow-500 text-xl">★</span>
                                ))}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}