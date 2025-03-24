'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {motion} from 'framer-motion';
import {Pagination, Navigation} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {useState, useEffect, useRef} from 'react';

export default function VideoSlider() {
    // const [activeIndex, setActiveIndex] = useState(0);
    // const [isMuted, setIsMuted] = useState(true);
    const videoRefs = useRef([]);

    const slides = [
        {
            videoSrc: 'https://res.cloudinary.com/dhhlnrons/video/upload/v1742720671/esm/jdpytj2o4dv8skgcg0eu.mp4',
            title: 'Şeyx Muxaxlı Seyfəddin Baba',
            subtitle: 'Səbr Edənlərin Mükafatı!',
            description: null,
            buttonText: 'BİZİMLE İLETİŞİME GEÇ',
            youtubeLink: 'https://youtu.be/WH4r8eL64DY?si=NDQeZDByUpzMsEA1',
        },
        {
            videoSrc: 'https://res.cloudinary.com/dhhlnrons/video/upload/v1742721316/esm/v05rq0nqbutipvczdo4k.mp4',
            title: 'Ramazan Avari',
            subtitle: 'Əhli-Sünnə Mədrəsəsinin Fəaliyyəti ilə Bağlı Önəmli Açıqlama',
            description:
                'İletişim bilgileri ve daha fazlası için hemen şimdi bizimle iletişime geçin.',
            buttonText: 'DAHA FAZLA BİLGİ AL',
            youtubeLink: 'https://youtu.be/6cKKB1_fick?si=FC3KoBmP6cG7FpDw',
        },
    ];

    // useEffect(() => {
    //     videoRefs.current.forEach((video, index) => {
    //         if (!video) return;
    //         if (index === activeIndex) {
    //             video.muted = isMuted;
    //             video.play().catch(() => {
    //             });
    //         } else {
    //             video.pause();
    //             video.currentTime = 0;
    //         }
    //     });
    // }, [activeIndex, isMuted]);

    return (
        <Swiper
            modules={[Pagination]}
            pagination={{clickable: true}}
            className="h-screen w-full"
            // onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index} className="relative h-full w-full">
                    {/* Video Arka Plan */}
                    <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        width="640"
                        height="360"
                        autoPlay
                        muted
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    >
                        <source src={slide.videoSrc} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>

                    {/* İçerik + Mute Butonu */}
                    <div
                        className="absolute inset-0 flex items-center justify-center lg:justify-end text-white bg-black bg-opacity-50 p-4 md:p-10">

                        {/* Sessize Alma Butonu */}
                        {/*<button*/}
                        {/*    onClick={() => setIsMuted(!isMuted)}*/}
                        {/*    className="absolute top-5 right-5 z-50 bg-black bg-opacity-60 text-white px-4 py-2 rounded hover:bg-opacity-80 transition"*/}
                        {/*>*/}
                        {/*    {isMuted ? '🔇 Səsi Aç' : '🔊 Səssiz Et'}*/}
                        {/*</button>*/}

                        <button
                            className="absolute top-5 right-5 z-50 bg-black bg-opacity-60 text-white px-4 py-2 rounded hover:bg-opacity-80 transition"
                        >
                            <a href={slide.youtubeLink} target="_blank" className="text-white">
                                🔗 Videoya keçid et
                            </a>
                        </button>

                        {/* İçerik */}
                        <div className="text-center lg:text-right space-y-4 max-w-lg lg:max-w-xl">
                            <motion.h1
                                className="text-2xl md:text-4xl lg:text-5xl font-bold"
                                initial={{opacity: 0, y: -50}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 1}}
                            >
                                {slide.title}
                            </motion.h1>

                            <motion.p
                                className="text-sm md:text-lg lg:text-xl"
                                initial={{opacity: 0, y: 50}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 1, delay: 0.5}}
                            >
                                {slide.subtitle}
                            </motion.p>

                            {slide.description && <motion.p
                                className="text-xs md:text-base lg:text-lg max-w-xs md:max-w-md lg:max-w-lg"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 1, delay: 1}}
                            >
                                {slide.description}
                            </motion.p>}


                            {/*<motion.a*/}
                            {/*    href="#contact"*/}
                            {/*    className="inline-block bg-white text-black py-2 px-4 md:py-3 md:px-6 rounded-lg font-semibold hover:bg-gray-200 transition"*/}
                            {/*    initial={{ opacity: 0 }}*/}
                            {/*    animate={{ opacity: 1 }}*/}
                            {/*    transition={{ duration: 1, delay: 1.5 }}*/}
                            {/*>*/}
                            {/*    {slide.buttonText}*/}
                            {/*</motion.a>*/}
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
