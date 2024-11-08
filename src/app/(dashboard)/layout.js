'use client'

import useTheme from "@/hooks/useTheme";
import {LayoutProvider} from "@/components/layout/context/layoutcontext";
import AppConfig from "@/components/layout/AppConfig";
import React from "react";
import SideBar from "@/components/admin/SideBar";


const Layout = ({children}) => {
    useTheme();
    // useAuthRedirect();

    return (
        <>
            <SideBar>
                <LayoutProvider>
                    {children}
                    <AppConfig minimal/>
                </LayoutProvider>
            </SideBar>
        </>
    );
};

export default Layout;