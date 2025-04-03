// components/common/ScrollAnimator.jsx
'use client'; // Bu komponent client tərəfində işləyəcək

import React, { useRef, useEffect, useState } from 'react';

const ScrollAnimator = ({ children, animationClass, threshold = 0.1, triggerOnce = true }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // triggerOnce doğrudursa, görünən kimi observer'i dayandır
                        if (triggerOnce && elementRef.current) {
                            observer.unobserve(elementRef.current);
                        }
                    } else {
                        // Element görünüşdən çıxdıqda animasiyanı sıfırlamaq üçün (əgər triggerOnce false olarsa)
                        if (!triggerOnce) {
                            setIsVisible(false);
                        }
                    }
                });
            },
            { threshold } // Elementin nə qədər hissəsi görünəndə işə düşsün (0.1 = 10%)
        );

        const currentElement = elementRef.current; // Ref'in cari dəyərini sabitə yaz
        if (currentElement) {
            observer.observe(currentElement);
        }

        // Cleanup function
        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
            observer.disconnect(); // Tamamilə dayandır
        };
    }, [threshold, triggerOnce]); // threshold və ya triggerOnce dəyişdikdə effekti yenidən işə sal

    // Children'i klonlayaraq ona ref və lazımi sinfi əlavə edirik
    // Children'in tək bir element olduğunu fərz edirik (məs. bir div)
    if (React.isValidElement(children)) {
        return React.cloneElement(children, {
            ref: elementRef,
            className: `${children.props.className || ''} ${isVisible ? animationClass : ''}`.trim(),
        });
    }

    // Əgər children bir element deyilsə və ya yoxdursa
    console.warn("ScrollAnimator expects a single React element as children.");
    return children; // Və ya null qaytarın
};

export default ScrollAnimator;
