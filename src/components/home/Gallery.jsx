'use client'
import React, { useState } from 'react';
import Image from 'next/image';

const images = [
    'https://medrese.vercel.app/assets/qardaslar_2.jfif',
    'https://medrese.vercel.app/assets/qardaslar_2.jfif',
    'https://medrese.vercel.app/assets/qardaslar_2.jfif',
    'https://medrese.vercel.app/assets/qardaslar_2.jfif',
    'https://medrese.vercel.app/assets/qardaslar_2.jfif',
    'https://medrese.vercel.app/assets/qardaslar_2.jfif',
];

const Gallery = () => {
    const [isZoomed, setIsZoomed] = useState(null);

    const handleZoom = (index) => {
        if (isZoomed === index) {
            setIsZoomed(null); // Zoom-out if already zoomed
        } else {
            setIsZoomed(index); // Zoom-in
        }
    };

    return (
        <div className="py-16 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Sol taraf - Galeri açıklaması */}
            <div className="bg-[#F7E652] p-8 rounded-lg h-max">
                <h2 className="text-3xl font-bold mb-4">GALERİ</h2>
                <p className="text-lg">
                    Bu fotoğrafta, her anı kucaklamak ve bu samimi hikayenin bir parçası olmak ister misin? İçindeki her
                    duygu, her gülümseme burada bir anlam buluyor. Bu karede, sadece bir görsel değil, bir aile, bir
                    dostluk hikayesi var. Senin de bu hikayeye dahil olmanı bekliyoruz. Gel, birlikte bu fotoğrafta bir
                    anı oluşturalım.
                </p>
            </div>

            {/* Sağ taraf - Görseller */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-lg"
                    >
                        <Image
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            className="object-cover w-full h-64"
                            width={400}
                            height={200}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;