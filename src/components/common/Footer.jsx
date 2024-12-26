import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#444F5D' }} className="text-white py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                {/* Left Section */}
                <div>
                    <img src="/esm_logo.png" alt="Logo" className="mb-4  w-64 md:mx-0" />

                </div>

                {/* Middle Section */}
                <div>
                    <ul className="space-y-3 md:pl-16">
                        <li><a href="#anasayfa" className="text-gray-400 hover:text-white">Anasayfa</a></li>
                        <li><a href="#sohbetler" className="text-gray-400 hover:text-white">Sohbetler</a></li>
                        <li><a href="#makaleler" className="text-yellow-400 hover:text-white">Makaleler</a></li>
                        <li><a href="#hakkimizda" className="text-gray-400 hover:text-white">Hakkımızda</a></li>
                        <li><a href="#dergi" className="text-gray-400 hover:text-white">Dergi</a></li>
                        <li><a href="#iletisim" className="text-yellow-400 hover:text-white">İletişim</a></li>
                    </ul>
                </div>

                {/* Right Section */}
                <div>
                    <ul className="space-y-4">
                        <li className="flex items-center justify-center md:justify-start text-gray-300">
                            <span className="mr-2">📧</span>
                            <span>bilgi@hayalhanem.com</span>
                        </li>
                        <li className="flex items-center justify-center md:justify-start text-gray-300">
                            <span className="mr-2">📞</span>
                            <span>+90 (553) 552 1 444</span>
                        </li>
                    </ul>
                    <p className="text-gray-300 mt-6">
                        Bütün bildirimlerden ilk sizin haberiniz olmasını istiyorsanız aşağıdaki linkten kayıt
                        olabilirsiniz.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;