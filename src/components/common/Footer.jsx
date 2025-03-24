import React from 'react';
import Link from "next/link";
// Import whichever icons you prefer from React Icons
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#444F5D] text-white py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                {/* Column 1: Logo & Description */}
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

                {/* Column 2: Navigation Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Səhifələr</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/" className="text-gray-400 hover:text-white">
                                Ana Səhifə
                            </Link>
                        </li>
                        <li>
                            <Link href="/videos" className="text-gray-400 hover:text-white">
                                Videolar
                            </Link>
                        </li>
                        <li>
                            <Link href="/articles" className="text-yellow-400 hover:text-white">
                                Məqalələr
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="text-gray-400 hover:text-white">
                                Haqqımızda
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-yellow-400 hover:text-white">
                                Əlaqə
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Əlaqə</h3>
                    <ul className="space-y-2">
                        <li className={"flex justify-center md:justify-start "}>
                            <a
                                href="tel:+994706240062"
                                className="flex items-center text-gray-400 hover:text-white"
                            >
                                <span className="mr-2">📞</span>
                                <span>+994 70 624 00 62</span>
                            </a>
                        </li>
                        {/*<li>*/}
                        {/*    <a*/}
                        {/*        href="mailto:info@ehli-sunne.az"*/}
                        {/*        className="text-gray-400 hover:text-white"*/}
                        {/*    >*/}
                        {/*        info@ehli-sunne.az*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                    </ul>
                </div>

                {/* Column 4: Social Media Icons */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Sosial Şəbəkələr</h3>
                    {/* Stack icons vertically */}
                    <div className="flex flex-col md:ml-10 md:items-start items-center space-y-4">
                        <a
                            href="https://www.facebook.com/ehlisunnemedresesi/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <FaFacebook size={40}/>
                        </a>
                        <a
                            href="https://www.instagram.com/ehlisunnemedresesi/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <FaInstagram size={40}/>
                        </a>
                        <a
                            href="https://www.youtube.com/@ehlisunnemedresesi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <FaYoutube size={40}/>
                        </a>
                    </div>
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
