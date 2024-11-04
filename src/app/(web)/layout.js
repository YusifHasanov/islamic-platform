import React from 'react';
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
const Layout = ({children}) => {
    return (
        <>
            <Navbar/>
            {children}
            <Footer/>
        </>
    );
};

export default Layout;