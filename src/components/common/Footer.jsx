import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#444F5D',
        }} className="text-white py-12">
            <div className="container mx-auto grid grid-cols-3 gap-8">
                {/* Left Section */}
                <div>
                    <img src="https://hayalhanem.com/wp-content/uploads/2024/10/logo-beyaz.svg" alt="Logo" className="mb-4" />
                    <p className="text-gray-300 mb-6">
                        Bütün bildirimlerden ilk sizin haberiniz olmasını istiyorsanız aşağıdaki linkten kayıt olabilirsiniz.
                    </p>
                    <div className="flex space-x-8 items-center">
                        <div className="text-center">
                            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                                <img src="https://example.com/android.png" alt="Android" className="h-10" />
                            </a>
                            <p className="text-gray-400 mt-2">ANDROID</p>
                        </div>
                        <div className="text-center">
                            <a href="https://apple.com" target="_blank" rel="noopener noreferrer">
                                <img src="https://example.com/ios.png" alt="iOS" className="h-10" />
                            </a>
                            <p className="text-gray-400 mt-2">iOS</p>
                        </div>
                    </div>
                </div>

                {/* Middle Section */}
                <div>
                    <ul className="space-y-3 text-center">
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
                        <li className="text-gray-300">
                            <span role="img" aria-label="email">📧</span> bilgi@hayalhanem.com
                        </li>
                        <li className="text-gray-300">
                            <span role="img" aria-label="phone">📞</span> +90 (553) 552 1 444
                        </li>
                        <li className="text-gray-300">
                            <span role="img" aria-label="location">📍</span> Mersin, Çiftlikköy Mah. 3287 Sk. No:10 Yenişehir, MERSİN
                        </li>
                        <li className="text-gray-300">
                            <span role="img" aria-label="location">📍</span> İstanbul, Esentepe, Dergiler Sk. No:2/1, 34394 Şişli, İSTANBUL
                        </li>
                        <li className="text-gray-300">
                            <span role="img" aria-label="location">📍</span> Ankara, Aşağı Öveçler, 1332. Sk. No:8, 06460 Çankaya, ANKARA
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;