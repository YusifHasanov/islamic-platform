
'use client'
import {useState} from "react";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#007A4C]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                <div className="flex-shrink-0">
          <span className="text-white font-bold text-lg">
            <span className="text-[#F7E652]">HAYAL</span>HANEM
          </span>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <Link  href="/" className="text-[#F7E652] hover:text-white">
                        ANASAYFA
                    </Link>
                    <Link href="/videos" className="text-white hover:text-[#F7E652]">
                        SOHBETLER
                    </Link>
                    <Link href="/articles" className="text-white hover:text-[#F7E652]">
                        MAKALELER
                    </Link>
                    <Link href="/about" className="text-white hover:text-[#F7E652]">
                        HAKKIMIZDA
                    </Link>
                    {/*<Link href="/dergi" className="text-white hover:text-[#F7E652]">*/}
                    {/*    DERGİ*/}
                    {/*</Link>*/}
                    <div className="relative">
                        <button className="text-white hover:text-[#F7E652]">
                            İLETİŞİM
                        </button>
                    </div>
                    <Link
                        href="/bagis"
                        className="bg-[#F7E652] text-[#007A4C] py-2 px-4 rounded-md hover:bg-white"
                    >
                        BAĞIŞ
                    </Link>
                </div>
                <div className="flex md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white hover:text-[#F7E652] focus:outline-none"
                    >
                        {isOpen ? (
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <a
                        href="/"
                        className="text-[#F7E652] block px-3 py-2 rounded-md text-base font-medium bg-gray-100"
                    >
                        ANASAYFA
                    </a>
                    <a
                        href="/sohbetler"
                        className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                    >
                        SOHBETLER
                    </a>
                    <a
                        href="/makaleler"
                        className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                    >
                        MAKALELER
                    </a>
                    <a
                        href="/hakkimizda"
                        className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                    >
                        HAKKIMIZDA
                    </a>
                    <a
                        href="/dergi"
                        className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                    >
                        DERGİ
                    </a>
                    <a
                        href="/iletisim"
                        className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                    >
                        İLETİŞİM
                    </a>
                    <a
                        href="/bagis"
                        className="bg-[#F7E652] text-[#007A4C] block px-3 py-2 rounded-md text-base font-medium hover:bg-white"
                    >
                        BAĞIŞ
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;