import React from "react";

const SocialMediaStats = () => {
    return (
        <div style={{backgroundColor: "#373D45"}} className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">

                {/* Left Section */}
                <div className="lg:w-5/12 p-5 lg:pr-12 lg:border-r lg:border-gray-400">
                    <h2 className="text-3xl font-bold mb-4">BİZİ TAKİP EDİYOR MUSUNUZ?</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Dijital mecralarda milyonlarca kişiye ulaştık, kalplere dokunduk. Her paylaşım, bir hikayenin
                        başlangıcı oldu. Sizlerle paylaştığımız her içerik, bir köprü kurdu aramızda, Hayalhanem olarak
                        milyonların kalbinde iman hakikatlarının yer etmesi bize umut veriyor.
                    </p>
                </div>

                {/* Right Section */}
                <div className="lg:w-1/2 flex flex-wrap items-center justify-around lg:justify-start lg:space-x-12 space-y-4 lg:space-y-0 mt-6 lg:mt-0">
                    {/* Instagram */}
                    <div className="w-1/2 lg:w-auto text-center">
                        <i className="fab fa-instagram text-5xl mb-2"></i>
                        <p className="text-lg">13.800+</p>
                    </div>

                    {/* YouTube */}
                    <div className="w-1/2 lg:w-auto text-center">
                        <i className="fab fa-youtube text-5xl mb-2"></i>
                        <p className="text-lg">35.600+</p>
                    </div>

                    {/* Facebook */}
                    <div className="w-1/2 lg:w-auto text-center">
                        <i className="fab fa-facebook text-5xl mb-2"></i>
                        <p className="text-lg">6300+</p>
                    </div>

                    {/*/!* Twitter *!/*/}
                    {/*<div className="w-1/2 lg:w-auto text-center">*/}
                    {/*    <i className="fab fa-twitter text-5xl mb-2"></i>*/}
                    {/*    <p className="text-lg">930.000+</p>*/}
                    {/*</div>*/}

                    {/* Telegram */}
                    <div className="w-full lg:w-auto text-center">
                        <i className="fab fa-telegram text-5xl mb-2"></i>
                        <p className="text-lg">1.000+</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialMediaStats;
