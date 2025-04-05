"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaYoutube } from "react-icons/fa"; // Using react-icons

// Static data defined outside component
const slides = [
  {
    id: 1,
    videoSrc: "https://res.cloudinary.com/dhhlnrons/video/upload/v1742720671/esm/jdpytj2o4dv8skgcg0eu.mp4",
    title: "Şeyx Muxaxlı Seyfəddin Baba",
    subtitle: "Səbr Edənlərin Mükafatı!",
    description: null,
    youtubeLink: "https://youtu.be/WH4r8eL64DY?si=NDQeZDByUpzMsEA1",
  },
  {
    id: 2,
    videoSrc: "https://res.cloudinary.com/dhhlnrons/video/upload/v1743080791/esm/homepage/lubjcf8kkdivjgk2hdox.mp4",
    title: "Ramazan Avari",
    subtitle: "Əhli-Sünnə Mədrəsəsinin Fəaliyyəti ilə Bağlı Önəmli Açıqlama",
    description: "İletişim bilgileri ve daha fazlası için hemen şimdi bizimle iletişime geçin.",
    youtubeLink: "https://youtu.be/6cKKB1_fick?si=FC3KoBmP6cG7FpDw",
  },
];

// ... (rest of your component code remains the same) ...

export default function VideoSlider() {
  const videoRefs = useRef([]);

  // Optional: Handle video play/pause on slide change for performance
  const handleSlideChange = (swiper) => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === swiper.realIndex) {
        video.play().catch(error => console.log("Autoplay prevented:", error));
      } else {
        video.pause();
      }
    });
  };


  return (
       <Swiper
           modules={[Pagination, Navigation, Autoplay]}
           pagination={{ clickable: true }}
           navigation={true}
           loop={true}
           autoplay={{
             delay: 8000,
             disableOnInteraction: true,
           }}
           className="h-screen w-full videoSlider"
           onSlideChange={handleSlideChange}
       >
         {slides.map((slide, index) => (
             <SwiperSlide key={slide.id} className="relative h-full w-full">
               {/* Video Background */}
               <video
                   ref={(el) => (videoRefs.current[index] = el)}
                   width="1920"
                   height="1080"
                   autoPlay={index === 0} // Only autoplay the initially active slide
                   muted
                   loop
                   playsInline
                   preload="metadata"
                   className="absolute top-0 left-0 w-full h-full object-cover -z-10"
               >
                 <source src={slide.videoSrc} type="video/mp4" />
                 Your browser does not support the video tag.
               </video>

               {/* Content Overlay */}
               <div className="absolute inset-0 flex items-center justify-center lg:justify-end text-white bg-black bg-opacity-60 p-6 md:p-10 lg:p-16">

                 {/* YouTube Link Button */}
                 <a
                     href={slide.youtubeLink}
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label={`Watch "${slide.title}" on YouTube`}
                     className="absolute top-5 right-5 z-20 flex items-center gap-2 bg-red-600 bg-opacity-80 text-white px-4 py-2 rounded-md hover:bg-opacity-100 transition duration-300"
                 >
                   <FaYoutube className="h-5 w-5" />
                   <span className="hidden sm:inline">Videoya keçid et</span>
                 </a>

                 {/* Content */}
                 <div className="text-center lg:text-right space-y-4 max-w-lg lg:max-w-xl">
                   <motion.h1
                       className="text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-md"
                       initial={{ opacity: 0, y: -30 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.8, ease: "easeOut" }}
                   >
                     {slide.title}
                   </motion.h1>

                   <motion.p
                       className="text-base md:text-lg lg:text-xl drop-shadow-sm"
                       initial={{ opacity: 0, y: 30 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                   >
                     {slide.subtitle}
                   </motion.p>

                   {slide.description && (
                       <motion.p
                           className="text-sm md:text-base lg:text-lg max-w-xs md:max-w-md lg:max-w-lg opacity-90"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ duration: 1, delay: 0.6 }}
                       >
                         {slide.description}
                       </motion.p>
                   )}
                 </div>
               </div>
             </SwiperSlide>
         ))}
       </Swiper>
  );
}

