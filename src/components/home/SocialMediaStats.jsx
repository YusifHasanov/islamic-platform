import { FaInstagram, FaYoutube, FaFacebook, FaTelegramPlane } from 'react-icons/fa'; // Using react-icons

const stats = [
    { platform: 'Instagram', icon: FaInstagram, count: '13.8K+', color: 'text-pink-500' },
    { platform: 'YouTube', icon: FaYoutube, count: '35.6K+', color: 'text-red-600' },
    { platform: 'Facebook', icon: FaFacebook, count: '6.3K+', color: 'text-blue-600' },
    { platform: 'Telegram', icon: FaTelegramPlane, count: '1.0K+', color: 'text-sky-500' },
];

const SocialMediaStats = () => {
    return (
        // Container is managed by HomePage section
        <div className="text-white  flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

            {/* Left Section: Text */}
            <div className="w-full lg:w-5/12 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Bizi İzləyirsinizmi?</h2>
                <p className="text-gray-300 text-justify leading-relaxed text-base md:text-lg">
                    Rəqəmsal platformalarda milyonlarla insana çatdıq, ürəklərə toxunduq. Hər paylaşım bir hekayənin başlanğıcı
                    oldu. Sizinlə paylaşdığımız hər məzmun aramızda bir körpü qurdu. Əhli Sünnə Mədrəsəsi olaraq, milyonların
                    ürəyində iman həqiqətlərinin yer alması bizə ümid verir.
                </p>
            </div>

            {/* Right Section: Stats */}
            <div className="w-full lg:w-6/12 grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
                {stats.map((stat) => (
                    <div key={stat.platform} className="flex flex-col items-center text-center p-4 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-300">
                        <stat.icon className={`text-5xl md:text-6xl mb-3 ${stat.color}`} /> {/* Colored icons */}
                        <p className="text-xl md:text-2xl font-semibold">{stat.count}</p>
                        <p className="text-sm text-gray-300">{stat.platform}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SocialMediaStats;

// const SocialMediaStats = () => {
//   return (
//     <div style={{ backgroundColor: "#373D45" }} className="bg-gray-800 text-white py-12">
//       <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
//         {/* Sol Bölüm */}
//         <div className="w-full lg:w-5/12 p-5 lg:pr-12 lg:border-r lg:border-gray-400 text-center lg:text-left">
//           <h2 className="text-3xl font-bold mb-4">Bizi izləyirsinizmi?</h2>
//           <p className="text-gray-300 leading-relaxed">
//             Rəqəmsal platformalarda milyonlarla insana çatdıq, ürəklərə toxunduq. Hər paylaşım bir hekayənin başlanğıcı
//             oldu. Sizinlə paylaşdığımız hər məzmun aramızda bir körpü qurdu. Əhli Sünnə Medresesi olaraq, milyonların
//             ürəyində iman həqiqətlərinin yer alması bizə ümid verir.
//           </p>
//         </div>
//
//         {/* Sağ Bölüm */}
//         <div className="w-full lg:w-7/12 flex flex-wrap items-center justify-center  gap-8  lg:gap-12 mt-6 lg:mt-0">
//           {/* Instagram */}
//           <div className="w-1/2 sm:w-1/3 lg:w-auto text-center">
//             <i className="fab fa-instagram text-6xl mb-2"></i>
//             <p className="text-lg">13.800+</p>
//           </div>
//
//           {/* YouTube */}
//           <div className="w-1/2 sm:w-1/3 lg:w-auto text-center">
//             <i className="fab fa-youtube text-6xl mb-2"></i>
//             <p className="text-lg">35.600+</p>
//           </div>
//
//           {/* Facebook */}
//           <div className="w-1/2 sm:w-1/3 lg:w-auto text-center">
//             <i className="fab fa-facebook text-6xl mb-2"></i>
//             <p className="text-lg">6.300+</p>
//           </div>
//
//           {/* Telegram */}
//           <div className="w-1/2 sm:w-1/3 lg:w-auto text-center">
//             <i className="fab fa-telegram text-6xl mb-2"></i>
//             <p className="text-lg">1.000+</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
//
// export default SocialMediaStats
//
