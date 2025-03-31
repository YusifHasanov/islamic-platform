import React from "react";

const SocialMediaStats = () => {
    return (
        <div style={{backgroundColor: "#373D45"}} className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">

                {/* Sol Bölüm */}
                <div className="w-full lg:w-5/12 p-5 lg:pr-12 lg:border-r lg:border-gray-400 text-center lg:text-left">
                    <h2 className="text-3xl font-bold mb-4">Bizi izləyirsinizmi?</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Rəqəmsal platformalarda milyonlarla insana çatdıq, ürəklərə toxunduq. Hər paylaşım bir hekayənin başlanğıcı oldu.
                        Sizinlə paylaşdığımız hər məzmun aramızda bir körpü qurdu. Əhli Sünnə Medresesi olaraq, milyonların ürəyində iman həqiqətlərinin yer alması bizə ümid verir.
                    </p>
                </div>

                {/* Sağ Bölüm */}
                <div className="w-full lg:w-7/12 flex flex-wrap items-center justify-center  gap-8  lg:gap-12 mt-6 lg:mt-0">
                    {/* Instagram */}
                    <div className="w-1/2 sm:w-1/3 lg:w-auto text-center">
                        <i className="fab fa-instagram text-6xl mb-2"></i>
                        <p className="text-lg">13.800+</p>
                    </div>

                    {/* YouTube */}
                    <div className="w-1/2 sm:w-1/3 lg:w-auto text-center">
                        <i className="fab fa-youtube text-6xl mb-2"></i>
                        <p className="text-lg">35.600+</p>
                    </div>

                    {/* Facebook */}
                    <div className="w-1/2 sm:w-1/3 lg:w-auto text-center">
                        <i className="fab fa-facebook text-6xl mb-2"></i>
                        <p className="text-lg">6.300+</p>
                    </div>

                    {/* Telegram */}
                    <div className="w-1/2 sm:w-1/3 lg:w-auto text-center">
                        <i className="fab fa-telegram text-6xl mb-2"></i>
                        <p className="text-lg">1.000+</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialMediaStats;
