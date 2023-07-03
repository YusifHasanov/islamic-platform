import React, { FC } from 'react'
import Navigation from '../navigation/Navigation'
import Footer from '../footer/Footer'
import { useRouter } from 'next/router';
interface Props {
    children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    const router = useRouter();
    const excludeNav = router.pathname.startsWith("/admin")
    const excludeFooter = router.pathname.startsWith("/admin") || router.pathname.startsWith("/videos")
    return (
        <>
            {!excludeNav && <Navigation />}
            {children}
            {!excludeFooter && <Footer />}
        </>
    )
}

export default Layout