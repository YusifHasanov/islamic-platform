import React from 'react';
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#444F5D] text-white py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                {/* 1. Logo və təsvir */}
                <div>
                    <img
                        src="/esm_logo.png"
                        alt="Logo"
                        className="mb-4 w-32 mx-auto md:mx-0"
                    />
                    <p className="text-gray-300 text-sm">
                        Əhli Sünnə Medrəsəsi iman, fiqh və siyer mövzularında
                        mənəvi dünyanızı zənginləşdirmək üçün məzmunlar təqdim edir.
                    </p>
                </div>

                {/* 2. Səhifələr */}
                <div className="flex flex-col md:block">
                    <h3 className="text-lg font-semibold mb-3">Səhifələr</h3>
                    <ul className="space-y-2 text-center md:text-left">
                        <li><Link href="/" className="text-gray-400 hover:text-white">Ana Səhifə</Link></li>
                        <li><Link href="/videos" className="text-gray-400 hover:text-white">Videolar</Link></li>
                        <li><Link href="/articles" className="text-yellow-400 hover:text-white">Məqalələr</Link></li>
                        <li><Link href="/about" className="text-gray-400 hover:text-white">Haqqımızda</Link></li>
                        <li><Link href="/contact" className="text-yellow-400 hover:text-white">Əlaqə</Link></li>
                    </ul>

                    {/* Mobil görünüş üçün sosial ikonlar sağda */}
                    <div className="flex justify-center mt-4 space-x-4 md:hidden">
                        <a href="https://www.facebook.com/ehlisunnemedresesi/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaFacebook size={30} /></a>
                        <a href="https://www.instagram.com/ehlisunnemedresesi/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaInstagram size={30} /></a>
                        <a href="https://www.youtube.com/@ehlisunnemedresesi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaYoutube size={30} /></a>
                    </div>
                </div>

                {/* 3. Əlaqə */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Əlaqə</h3>
                    <ul className="space-y-2">
                        <li className="flex justify-center md:justify-start">
                            <a
                                href="tel:+994706240062"
                                className="flex items-center text-gray-400 hover:text-white"
                            >
                                <span className="mr-2">📞</span>
                                <span>+994 70 624 00 62</span>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* 4. Desktop üçün Sosial Şəbəkələr */}
                <div className="hidden md:flex md:flex-col md:items-start space-y-4">
                    <h3 className="text-lg font-semibold mb-3">Sosial Şəbəkələr</h3>
                    <a href="https://www.facebook.com/ehlisunnemedresesi/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaFacebook size={30} /></a>
                    <a href="https://www.instagram.com/ehlisunnemedresesi/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaInstagram size={30} /></a>
                    <a href="https://www.youtube.com/@ehlisunnemedresesi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaYoutube size={30} /></a>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
                © {new Date().getFullYear()} Əhli Sünnə Mədrəsəsi. Bütün hüquqlar qorunur.
            </div>
        </footer>
    );
};

export default Footer;
