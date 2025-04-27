import { NewNavbar } from "@/components/common/NewNavbar"
import { BASE_URL } from "@/util/Const"
import Footer from "@/components/common/Footer";
import {ModernNavbar} from "@/components/Navbar/ModernNavbar";
import React from "react";

export const dynamic = 'force-dynamic';

const staticMenuItems = [
  {
    name: "Videolar",
    href: "/videos",
    subcategories: [],
  },
  {
    name: "Məqalələr",
    href: "/articles",
    subcategories: [],
  },
  {
    name: "Suallar",
    href: "/questions",
    subcategories: [],
  },
  {
    name: "Kitablar",
    href: "/books",
    subcategories: [],
  },
  {
    name: "Haqqımızda",
    href: "/about",
    subcategories: [],
  },
  {
    name: "Əlaqə",
    href: "/contact",
    subcategories: [],
  },
]

const Layout = async ({ children }) => {
  const res = await fetch(`${BASE_URL}/categories/menu`, { cache: 'no-store' })
  const menusData = await res.json()

  const addHrefToMenuItems = (menuItems) => {
    return menuItems.map((item) => ({
      ...item,
      href: `/search?categoryId=${item.id}`,
      subcategories: item.subcategories ? addHrefToMenuItems(item.subcategories) : [],
    }))
  }
  const finalMenus = addHrefToMenuItems(menusData)

  // Combine fetched and static items, then put items with submenus first
  const combinedMenus = [...staticMenuItems, ...finalMenus ]
  const menus = [
    ...combinedMenus.filter(item => Array.isArray(item.subcategories) && item.subcategories.length > 0),
    ...combinedMenus.filter(item => !Array.isArray(item.subcategories) || item.subcategories.length === 0),
  ]


  return (
    <>
      {/*<Navbar/>*/}
      <NewNavbar menus={menus} />
      {/*<ModernNavbar menus={menus} />*/}
      {/*<NavbarOld/>*/}
      {children}
      <Footer />
    </>
  )
}

export default Layout

