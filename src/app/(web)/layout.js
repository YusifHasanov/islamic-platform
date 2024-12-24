import React from 'react';
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import NavbarOld from "@/components/common/NavbarOld";
const Layout = ({children}) => {
    return (
        <>
            <Navbar/>
            {/*<NavbarOld/>*/}
            {children}
            <Footer/>
        </>
    );
};

export default Layout;