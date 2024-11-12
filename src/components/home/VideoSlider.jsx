'use client'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function VideoSlider() {
    const slides = [
        {
            videoSrc: 'https://www.youtube.com/embed/ffzoHzwn5d8?si=cI8u6-K9RTzrmPgg',
            title: 'HER CUMARTESİ',
            subtitle: 'Sizleri de bekliyoruz!',
            description:
                'Her hafta Cumartesi akşamları saat 20.00’de, Mersin, İstanbul, Ankara ve Almanya’dan bir araya geliyoruz. Sen yoksan bir kişi eksiğiz!',
            buttonText: 'BİZİMLE İLETİŞİME GEÇ',
        },
        {
            videoSrc: 'https://www.youtube.com/embed/furdMsQ_aJk?si=f6Y3SKpfOzir3j7a',
            title: 'SİZİ BEKLİYORUZ',
            subtitle: 'Bu etkinlik tam size göre!',
            description:
                'İletişim bilgileri ve daha fazlası için hemen şimdi bizimle iletişime geçin.',
            buttonText: 'DAHA FAZLA BİLGİ AL',
        },
    ];

    return (
        <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="h-screen w-full"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index} className="relative h-full w-full">
                    {/* Arka planda video */}
                    <iframe
                        src={slide.videoSrc}
                        title="YouTube video player"
                        frameBorder="0"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>

                    {/* Slider içeriği */}
                    <div
                        className="absolute inset-0 flex items-center justify-center lg:justify-end text-white bg-black bg-opacity-50 p-4 md:p-10"
                    >
                        <div className="text-center lg:text-right space-y-4 max-w-lg lg:max-w-xl">
                            {/* Başlık animasyonu */}
                            <motion.h1
                                className="text-2xl md:text-4xl lg:text-5xl font-bold"
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                {slide.title}
                            </motion.h1>

                            {/* Alt başlık animasyonu */}
                            <motion.p
                                className="text-sm md:text-lg lg:text-xl"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                {slide.subtitle}
                            </motion.p>

                            {/* Açıklama animasyonu */}
                            <motion.p
                                className="text-xs md:text-base lg:text-lg max-w-xs md:max-w-md lg:max-w-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                            >
                                {slide.description}
                            </motion.p>

                            {/* Buton */}
                            <motion.a
                                href="#contact"
                                className="inline-block bg-white text-black py-2 px-4 md:py-3 md:px-6 rounded-lg font-semibold hover:bg-gray-200 transition"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1.5 }}
                            >
                                {slide.buttonText}
                            </motion.a>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}