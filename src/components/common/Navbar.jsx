'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'
import {ChevronDown} from 'lucide-react'
import HttpClient from "@/util/HttpClient";
import {usePathname} from "next/navigation";


const staticMenuItems = [
    {
        name: 'Menular',
        href: '/',
        subcategories: [
            {
                name: 'Videolar',
                href: '/videos',
                subcategories: []
            },
            {
                name: 'Məqalələr',
                href: '/articles',
                subcategories: []
            },
            {
                name: 'Haqqımızda',
                href: '/about',
                subcategories: []
            },
            {
                name: 'Əlaqə',
                href: '/contact',
                subcategories: []
            }
        ]
    }

]

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeSubmenu, setActiveSubmenu] = useState(null)
    const [menuItems, setMenuItems] = useState([])
    const pathname = usePathname()

    useEffect(() => {
        HttpClient.get("/categories/menu")
            .then(res => res.json())
            .then(res => setMenuItems([...res, ...staticMenuItems]))
            .catch(err => console.log(err))
    }, [])

    const toggleSubmenu = (title) => {
        setActiveSubmenu(activeSubmenu === title ? null : title)
    }
    const isActive = (href) => {
        if (href !== "/" && pathname.startsWith(href)) {
            return "text-[#F7E652]";
        }
        if (href === "/" && pathname === "/") {
            return "text-[#F7E652]";
        }
        return "text-white";
    };

    const handleClick = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    }

    const href = (id) => {
        return `/search?categoryId=${id}`
    }

    return (
        <nav className="bg-[#007A4C]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
          <span className="text-white font-bold text-lg">
         <Link href={"/"}>
                <span className="text-[#F7E652]">Əhli Sünnə </span>Mədrəsəsi
         </Link>
          </span>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {menuItems.map((item) => (
                                <div key={item.name} className="relative group">
                                    <Link
                                        href={item.href ?? href(item.id)}
                                        className={`${isActive(item.href ?? href(item.id))} hover:text-[#F7E652]`}
                                    >
                                        {item.name}
                                        {item.subcategories.length > 0 && (
                                            <ChevronDown className="inline-block ml-1 h-4 w-4"/>
                                        )}
                                    </Link>
                                    {item.subcategories.length > 0 && (
                                        <div style={{zIndex: 454}}
                                             className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                                            <div className="py-1" role="menu" aria-orientation="vertical"
                                                 aria-labelledby="options-menu">
                                                {item.subcategories.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href ?? href(subItem.id)}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                        role="menuitem"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
                    mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {menuItems.map((item) => (
                        <div key={item.name}>
                            <button
                                className={`${isActive(item.href ?? href(item.id))} block px-3 py-2 rounded-md text-base font-medium`}

                            >
                                <Link className={"hover:text-[#F7E652]"} onClick={handleClick}
                                      href={item.href ?? href(item.id)}> {item.name}</Link>
                                {item.subcategories.length > 0 && (
                                    <ChevronDown
                                        onClick={() => toggleSubmenu(item.name)}
                                        className={`inline-block ml-1 h-5 w-5 transition-transform duration-300 ${
                                            activeSubmenu === item.name ? "rotate-180" : ""
                                        }`}
                                    />
                                )}
                            </button>
                            <div className={`pl-4 mt-2 space-y-1 md:hidden transition-all duration-500 ease-in-out  overflow-hidden
                            ${item.subcategories.length > 0 && activeSubmenu === item.name ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                                {item.subcategories.map((subItem) => (
                                    <Link
                                        onClick={handleClick}
                                        key={subItem.name}
                                        href={subItem.href ?? href(subItem.id)}
                                        className=" hover:text-[#F7E652] text-white block px-3 py-2 rounded-md text-sm"
                                    >
                                        {subItem.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </nav>
    )
}

export default Navbar


