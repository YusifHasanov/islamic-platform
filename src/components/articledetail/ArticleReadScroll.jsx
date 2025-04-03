'use client'
import React, {useEffect, useState} from 'react';

const ArticleReadScroll = () => {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const progress = (window.scrollY / totalHeight) * 100
            setScrollProgress(progress)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    return (
        <div
            className="fixed top-0 left-0 h-1 bg-emerald-600 z-50 transition-all duration-150"
            style={{width: `${scrollProgress}%`}}
        ></div>
    );
};

export default ArticleReadScroll;
