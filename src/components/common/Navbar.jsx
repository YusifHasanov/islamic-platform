'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import HttpClient from '@/util/HttpClient';
import { usePathname } from 'next/navigation';

const staticMenuItems = [
    {
        name: 'Videolar',
        href: '/videos',
        subcategories: [],
    },
    {
        name: 'Məqalələr',
        href: '/articles',
        subcategories: [],
    },
    {
        name: 'Haqqımızda',
        href: '/about',
        subcategories: [],
    },
    {
        name: 'Əlaqə',
        href: '/contact',
        subcategories: [],
    },
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [openSubMenu, setOpenSubMenu] = useState(null); // Submenu state
    const pathname = usePathname();

    useEffect(() => {
        HttpClient.get('/categories/menu', {
            revalidate: 600,
        })
            .then((res) => res.json())
            .then((res) => setMenuItems([...res, ...staticMenuItems]))
            .catch((err) => console.log(err));
    }, []);

    const isActive = (href) => {
        if (href !== '/' && pathname.startsWith(href)) {
            return 'text-[#F7E652]';
        }
        if (href === '/' && pathname === '/') {
            return 'text-[#F7E652]';
        }
        return 'text-white';
    };

    const handleClick = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const toggleSubMenu = (name) => {
        setOpenSubMenu(openSubMenu === name ? null : name); // Toggle submenu state
    };

    const href = (id) => {
        return `/search?categoryId=${id}`;
    };

    const renderSubcategories = (subcategories) => {
        return subcategories.map((subItem) => (
            <Link
                key={subItem.name}
                href={subItem.href ?? href(subItem.id)}
                className="block px-4 py-2 text-sm hover:bg-gray-200  rounded"
            >
                {subItem.name}
            </Link>
        ));
    };

    const renderMenuItems = (items) => {
        return items.map((item) => (
            <div key={item.name} className="relative menu-item">
                <div className="flex justify-between items-center">
                    <Link
                        href={item.href ?? href(item.id)}
                        className={`${isActive(item.href ?? href(item.id))} hover:text-[#F7E652]`}
                    >
                        {item.name}
                    </Link>
                    {item.subcategories && item.subcategories.length > 0 && (
                        <button
                            onClick={() => toggleSubMenu(item.name)}
                            className="text-white ml-2 focus:outline-none"
                        >
                            <ChevronDown
                                className={`h-4 w-4 transform transition-transform ${
                                    openSubMenu === item.name ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                    )}
                </div>
                {item.subcategories && item.subcategories.length > 0 && (
                    <div
                        className={`submenu ${
                            openSubMenu === item.name ? 'show' : ''
                        } transition-all`}
                    >
                        {renderSubcategories(item.subcategories)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <nav className="bg-[#007A4C]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-white font-bold text-lg">
                                <Link href={'/'}>
                                    <span className="text-[#F7E652]">Əhli Sünnə </span>Mədrəsəsi
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">{renderMenuItems(menuItems)}</div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={handleClick}
                            className="text-white hover:text-[#F7E652] focus:outline-none"
                        >
                            {mobileMenuOpen ? (
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
            </div>
            <div
                className={`md:hidden transition-all duration-500 ease-in-out ${
                    mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1">{renderMenuItems(menuItems)}</div>
            </div>
        </nav>
    );
};

export default Navbar;