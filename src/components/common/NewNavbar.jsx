"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {Menu, ChevronDown, ChevronUp} from "lucide-react"
import {usePathname, useRouter} from "next/navigation"
import {create} from 'zustand'
import {motion, AnimatePresence} from "framer-motion"

export const useNavbarState = create((set) => ({
    mobileMenuOpen: false,
    toggleMenu: () => set((state) => ({mobileMenuOpen: !state.mobileMenuOpen})),
    closeMenu: () => set({mobileMenuOpen: false}),
}));

export const NewNavbar = ({menus}) => {
    const {mobileMenuOpen, toggleMenu, closeMenu} = useNavbarState();

    return (
        <nav className="relative bg-[#007A4C]">
            <section
                className="flex w-full md:max-w-7xl mx-auto justify-between md:justify-between md:items-center px-3 rounded">
                <div className="ml-3 md:ml-0 flex justify-center items-center">
                    <Link href="/" className="">
                        <Image height={60} width={70} src={"/esm_logo.png"} alt={"logo"}/>
                    </Link>
                    <div className="flex-shrink-0">
                        <span className="text-white font-bold text-lg">
                            <Link href={'/'}>
                                {/*<span className="text-[#F7E652]">Əhli Sünnə </span>Mədrəsəsi*/}
                                <span>Əhli - Sünnə </span>Mədrəsəsi
                            </Link>
                        </span>
                    </div>
                </div>
                <div className="lg:hidden mr-2 flex items-center">
                    <button
                        onClick={() => toggleMenu()}
                        className="p-2 focus:outline-none transition-transform hover:scale-110"
                    >
                        <Menu className="text-white"/>
                    </button>
                </div>
                <div className="hidden md:flex justify-between items-center">
                    {menus.map((item, idx) => (
                        <React.Fragment key={idx}>
                            <NavDropDownMenu item={item}/>
                            {idx < menus.length - 1 && <div className="w-6"/>}
                        </React.Fragment>
                    ))}
                </div>
            </section>

            {/* Mobile dropdown menu with animation */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: 'auto'}}
                        exit={{opacity: 0, height: 0}}
                        transition={{duration: 0.3, ease: 'easeInOut'}}
                        className="lg:hidden absolute z-50 w-full bg-green-800 text-white shadow-lg overflow-hidden"
                    >
                        <MobileNav navItems={menus} closeMenu={closeMenu}/>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

const NavDropDownMenu = ({item}) => {
    const [open, setOpen] = React.useState(false)
    const pathname = usePathname();

    const isActive = (href) => {
        const currentPath = pathname;
        if (href !== '/' && currentPath.startsWith(href)) return 'text-[#43b365]';
        if (href === '/' && currentPath === '/') return 'text-[#43b365]';
        return 'text-white';
    };

    return (
        <div className="relative" onMouseLeave={() => setOpen(false)}>
            <div onMouseEnter={() => setOpen(true)}>
                <Link
                    href={item.href}
                    className={`flex items-center justify-center ${isActive(item.href)} hover:text-[#43b365] transition-colors duration-200`}
                >
                    <span className="mr-1">{item.name}</span>
                    {item.subcategories.length > 0 && (
                        <motion.span
                            animate={{rotate: open ? 90 : 0}}
                            transition={{duration: 0.2}}
                        >
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
                                <path d="m9 18 6-6-6-6"/>
                            </svg>
                        </motion.span>
                    )}
                </Link>
            </div>

            <AnimatePresence>
                {open && item.subcategories.length > 0 && (
                    <motion.div
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        transition={{duration: 0.2}}
                        className="absolute z-10 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                    >
                        {item.subcategories.map((childItem, idx) =>
                            childItem.subcategories.length > 0 ? (
                                <NavSubMenu key={idx} item={childItem}/>
                            ) : (
                                <div key={idx} className={"overflow-hidden"}>
                                    <motion.div
                                        whileHover={{scale: 1.02, backgroundColor: 'rgba(243, 244, 246, 1)'}}
                                        className="px-4 py-2 text-sm hover:bg-gray-100"
                                    >
                                        <Link href={childItem.href} className="block w-full">
                                            {childItem.name}
                                        </Link>
                                    </motion.div>
                                </div>
                            ),
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
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
                <motion.span
                    animate={{rotate: open ? 90 : 0}}
                    transition={{duration: 0.2}}
                >
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
                        <path d="m9 18 6-6-6-6"/>
                    </svg>
                </motion.span>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{opacity: 0, x: -10}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: -10}}

                        transition={{duration: 0.2}}
                        className="absolute  left-full top-0 z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                    >
                        {item.subcategories.map((childItem, idx) =>
                            childItem.subcategories.length > 0 ? (
                                <NavSubMenu key={idx} item={childItem}/>
                            ) : (
                                <div className={"overflow-hidden"} key={idx}>
                                    <motion.div
                                        whileHover={{scale: 1.02, backgroundColor: 'rgba(243, 244, 246, 1)'}}
                                        className="px-4 py-2  text-sm hover:bg-gray-100"
                                    >
                                        <Link href={childItem.href} className="block w-full">
                                            {childItem.name}
                                        </Link>
                                    </motion.div>
                                </div>
                            ),
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function MobileNav({navItems, closeMenu}) {
    return (
        <div className="">
            <nav className="flex flex-col">
                {navItems.map((item, index) => (
                    <MobileNavMenu key={index} item={item} closeMenu={closeMenu}/>
                ))}
            </nav>
        </div>
    )
}

const MobileNavMenu = ({item, closeMenu}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [haveSubMenu, setHaveSubMenu] = React.useState(item.subcategories.length > 0)
    const router = useRouter()
    return (
        <div className="w-full">
            <div
                className="flex w-full items-center justify-between px-4 py-3 text-white font-medium border-b border-green-700"
                onClick={() => haveSubMenu ? setIsOpen(!isOpen) : closeMenu()}
            >
                <Link
                    href={item.href}
                    className="flex-grow"
                    onClick={(e) => {
                        e.preventDefault();
                        closeMenu();
                        router.push(item.href)
                    }}
                >
                    {item.name}
                </Link>
                {haveSubMenu && (
                    <motion.div
                        onClick={() => setIsOpen(!isOpen)}
                        animate={{rotate: isOpen ? 180 : 0}}
                        transition={{duration: 0.2}}
                        className="p-1"
                    >
                        <ChevronDown className="h-5 w-5"/>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {isOpen && item.subcategories.length > 0 && (
                    <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: 'auto'}}
                        exit={{opacity: 0, height: 0}}
                        transition={{duration: 0.2}}
                        className="bg-green-800 overflow-hidden"
                    >
                        {item.subcategories.map((childItem, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.2}}
                                className="px-8 py-3 border-b border-green-700 text-white"
                            >
                                <Link
                                    href={childItem.href}
                                    onClick={(e) => closeMenu()}
                                    className="block hover:text-[#43b365] transition-colors duration-200"
                                >
                                    {childItem.name}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
