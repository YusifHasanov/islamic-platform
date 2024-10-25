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
            videoSrc: 'https://www.youtube.com/embed/ffzoHzwn5d8?si=cI8u6-K9RTzrmPgg', // Videonuzun yolu
            title: 'HER CUMARTESİ',
            subtitle: 'Sizleri de bekliyoruz!',
            description:
                'Her hafta Cumartesi akşamları saat 20.00’de, Mersin, İstanbul, Ankara ve Almanya’dan bir araya geliyoruz. Sen yoksan bir kişi eksiğiz!',
            buttonText: 'BİZİMLE İLETİŞİME GEÇ',
        },
        {
            videoSrc: 'https://www.youtube.com/embed/furdMsQ_aJk?si=f6Y3SKpfOzir3j7a', // İkinci video
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
                    {/* Arka planda video oynatma */}
                    <iframe width="560" height="315" src={slide.videoSrc}
                            title="YouTube video player" frameBorder="0"
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                    {/* Slider içeriği */}
                    <div
                        className="absolute inset-0 flex items-center justify-end text-white bg-black bg-opacity-50 pr-10">
                        <div className="text-right space-y-4 max-w-xl">
                            {/* Başlık animasyonu */}
                            <motion.h1
                                className="text-5xl font-bold"
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                {slide.title}
                            </motion.h1>

                            {/* Alt başlık animasyonu */}
                            <motion.p
                                className="text-xl"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                {slide.subtitle}
                            </motion.p>

                            {/* Açıklama animasyonu */}
                            <motion.p
                                className="text-lg max-w-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                            >
                                {slide.description}
                            </motion.p>

                            {/* Buton */}
                            <motion.a
                                href="#contact"
                                className="inline-block bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition"
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