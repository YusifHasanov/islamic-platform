import React from 'react';
import Image from "next/image";

const Header = () => {
    return (
        <section className="relative w-full h-[400px]">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="https://52principlesforchurchleaders.com/wp-content/uploads/2024/03/Book-open19-12-42.jpg" // Resim dosyasının yolunu buraya ekleyin
                    alt="Açık bir kitap"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="z-0"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                {/* Arka plana karartma efekti */}
            </div>

            {/* Text Content */}
            <div className="relative z-10 flex flex-col justify-center h-full max-w-4xl mx-auto px-4 text-white">
                <h1 className="text-4xl font-bold mb-4">MAKALELER</h1>
                <p className="text-lg">
                    İman hakikatleri, fıkıh ve siyer konularında kaleme alınmış bu makaleler,
                    manevi dünyamızı zenginleştirmek ve bilgi birikimimizi artırmak için
                    makalelerimizi okuyabilirsiniz.
                </p>
            </div>
        </section>
    );
};

export default Header;