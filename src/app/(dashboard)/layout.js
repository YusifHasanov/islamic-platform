"use client"

import useTheme from "@/hooks/useTheme"
import { LayoutProvider } from "@/components/layout/context/layoutcontext"
import AppConfig from "@/components/layout/AppConfig"
import AdminLayoutWrapper from "@/components/admin/SideBar"
import Tailwind from "primereact/passthrough/tailwind";
import { PrimeReactProvider } from "primereact/api";
import { usePathname } from 'next/navigation';

const Layout = ({ children }) => {
    useTheme()
    const pathname = usePathname();

    const noAdminLayoutPaths = ['/admin/login', '/admin/register'];
    const useAdminLayout = pathname.startsWith('/admin') && !noAdminLayoutPaths.includes(pathname);

    return (
        <>
            <PrimeReactProvider value={{ pt: Tailwind }}>
                <LayoutProvider>
                    {useAdminLayout ? (
                        <AdminLayoutWrapper>
                            {children}
                        </AdminLayoutWrapper>
                    ) : (
                        <>
                            {children}
                            {noAdminLayoutPaths.includes(pathname) && <AppConfig minimal />}
                        </>
                    )}
                </LayoutProvider>
            </PrimeReactProvider>
        </>
    )
}

export default Layout

