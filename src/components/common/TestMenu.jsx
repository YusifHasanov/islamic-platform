"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {Menu, ChevronDown, ChevronUp} from "lucide-react"
import {usePathname} from "next/navigation";
import {create} from 'zustand'

export const useNavbarState = create((set) => ({
    mobileMenuOpen: false,
    toggleMenu: () => set((state) => ({mobileMenuOpen: !state.mobileMenuOpen})),
    closeMenu: () => set({mobileMenuOpen: false}),
}));

export const TestMenu = ({menus}) => {
    const {mobileMenuOpen, toggleMenu, closeMenu} = useNavbarState();


    return (
        <nav className="relative bg-[#007A4C] ">
            <section
                className=" flex w-full md:max-w-7xl mx-auto justify-between  md:justify-between md:items-center py-2 px-3 rounded">
                <div className={"ml-3 md:ml-0 flex justify-center items-center"}>
                    <Link href="/" className="">
                        <Image height={60} width={70} src={"/esm_logo.png"} alt={"logo"}/>
                    </Link>
                    <div className="flex-shrink-0">
                            <span className="text-white font-bold text-lg">
                                <Link href={'/'}>
                                    <span className="text-[#F7E652]">Əhli Sünnə </span>Mədrəsəsi
                                </Link>
                            </span>
                    </div>
                </div>
                <div className="lg:hidden mr-2 flex items-center">
                    <button onClick={() => toggleMenu()} className="p-2 focus:outline-none">
                        <Menu className={"text-white"}/>
                    </button>
                </div>
                <div className="hidden md:flex  justify-between items-center">

                    {menus.map((item, idx) => (
                        <React.Fragment key={idx}>
                            <NavDropDownMenu item={item}/>
                            {idx < menus.length - 1 && <div className="w-6"/>}
                        </React.Fragment>
                    ))}
                </div>
            </section>

            {/* Mobile dropdown menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute z-50 w-full bg-green-800 text-white shadow-lg rounded-b-md">
                    <MobileNav navItems={menus} closeMenu={() => closeMenu()}/>
                </div>
            )}
        </nav>
    )
}

const NavDropDownMenu = ({item}) => {
    const [open, setOpen] = React.useState(false)
    const pathname = usePathname();


    const isActive = (href) => {
        const currentPath = pathname;

        // Əgər `href` ilə aktiv səhifənin URL-i uyğun gəlirsə
        if (href !== '/' && currentPath.startsWith(href)) {
            return 'text-[#F7E652]';
        }

        if (href === '/' && currentPath === '/') {
            return 'text-[#F7E652]';
        }

        // const categoryIdNum = Number(categoryId);

        // Bu item və ya hər hansı bir subcategory'si ilə eynidirsə
        // if (categoryIdNum && hasMatchingCategoryId(item, categoryIdNum)) {
        //     return 'text-[#F7E652]';
        // }

        return 'text-white';
    };

    // const hasMatchingCategoryId = (item, categoryId) => {
    //     console.log("item, categoryId", categoryId);
    //     if (!item) return false;
    //     if (item.id === categoryId) return true;
    //     if (!item.subcategories || item.subcategories.length === 0) return false;
    //
    //     return item.subcategories.some((sub) => hasMatchingCategoryId(sub, categoryId));
    // };

    return (
        <div className="relative" onMouseLeave={() => setOpen(false)}>
            <div onMouseEnter={() => setOpen(true)}>
                <Link href={item.href}
                      className={`flex items-center justify-center ${isActive(item.href)} hover:text-[#F7E652]`}>
                    {item.name} {item.subcategories.length > 0 && <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-right"
                    >
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </>}
                </Link>
            </div>

            {open && item.subcategories.length > 0 && (
                <div
                    className="absolute z-10 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    {item.subcategories.map((childItem, idx) =>
                        childItem.subcategories.length > 0 ? (
                            <NavSubMenu key={idx} item={childItem}/>
                        ) : (
                            <div key={idx} className="px-4 py-2 text-sm hover:bg-gray-100">
                                <Link href={childItem.href} className="block w-full">
                                    {childItem.name}
                                </Link>
                            </div>
                        ),
                    )}
                </div>
            )}
        </div>
    )
}

const NavSubMenu = ({item}) => {
    const [open, setOpen] = React.useState(false)


    return (
        <div
            className="relative px-4 py-2 text-sm hover:bg-gray-100"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div className="flex items-center justify-between">
                <Link href={item.href}>{item.name}</Link>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right"
                >
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
            </div>

            {open && (
                <div
                    className="absolute left-full top-0 z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    {item.subcategories.map((childItem, idx) =>
                        childItem.subcategories.length > 0 ? (
                            <NavSubMenu key={idx} item={childItem}/>
                        ) : (
                            <div key={idx} className="px-4 py-2 text-sm hover:bg-gray-100">
                                <Link href={childItem.href} className="block w-full">
                                    {childItem.name}
                                </Link>
                            </div>
                        ),
                    )}
                </div>
            )}
        </div>
    )
}

function MobileNav({navItems}) {
    return (
        <div className="">
            <nav className="flex flex-col">
                {navItems.map((item, index) => (
                    <MobileNavMenu key={index} item={item}/>
                ))}
            </nav>
        </div>
    )
}

const MobileNavMenu = ({item}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const {mobileMenuOpen, toggleMenu, closeMenu} = useNavbarState();

    return (
        <div className="w-full">
            <div
                className="flex w-full items-center justify-between px-4 py-3 text-white font-medium border-b border-green-700"
                onClick={() => item.subcategories.length > 0 && setIsOpen(!isOpen)}
            >
                <Link
                    href={item.href}
                    className="flex-grow"
                    onClick={(e) => {closeMenu()}}
                >
                    {item.name}
                </Link>
                {item.subcategories.length > 0 && (
                    <div className="p-1">{isOpen ? <ChevronUp className="h-5 w-5"/> :
                        <ChevronDown className="h-5  w-5"/>}</div>
                )}
            </div>

            {
                isOpen && item.subcategories.length > 0 && (
                    <div className="bg-green-800">
                        {item.subcategories.map((childItem, index) => (
                            <div key={index} className="px-8 py-3 border-b border-green-700 text-white">
                                <Link href={childItem.href}>{childItem.name}</Link>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

