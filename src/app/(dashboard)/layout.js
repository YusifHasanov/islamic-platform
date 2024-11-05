'use client'

import useTheme from "@/hooks/useTheme";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import {LayoutProvider} from "@/components/layout/context/layoutcontext";
import AppConfig from "@/components/layout/AppConfig";
import React from "react";


const Layout = ({children}) => {
    useTheme();
    // useAuthRedirect();


    return (
        <>
            <LayoutProvider>
                {children}
                <AppConfig minimal/>
            </LayoutProvider>
        </>
    );
};

export default Layout;