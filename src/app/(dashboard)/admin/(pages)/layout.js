'use client'
import React from 'react';
import SideBar from "@/components/admin/SideBar";


const Layout = ({children}) => {
    return (
        <SideBar>
            {children}
        </SideBar>
    );
};

export default Layout;