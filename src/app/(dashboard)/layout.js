'use client'
import React, {useEffect} from 'react';
import Sidebar from "@/components/admin/SideBar";


const Layout = ({children}) => {
    useEffect(() => {
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);
    return (
        <Sidebar>
            {children}
        </Sidebar>
    );
};

export default Layout;