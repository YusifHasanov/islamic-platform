import React from 'react';
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import NavbarOld from "@/components/common/NavbarOld";
import {TestMenu} from "@/components/common/TestMenu";
import {BASE_URL} from "@/util/Const";

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
        name: 'Suallar',
        href: '/questions',
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

const Layout = async ({children}) => {
    const res = await fetch(`${BASE_URL}/categories/menu`)
    const menusData = await res.json();

    const addHrefToMenuItems = (menuItems) => {
        return menuItems.map((item) => ({
            ...item,
            href: `/search?categoryId=${item.id}`,
            subcategories: item.subcategories ? addHrefToMenuItems(item.subcategories) : [],
        }));
    };
    const finalMenus = addHrefToMenuItems(menusData);

    const menus = [...finalMenus, ...staticMenuItems];

    return (
        <>
            {/*<Navbar/>*/}
            <TestMenu menus={menus}/>
            {/*<NavbarOld/>*/}
            {children}
            <Footer/>
        </>
    );
};

export default Layout;
