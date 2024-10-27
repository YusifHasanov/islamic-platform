'use client'
import React, {useState} from 'react';
import {MapPin, Phone} from 'lucide-react';

const WhereWeAre = () => {
    const [selectedCity, setSelectedCity] = useState('istanbul'); // Varsayılan olarak İstanbul'u seçtik

    return (
        <div className="bg-[#373D45] py-12 text-white">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-200">NEREDEYİZ?</h2>
            </div>

            {/* Şehirler Butonları */}
            <div className="flex justify-center space-x-4 mb-8">
                <button
                    onClick={() => setSelectedCity('mersin')}
                    className={`px-6 py-2 rounded-full ${
                        selectedCity === 'mersin' ? 'bg-[#F7E652] text-[#2f3034]' : 'bg-gray-600 text-white'
                    }`}
                >
                    MERSİN
                </button>
                <button
                    onClick={() => setSelectedCity('istanbul')}
                    className={`px-6 py-2 rounded-full ${
                        selectedCity === 'istanbul' ? 'bg-[#F7E652] text-[#2f3034]' : 'bg-gray-600 text-white'
                    }`}
                >
                    İSTANBUL
                </button>
                <button
                    onClick={() => setSelectedCity('ankara')}
                    className={`px-6 py-2 rounded-full ${
                        selectedCity === 'ankara' ? 'bg-[#F7E652] text-[#2f3034]' : 'bg-gray-600 text-white'
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
                    <div className="flex justify-center mt-4 space-x-6 text-yellow-400">
                        <div className="flex items-center">
                            <Phone className="mr-2"/>
                            <span>+90 (538) 043 78 78</span>
                        </div>
                        <div className="flex items-center">
                            <Phone className="mr-2"/>
                            <span>+90 (530) 684 10 87</span>
                        </div>
                    </div>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                        2013 yılında Mersin'de küçük bir medrese ile başladı serüvenimiz. Şimdi ise daha büyük bir
                        yerleşkede hizmetlerimize devam ediyoruz.
                    </p>

                    {/* Resimler */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                        <img src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/4.jpg"
                             alt="Hayalhanem Mersin 1" className="rounded-lg object-cover w-full h-32"/>
                        <img src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/4.jpg"
                             alt="Hayalhanem Mersin 2" className="rounded-lg object-cover w-full h-32"/>
                        <img src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/4.jpg"
                             alt="Hayalhanem Mersin 3" className="rounded-lg object-cover w-full h-32"/>
                        <img src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/4.jpg"
                             alt="Hayalhanem Mersin 4" className="rounded-lg object-cover w-full h-32"/>
                    </div>
                </div>
            )}

            {selectedCity === 'istanbul' && (
                <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-2">
                        Hayalhanem <span className="text-[#F7E652]">İstanbul</span>
                    </h3>
                    <p className="text-yellow-400">Esentepe, Dergiler Sk. No:2/1, 34394 Şişli/İstanbul</p>
                    <div className="flex justify-center mt-4 space-x-6 text-yellow-400">
                        <div className="flex items-center">
                            <Phone className="mr-2"/>
                            <span>+90 (536) 875 27 07</span>
                        </div>
                        <div className="flex items-center">
                            <Phone className="mr-2"/>
                            <span>+90 (534) 970 80 34</span>
                        </div>
                    </div>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                        2013 yılında Mersin'de küçük bir medrese ile başlayan serüvenimiz, 2019 yılından itibaren
                        Şişli’de Hayalhanem İstanbul olarak, birçok gönüle dokunarak devam ediyor.
                    </p>


                    <div style={{gridTemplateRows: "repeat(2, 125px)"}}
                         className="grid container mt-12 mx-auto grid-cols-6 grid-rows-2 gap-4">
                        <div className="homePageGalleryItem">
                            <img src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/4.jpg"
                                 alt="Hayalhanem Istanbul 4" className="rounded-lg  object-cover w-full h-full"/>
                        </div >
                        <div className="col-start-1 homePageGalleryItem row-start-2">
                            <img src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/1.jpg"
                                 alt="Hayalhanem Istanbul 4" className="rounded-lg object-cover w-full h-full"/>
                        </div>
                        <div className="col-start-2 homePageGalleryItem row-start-1">
                            <img src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/IMG_5976-1.jpg"
                                 alt="Hayalhanem Istanbul 4" className="rounded-lg object-cover w-full h-full"/>
                        </div>
                        <div className="col-start-2 homePageGalleryItem row-start-2">
                            <img
                                src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/433563753_18431221807053262_3442400062282089018_n.jpg"
                                alt="Hayalhanem Istanbul 4" className="rounded-lg object-cover w-full h-full"/>
                        </div>
                        <div className="row-span-2 col-start-3 row-start-1">
                            <img src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/IMG_5976-1.jpg"
                                 alt="Hayalhanem Istanbul 4" className="rounded-lg object-cover w-full h-full"/>
                        </div>
                        <div className="col-start-4  homePageGalleryItem row-start-1">
                            <img
                                src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/432450143_18431221798053262_1520486241854945874_n.jpg"
                                alt="Hayalhanem Istanbul 4" className="rounded-lg object-cover w-full h-full"/>
                        </div>
                        <div className="col-start-4 homePageGalleryItem row-start-2">
                            <img
                                src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/433563753_18431221807053262_3442400062282089018_n.jpg"
                                alt="Hayalhanem Istanbul 4" className="rounded-lg object-cover w-full h-full"/>
                        </div>
                        <div className="row-span-2 col-start-5 row-start-1">
                            <img src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/IMG_6569-1.jpg"
                                 alt="Hayalhanem Istanbul 4" className="rounded-lg object-cover w-full h-full"/>
                        </div>
                        <div className="row-span-2 col-start-6 row-start-1">
                            <img
                                src="https://hayalhanem.com/wp-content/uploads/revslider/slider-2/fdef578d-fc07-4853-ae42-c143f65494ad-1.jpg"
                                alt="Hayalhanem Istanbul 4" className="rounded-lg object-cover w-full h-full"/>
                        </div>
                    </div>


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