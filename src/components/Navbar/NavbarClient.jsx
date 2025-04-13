"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import {ThemeSwitcher} from "@/components/Navbar/ThemeSwitcher";

/**
 * Client-side Navbar component for interactive elements
 */
export function NavbarClient({ menus = [] }) {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const pathname = usePathname()

    // Close mobile menu when pathname changes
    React.useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    return (
        <div className="flex flex-1 items-center justify-end">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:flex-1 md:items-center md:justify-end">
                <ul className="flex items-center gap-1">
                    {menus.map((item, index) => (
                        <NavItem
                            key={index}
                            item={item}
                            pathname={pathname}
                        />
                    ))}
                </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-[#F7E652] focus:outline-none md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle menu"
            >
                {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}
            </button>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <MobileMenu
                    items={menus}
                    pathname={pathname}
                    onClose={() => setMobileMenuOpen(false)}
                />
            )}
        </div>
    )
}

/**
 * Desktop Navigation Item - handles both single items and dropdowns
 */
function NavItem({ item, pathname }) {
    const [open, setOpen] = React.useState(false)
    const ref = React.useRef(null)
    const hasChildren = item.subcategories && item.subcategories.length > 0

    // Check if current path matches this item
    const isActive = React.useMemo(() => {
        if (pathname === item.href) return true
        if (item.href !== '/' && pathname.startsWith(item.href)) return true
        return false
    }, [pathname, item.href])

    // Handle click outside to close dropdown
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [ref])

    return (
        <li ref={ref} className="relative">
            <Link
                href={item.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors
          ${isActive
                    ? "text-[#F7E652] font-bold"
                    : "text-white hover:text-[#F7E652]"
                }`}
                onMouseEnter={() => hasChildren && setOpen(true)}
                onMouseLeave={() => hasChildren && setOpen(false)}
                onClick={() => !hasChildren && setOpen(false)}
            >
                {item.name}
                {hasChildren && (
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" />
                )}
            </Link>

            {/* Dropdown Menu */}
            {open && hasChildren && (
                <div
                    className="absolute left-0 top-full z-10 mt-1 min-w-[200px] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg animate-in fade-in slide-in-from-top-1"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >
                    <DropdownMenu items={item.subcategories} />
                </div>
            )}
        </li>
    )
}

/**
 * Dropdown Menu Component for Desktop Navigation
 */
function DropdownMenu({ items }) {
    return (
        <ul className="grid gap-1">
            {items.map((item, index) => (
                <DropdownItem key={index} item={item} />
            ))}
        </ul>
    )
}

/**
 * Dropdown Item Component - handles both leaf items and submenus
 */
function DropdownItem({ item }) {
    const [open, setOpen] = React.useState(false)
    const hasChildren = item.subcategories && item.subcategories.length > 0
    const ref = React.useRef(null)

    // Handle click outside to close submenu
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [ref])

    return (
        <li
            ref={ref}
            className="relative"
            onMouseEnter={() => hasChildren && setOpen(true)}
            onMouseLeave={() => hasChildren && setOpen(false)}
        >
            <Link
                href={item.href}
                className="flex items-center justify-between rounded px-3 py-2 text-sm hover:bg-gray-100"
            >
                <span>{item.name}</span>
                {hasChildren && <ChevronRight className="ml-auto h-4 w-4" />}
            </Link>

            {/* Submenu for nested dropdown */}
            {open && hasChildren && (
                <div className="absolute left-full top-0 z-10 ml-1 min-w-[200px] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg animate-in fade-in slide-in-from-left-1">
                    <DropdownMenu items={item.subcategories} />
                </div>
            )}
        </li>
    )
}

/**
 * Mobile Menu Component - full screen overlay for mobile devices
 */
function MobileMenu({ items, pathname, onClose }) {
    return (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto bg-green-900 pb-32 animate-in slide-in-from-top-2 md:hidden">
            <div className="p-4">
                <ul className="grid gap-2">
                    {items.map((item, index) => (
                        <MobileNavItem
                            key={index}
                            item={item}
                            pathname={pathname}
                            onClose={onClose}
                            level={0}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

/**
 * Mobile Navigation Item
 */
function MobileNavItem({ item, pathname, onClose, level = 0 }) {
    const [open, setOpen] = React.useState(false)
    const hasChildren = item.subcategories && item.subcategories.length > 0

    // Check if current path matches this item
    const isActive = React.useMemo(() => {
        if (pathname === item.href) return true
        if (item.href !== '/' && pathname.startsWith(item.href)) return true
        return false
    }, [pathname, item.href])

    return (
        <li className="border-b border-green-800 last:border-none">
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <Link
                        href={hasChildren ? "#" : item.href}
                        onClick={(e) => {
                            if (hasChildren) {
                                e.preventDefault()
                                setOpen(!open)
                            } else {
                                onClose()
                            }
                        }}
                        className={`flex w-full items-center py-2 text-base ${
                            level === 0 ? "font-medium" : "font-normal"
                        } ${isActive ? "text-[#F7E652]" : "text-white hover:text-[#F7E652]"} ${
                            level > 0 ? `pl-${4 + level * 2}` : ""
                        }`}
                    >
                        <span className="truncate">{item.name}</span>
                    </Link>

                    {hasChildren && (
                        <button
                            className="rounded-md p-1 text-white hover:bg-green-800"
                            onClick={() => setOpen(!open)}
                        >
                            <ChevronDown
                                className={`h-5 w-5 transition-transform duration-200 ${
                                    open ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                    )}
                </div>

                {/* Submenu */}
                {open && hasChildren && (
                    <div className="mt-1 ml-2 border-l-2 border-green-800 pl-4">
                        <ul className="grid gap-1">
                            {item.subcategories.map((child, index) => (
                                <MobileNavItem
                                    key={index}
                                    item={child}
                                    pathname={pathname}
                                    onClose={onClose}
                                    level={level + 1}
                                />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </li>
    )
}
