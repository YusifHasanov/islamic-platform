'use client'

import React from 'react';
import Image from 'next/image';
import ArticleCard from "@/components/articles/ArticleCard";

const articles = [
    {
        title: "Efendimiz (s.a.v.) Boykot Döneminde Nasıl Sıkıntılar Çekmiştir?",
        date: "1 Ekim 2024",
        image: "https://hayalhanem.com/wp-content/uploads/2024/10/Efendimizs.a.v.-Boykot-Doneminde-Nasil-Sikintilar-Cekmistir.webp"
    },
    {
        title: "Ebû Talip İmanlı mı Öldü? – Hz. Hatice’nin (r.a.) Vefatı",
        date: "1 Ekim 2024",
        image: "https://hayalhanem.com/wp-content/uploads/2024/10/Hz.-Hamzar.a.-Nasil-Sehit-Oldu-Muslumanlar-Uhudda-Neden-Galibiyet-Elde-Edemediler.webp"
    },
    {
        title: "Efendimiz (s.a.v.) Taif’te Kimler Taşladı?",
        date: "Ekim 1, 2024",
        image: "https://hayalhanem.com/wp-content/uploads/2024/10/Munafiklarin-Ahlaki-Ozellikleri-Hadislerde-Nasil-Gecmektedir.webp"
    },
    {
        title: "Efendimiz (s.a.v.) Hayatı Boyunca Ne Sıkıntılar Yaşamıştır?",
        date: "Ekim 1, 2024",
        image: "https://hayalhanem.com/wp-content/uploads/2024/10/Efendimizs.a.v.-Boykot-Doneminde-Nasil-Sikintilar-Cekmistir.webp"
    }
]

const Articles = () => {
    return (
        <div className="py-16">
            <h2 className="text-center homeArticlesHeader  mb-8">MAKALELER</h2>
            <p className="text-center text-lg mb-12 container mx-auto">
                Mehmet Yıldız'ın kaleminden, iman hakikatleri, siyer, fıkıh, sahabeler ve birçok önemli konuda derinleşen makaleleriyle sizlere bilgi dolu bir platform sunuyoruz. İslam’ın temel prensiplerini anlamak, tarih boyunca yaşanmış örnekleri keşfetmek ve günlük hayatımıza anlam katmak için yazıldı.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
                {articles.map((article, idx) => (

                    <ArticleCard
                        key={idx}
                        title={ article.title}
                        description ={article.description}
                        image = {article.image}
                        date={article.date}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <button className="bg-[#F7E652] text-[#fff] px-6 py-2 rounded-2xl font-semibold hover:bg-[#e0d048]">
                    TÜM MAKALELERİ GÖSTER
                </button>
            </div>
        </div>
    );
};

export default Articles;