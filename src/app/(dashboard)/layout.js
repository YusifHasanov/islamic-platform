"use client"

import useTheme from "@/hooks/useTheme"
import {LayoutProvider} from "@/components/layout/context/layoutcontext"
import AppConfig from "@/components/layout/AppConfig"
import SideBar from "@/components/admin/SideBar"
import Tailwind from "primereact/passthrough/tailwind";
import {PrimeReactProvider} from "primereact/api";

const Layout = ({children}) => {
    useTheme()
    // useAuthRedirect()
    return (
        <>
            <PrimeReactProvider value={{pt: Tailwind}}>
                <SideBar>
                    <LayoutProvider>
                        {children}
                        <AppConfig minimal/>
                    </LayoutProvider>
                </SideBar>
            </PrimeReactProvider>
        </>
    )
}

export default Layout

