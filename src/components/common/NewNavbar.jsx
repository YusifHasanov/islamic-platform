"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react"; // Kept Menu icon

import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- Type Definition (Assuming from original, add if needed) ---
// interface MenuItem {
//   id?: string | number;
//   slug?: string;
//   name: string;
//   href?: string;
//   subcategories?: MenuItem[];
// }

// interface NewNavbarProps {
//   menus: MenuItem[];
// }


// --- Helper Function to generate Href ---
const generateHref = (item) => {
    if (item.href) return item.href;
    const identifier = item.slug || item.id;
    // MODIFY THIS BASED ON YOUR ROUTING (e.g., /dersler, /kitablar)
    return `/category/${identifier}`;
};

// --- Main Navbar Component (Redesigned) ---
export function NewNavbar({ menus }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const isLinkActive = (item) => {
        if (!pathname) return false;
        const itemHref = generateHref(item);
        const normalizedPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
        const normalizedItemHref = itemHref.endsWith('/') && itemHref.length > 1 ? itemHref.slice(0, -1) : itemHref;

        if (normalizedPath === normalizedItemHref) return true;
        if (normalizedItemHref !== '/' && normalizedPath.startsWith(normalizedItemHref + '/')) {
            return true;
        }
        // Optional: Recursive check (can be slow for very deep menus)
        // if (item.subcategories?.length > 0) {
        //   return item.subcategories.some(subItem => isLinkActive(subItem));
        // }
        return false;
    };

    return (
        // Updated Header Styling: Green background, light text, shadow
        <header className="sticky top-0 z-50 w-full  bg-emerald-700 text-emerald-50 shadow-md">
            <div className=" flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo and Brand */}
                <Link
                    href="/"
                    className="flex items-center gap-2 mr-4 flex-shrink-0 group" // Added group for potential hover effects
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <Image height={35} width={40} src={"/esm_logo.png"} alt="Əhli Sünnə Mədrəsəsi Logo" className="h-8 w-auto sm:h-9" />
                    {/* Brighter text for brand name - Change sm:inline-block to lg:inline-block */}
                    <span className="hidden font-bold lg:inline-block text-white whitespace-nowrap group-hover:text-emerald-100 transition-colors">
                        Əhli-Sünnə Mədrəsəsi
                    </span>
                    {/* Show abbreviation below lg screens */}
                    <span className="lg:hidden font-bold text-white group-hover:text-emerald-100 transition-colors">ƏSM</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex flex-grow justify-center">
                    <NavigationMenu className={"rounded-md  "}>
                        <NavigationMenuList>
                            {menus.map((item) => {
                                const itemHref = generateHref(item);
                                const hasSubcategories = item.subcategories && item.subcategories.length > 0;
                                const isActive = isLinkActive(item);
                                const isDirectlyActive = pathname === itemHref; // Check exact match

                                return (
                                    <NavigationMenuItem key={item.name || item.id} value={itemHref} >
                                        {hasSubcategories ? (
                                            <>
                                                <NavigationMenuTrigger
                                                    onClick={() => router.push(itemHref)}
                                                    className={cn(
                                                        // Base styles for trigger on green bg
                                                        "text-sm font-medium bg-transparent px-2 text-emerald-100 hover:bg-emerald-600 hover:text-white focus:bg-emerald-600 focus:text-white data-[active]:bg-emerald-600/80 data-[state=open]:bg-emerald-600/80",
                                                        // Active state (section active)
                                                        isActive && "text-white",
                                                        // More prominent if this specific link is active
                                                        isDirectlyActive && "font-semibold"
                                                    )}
                                                >
                                                    {item.name}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    {/* Mega Menu Layout - Now on white background */}
                                                    <div className="grid   w-[550px] gap-x-6 gap-y-4 p-6 md:w-[650px] lg:w-[750px] grid-flow-col auto-cols-max bg-white text-slate-800 shadow-lg rounded-md">
                                                        {item.subcategories?.map((subItemL1) => (
                                                            <div key={subItemL1.name || subItemL1.id} className="flex flex-col space-y-1 items-start">
                                                                {/* Level 1 Subcategory Title (Link) - Adjusted for white bg */}
                                                                <Link
                                                                    href={generateHref(subItemL1)}
                                                                    passHref
                                                                    legacyBehavior
                                                                >
                                                                    <NavigationMenuLink className={cn(
                                                                        "text-sm font-semibold leading-none hover:text-emerald-700 pb-1 mb-1 transition-colors", // Hover color is main green
                                                                        isLinkActive(subItemL1) ? "text-emerald-700" : "text-slate-800" // Active color is main green
                                                                    )}>
                                                                        {subItemL1.name}
                                                                    </NavigationMenuLink>
                                                                </Link>

                                                                {/* Level 2 Subcategories */}
                                                                {subItemL1.subcategories?.length > 0 && (
                                                                    <ul className="flex flex-col space-y-0.5">
                                                                        {subItemL1.subcategories.map((subItemL2) => (
                                                                            <li key={subItemL2.name || subItemL2.id}>
                                                                                {/* Use updated ListItem for white bg */}
                                                                                <ListItem
                                                                                    title={subItemL2.name}
                                                                                    href={generateHref(subItemL2)}
                                                                                    active={pathname === generateHref(subItemL2)}
                                                                                />
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </NavigationMenuContent>
                                            </>
                                        ) : (
                                            // Top-level item without subcategories
                                            <Link href={itemHref} legacyBehavior passHref>
                                                <NavigationMenuLink
                                                    className={cn(
                                                        navigationMenuTriggerStyle(), // Base style adapts
                                                        // Custom styling for links on green bg
                                                        "text-sm font-medium bg-transparent text-emerald-100 hover:bg-emerald-600 hover:text-white focus:bg-emerald-600 focus:text-white data-[active]:bg-emerald-600/80 data-[state=open]:bg-emerald-600/80 ",
                                                        // Direct active state
                                                        isDirectlyActive && "bg-emerald-600 text-white font-semibold"
                                                    )}
                                                    // Shadcn 'active' prop might not work perfectly with custom styles, rely on manual check
                                                    // active={isDirectlyActive}
                                                >
                                                    {item.name}
                                                </NavigationMenuLink>
                                            </Link>
                                        )}
                                    </NavigationMenuItem>
                                );
                            })}
                            {/* Add static items if needed */}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Placeholder for right-side elements */}
                <div className="hidden lg:flex items-center justify-end  flex-shrink-0">
                    {/* Add Theme Toggle, Auth Button etc. here if needed */}
                </div>

                {/* Mobile Navigation Trigger */}
                <div className="lg:hidden flex items-center">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            {/* Ensure button contrasts on green */}
                            <Button variant="ghost" size="icon" aria-label="Menyu aç" className="text-emerald-100 hover:text-white hover:bg-emerald-600 focus:bg-emerald-600">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        {/* Mobile Menu Content: White background */}
                        <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm p-0 flex flex-col bg-white text-slate-800">
                            <SheetHeader className="border-b border-slate-200 p-4">
                                <SheetTitle className="flex items-center gap-2">
                                    <Image height={30} width={35} src={"/esm_logo.png"} alt="Əhli Sünnə Mədrəsəsi Logo" />
                                    {/* Use a darker text color for title on white */}
                                    <span className="font-bold text-emerald-700">Menyu</span>
                                </SheetTitle>
                            </SheetHeader>
                            <ScrollArea className="flex-1">
                                <div className="flex flex-col space-y-1 p-4">
                                    {menus.map((item) => (
                                        <MobileMenuItem
                                            key={item.name || item.id}
                                            item={item}
                                            pathname={pathname}
                                            level={0}
                                            closeMenu={() => setIsMobileMenuOpen(false)}
                                            isLinkActive={isLinkActive} // Pass the function itself
                                        />
                                    ))}
                                    {/* Add static mobile items if needed */}
                                </div>
                            </ScrollArea>
                            {/* Optional Footer */}
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

// --- Recursive Mobile Menu Item Component (Adjusted for White Background) ---
const MobileMenuItem = ({ item, pathname, level, closeMenu, isLinkActive }) => {
    const itemHref = generateHref(item);
    const hasSubcategories = item.subcategories && item.subcategories.length > 0;
    const isActive = isLinkActive(item); // Section active
    const isExactlyActive = pathname === itemHref; // Exact link active

    const paddingLeft = `${1 + level * 1.25}rem`; // Indentation

    if (!hasSubcategories) {
        // Leaf node: Simple Link
        return (
            <SheetClose asChild>
                <Link
                    href={itemHref}
                    style={{ paddingLeft }}
                    className={cn(
                        "flex items-center rounded-md px-3 py-2.5 text-sm transition-colors", // Base styles
                        // Adjusted hover/active for white background
                        "hover:bg-emerald-50 hover:text-emerald-800",
                        isExactlyActive
                            ? "bg-emerald-100 font-medium text-emerald-700" // Active state
                            : "text-slate-700" // Default text color
                    )}
                >
                    {item.name}
                </Link>
            </SheetClose>
        );
    }

    // Node with subcategories: Accordion
    const accordionValue = `mobile-item-${item.id || item.slug || item.name}`;

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={accordionValue} className="border-b-0">
                <AccordionTrigger
                    style={{ paddingLeft }}
                    className={cn(
                        "py-2.5 px-3 text-sm font-medium hover:no-underline hover:bg-emerald-50 rounded-md [&[data-state=open]>svg]:rotate-180 transition-colors w-full justify-between",
                        // Highlight trigger if section is active or exact link is active
                        isActive ? "text-emerald-700" : "text-slate-700 hover:text-slate-900",
                        isExactlyActive && "bg-emerald-100 font-semibold text-emerald-700" // Stronger highlight for exact match
                    )}
                >
                    {/* Wrap link text to navigate, but allow chevron area to toggle accordion */}
                    <Link
                        href={itemHref}
                        onClick={(e) => {
                            // Navigate and close menu when clicking the text part
                            e.stopPropagation(); // Prevent accordion toggle if link clicked
                            closeMenu();
                        }}
                        className="flex-1 text-left mr-2" // Take up space
                    >
                        {item.name}
                    </Link>
                    {/* Chevron is part of AccordionTrigger */}
                </AccordionTrigger>

                <AccordionContent className="pb-0 overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="flex flex-col space-y-1 pt-1">
                        {item.subcategories.map((subItem) => (
                            <React.Fragment key={subItem.id || subItem.slug || subItem.name}>
                                <MobileMenuItem
                                    item={subItem}
                                    pathname={pathname}
                                    level={level + 1}
                                    closeMenu={closeMenu}
                                    isLinkActive={isLinkActive}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

// --- Desktop Mega Menu List Item (Adjusted for White Background) ---
const ListItem = React.forwardRef(
    ({ className, title, active, href, ...props }, ref) => {
        return (
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    href={href}
                    className={cn(
                        "block select-none rounded-md px-3 py-2 leading-none no-underline outline-none transition-colors",
                        // Adjusted hover/active styles for white background
                        "text-sm hover:bg-emerald-50 hover:text-emerald-800 focus:bg-emerald-50 focus:text-emerald-800",
                        active
                            ? "bg-emerald-100 font-medium text-emerald-700" // Active state
                            : "text-slate-600", // Default state (slightly muted)
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-snug">{title}</div>
                    {/* Optional description */}
                    {/* <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                        Description...
                    </p> */}
                </Link>
            </NavigationMenuLink>
        );
    }
);
ListItem.displayName = "ListItem";
