// This is the main server component file: navbar.jsx
import Image from "next/image"
import Link from "next/link"
import {NavbarClient} from "@/components/Navbar/NavbarClient";

/**
 * Modern Navbar component with SSR support
 * This is the main server component that handles the static parts
 */
export function ModernNavbar({ menus = [] }) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-green-900/10 bg-gradient-to-r from-[#006A42] to-[#007A4C] shadow-md backdrop-blur">
            <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
                {/* Logo and Brand Name - Server Component */}
                <BrandLogo />

                {/* Navigation - Client Component (required for interactivity) */}
                <NavbarClient menus={menus} />
            </div>
        </header>
    )
}

/**
 * Brand Logo Component - Server Component (no client interactivity needed)
 */
function BrandLogo() {
    return (
        <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full sm:h-12 sm:w-12">
                <Image
                    src="/esm_logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            <div className="hidden sm:block">
                <div className="text-xl font-bold text-white">
                    <span className="text-[#F7E652]">Əhli-Sünnə</span> Mədrəsəsi
                </div>
            </div>
        </Link>
    )
}
