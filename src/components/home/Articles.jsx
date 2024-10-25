'use client'

import React from 'react';
import Image from 'next/image';

const articles = [
    {
        title: "Cemaat Olmanın Önemi",
        category: "HZ. MUHAMMED (SAV)",
        date: "1 Ekim 2024",
        description:
            "Cemaat Olmanın Önemi Efendimiz(s.a.v.) meclislerle ilgili bir hadisinde şöyle buyuruyor: “Allah’ın(c.c.) yeryüzüne gönderdiği seyyah...",
        image: "https://i.ytimg.com/vi/cuhKwEl6DuQ/hqdefault.jpg",
    },
    {
        title: "Uhud Savaşı’nın Çıkma Sebebi Nedir?",
        category: "HZ. MUHAMMED (SAV)",
        date: "1 Ekim 2024",
        description:
            "Uhud Savaşı’nda yenilmenin olumsuzluklarını bir Bedir Gazvesi’nde türü üstünden atamadı. Mekke’deki insanlar...",
        image: "https://i.ytimg.com/vi/cuhKwEl6DuQ/hqdefault.jpg",
    },
    {
        title: "Duygularıma Nasıl Yön Verebilirim? – Neden...",
        category: "BLOG",
        date: "1 Ekim 2024",
        description:
            "Duygularıma Nasıl Yön Verebilirim? Bizler Ne Yaparsak Yapalım Sahabelere Yetişemeyiz mi? Sahabeyi Bu Kadar Yüksek Bir Mertebeye Çıkar...",
        image: "https://i.ytimg.com/vi/cuhKwEl6DuQ/hqdefault.jpg",
    },
    {
        title: "Resulullah’ın(s.a.v.) Vefatı",
        category: "HZ. MUHAMMED (SAV)",
        date: "1 Ekim 2024",
        description:
            "Resulullah’ın(s.a.v.) Vefatı Bir gün Resulullah’a(s.a.v.) bir vahiy geldi: “Bugün sizin için dininizi kemale erdirdim...",
        image: "https://i.ytimg.com/vi/cuhKwEl6DuQ/hqdefault.jpg",
    },
];

const Articles = () => {
    return (
        <div className="py-16">
            <h2 className="text-center text-4xl font-bold mb-8">MAKALELER</h2>
            <p className="text-center text-lg mb-12 max-w-4xl mx-auto">
                Mehmet Yıldız'ın kaleminden, iman hakikatleri, siyer, fıkıh, sahabeler ve birçok önemli konuda derinleşen makaleleriyle sizlere bilgi dolu bir platform sunuyoruz. İslam’ın temel prensiplerini anlamak, tarih boyunca yaşanmış örnekleri keşfetmek ve günlük hayatımıza anlam katmak için yazıldı.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
                {articles.map((article, idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <Image
                            src={article.image}
                            alt={article.title}
                            className="w-full h-48 object-cover"
                            width={400}
                            height={200}
                        />
                        <div className="p-6">
                            <h3 className="text-[#007A4C] text-sm font-bold mb-2">
                                {article.category}
                            </h3>
                            <h4 className="text-xl font-semibold mb-2">{article.title}</h4>
                            <p className="text-gray-600 text-sm">{article.description}</p>
                            <p className="mt-4 text-gray-500 text-sm">{article.date}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <button className="bg-[#F7E652] text-[#007A4C] px-6 py-3 rounded-lg font-semibold hover:bg-[#e0d048]">
                    TÜM MAKALELERİ GÖSTER
                </button>
            </div>
        </div>
    );
};

export default Articles;