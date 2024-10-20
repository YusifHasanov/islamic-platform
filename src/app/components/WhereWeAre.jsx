'use client'
import React, { useState } from 'react';
import { MapPin, Phone } from 'lucide-react';

const WhereWeAre = () => {
    const [selectedCity, setSelectedCity] = useState('mersin');

    return (
        <div className="bg-[#2f3034] py-12 text-white">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-[#F7E652]">NEREDEYİZ?</h2>
            </div>

            {/* Şehirler Butonları */}
            <div className="flex justify-center space-x-4 mb-8">
                <button
                    onClick={() => setSelectedCity('mersin')}
                    className={`px-6 py-2 rounded-lg ${
                        selectedCity === 'mersin' ? 'bg-[#F7E652] text-[#007A4C]' : 'bg-gray-600 text-white'
                    }`}
                >
                    MERSİN
                </button>
                <button
                    onClick={() => setSelectedCity('istanbul')}
                    className={`px-6 py-2 rounded-lg ${
                        selectedCity === 'istanbul' ? 'bg-[#F7E652] text-[#007A4C]' : 'bg-gray-600 text-white'
                    }`}
                >
                    İSTANBUL
                </button>
                <button
                    onClick={() => setSelectedCity('ankara')}
                    className={`px-6 py-2 rounded-lg ${
                        selectedCity === 'ankara' ? 'bg-[#F7E652] text-[#007A4C]' : 'bg-gray-600 text-white'
                    }`}
                >
                    ANKARA
                </button>
            </div>

            {/* İçerik */}
            {selectedCity === 'mersin' && (
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">
                        Hayalhanem <span className="text-[#F7E652]">Mersin</span>
                    </h3>
                    <p>Çiftlikköy, Üniversite Cad. 3287. Cd No:10, 33343 Mersin</p>
                    <div className="flex justify-center mt-4 space-x-6">
                        <div className="flex items-center">
                            <MapPin className="mr-2" />
                            <span>+90 (538) 043 78 78</span>
                        </div>
                        <div className="flex items-center">
                            <Phone className="mr-2" />
                            <span>+90 (530) 684 10 87</span>
                        </div>
                    </div>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                        2013 yılında Mersin'de küçük bir medrese ile başladı serüvenimiz. Şimdi ise daha büyük bir yerleşkede hizmetlerimize devam ediyoruz.
                    </p>

                    {/* Resimler */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                        <img src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/4.jpg"
                             alt="Hayalhanem Mersin 1" className="rounded-lg m-auto w-44"/>
                        <img src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/4.jpg"
                             alt="Hayalhanem Mersin 1" className="rounded-lg m-auto w-44"/>
                        <img src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/4.jpg"
                             alt="Hayalhanem Mersin 1" className="rounded-lg m-auto  w-44"/>
                        <img src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/4.jpg"
                             alt="Hayalhanem Mersin 1" className="rounded-lg m-auto w-44"/>
                        <img src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/4.jpg"
                             alt="Hayalhanem Mersin 1" className="rounded-lg m-auto w-44"/>
                    </div>
                </div>
            )}

            {selectedCity === 'istanbul' && (
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">
                        Hayalhanem <span className="text-[#F7E652]">İstanbul</span>
                    </h3>
                    <p>Yakında hizmetinizde...</p>
                </div>
            )}

            {selectedCity === 'ankara' && (
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">
                        Hayalhanem <span className="text-[#F7E652]">Ankara</span>
                    </h3>
                    <p>Yakında hizmetinizde...</p>
                </div>
            )}
        </div>
    );
};

export default WhereWeAre;