// "use client"
// import "swiper/css"
// import "swiper/css/navigation"
// import "swiper/css/pagination"
// import { motion } from "framer-motion"
// import { Pagination, Navigation } from "swiper/modules"
// import { Swiper, SwiperSlide } from "swiper/react"
// import { useRef } from "react"
//
// export default function VideoSlider() {
//   // const [activeIndex, setActiveIndex] = useState(0);
//   // const [isMuted, setIsMuted] = useState(true);
//   const videoRefs = useRef([])
//
//   const slides = [
//     {
//       videoSrc: "https://res.cloudinary.com/dhhlnrons/video/upload/v1742720671/esm/jdpytj2o4dv8skgcg0eu.mp4",
//       title: "Şeyx Muxaxlı Seyfəddin Baba",
//       subtitle: "Səbr Edənlərin Mükafatı!",
//       description: null,
//       buttonText: "BİZİMLE İLETİŞİME GEÇ",
//       youtubeLink: "https://youtu.be/WH4r8eL64DY?si=NDQeZDByUpzMsEA1",
//     },
//     {
//       // videoSrc: 'https://res.cloudinary.com/dhhlnrons/video/upload/v1742721316/esm/v05rq0nqbutipvczdo4k.mp4',
//       videoSrc: "https://res.cloudinary.com/dhhlnrons/video/upload/v1743080791/esm/homepage/lubjcf8kkdivjgk2hdox.mp4",
//       title: "Ramazan Avari",
//       subtitle: "Əhli-Sünnə Mədrəsəsinin Fəaliyyəti ilə Bağlı Önəmli Açıqlama",
//       description: "İletişim bilgileri ve daha fazlası için hemen şimdi bizimle iletişime geçin.",
//       buttonText: "DAHA FAZLA BİLGİ AL",
//       youtubeLink: "https://youtu.be/6cKKB1_fick?si=FC3KoBmP6cG7FpDw",
//     },
//   ]
//
//   // useEffect(() => {
//   //     videoRefs.current.forEach((video, index) => {
//   //         if (!video) return;
//   //         if (index === activeIndex) {
//   //             video.muted = isMuted;
//   //             video.play().catch(() => {
//   //             });
//   //         } else {
//   //             video.pause();
//   //             video.currentTime = 0;
//   //         }
//   //     });
//   // }, [activeIndex, isMuted]);
//
//   return (
//     <Swiper
//       modules={[Pagination, Navigation]}
//       pagination={{ clickable: true }}
//       className="h-screen w-full"
//       navigation={true}
//       // onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
//     >
//       {slides.map((slide, index) => (
//         <SwiperSlide key={index} className="relative h-full w-full">
//           {/* Video Arka Plan */}
//           <video
//             ref={(el) => (videoRefs.current[index] = el)}
//             width="640"
//             height="360"
//             autoPlay
//             muted
//             playsInline
//             className="absolute top-0 left-0 w-full h-full object-cover"
//           >
//             <source src={slide.videoSrc} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//
//           {/* İçerik + Mute Butonu */}
//           <div className="absolute inset-0 flex items-center justify-center lg:justify-end text-white bg-black bg-opacity-50 p-4 md:p-10">
//             {/* Sessize Alma Butonu */}
//             {/*<button*/}
//             {/*    onClick={() => setIsMuted(!isMuted)}*/}
//             {/*    className="absolute top-5 right-5 z-50 bg-black bg-opacity-60 text-white px-4 py-2 rounded hover:bg-opacity-80 transition"*/}
//             {/*>*/}
//             {/*    {isMuted ? '🔇 Səsi Aç' : '🔊 Səssiz Et'}*/}
//             {/*</button>*/}
//
//             <button className="absolute top-5 right-5 z-50 bg-black bg-opacity-60 text-white px-4 py-2 rounded hover:bg-opacity-80 transition">
//               <a href={slide.youtubeLink} target="_blank" className="text-white" rel="noreferrer">
//                 🔗 Videoya keçid et
//               </a>
//             </button>
//
//             {/* İçerik */}
//             <div className="text-center lg:text-right space-y-4 max-w-lg lg:max-w-xl">
//               <motion.h1
//                 className="text-2xl md:text-4xl lg:text-5xl font-bold"
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1 }}
//               >
//                 {slide.title}
//               </motion.h1>
//
//               <motion.p
//                 className="text-sm md:text-lg lg:text-xl"
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1, delay: 0.5 }}
//               >
//                 {slide.subtitle}
//               </motion.p>
//
//               {slide.description && (
//                 <motion.p
//                   className="text-xs md:text-base lg:text-lg max-w-xs md:max-w-md lg:max-w-lg"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 1, delay: 1 }}
//                 >
//                   {slide.description}
//                 </motion.p>
//               )}
//
//               {/*<motion.a*/}
//               {/*    href="#contact"*/}
//               {/*    className="inline-block bg-white text-black py-2 px-4 md:py-3 md:px-6 rounded-lg font-semibold hover:bg-gray-200 transition"*/}
//               {/*    initial={{ opacity: 0 }}*/}
//               {/*    animate={{ opacity: 1 }}*/}
//               {/*    transition={{ duration: 1, delay: 1.5 }}*/}
//               {/*>*/}
//               {/*    {slide.buttonText}*/}
//               {/*</motion.a>*/}
//             </div>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   )
// }
//
