import React from 'react';
import ArticleCard from "@/components/articles/ArticleCard";
import {BASE_URL} from "@/util/Const";
import Link from "next/link";

export const revalidate = 60;

const Articles =  async () => {
    const res = await fetch(`${BASE_URL}/articles/popular`)
    const articles = await res.json();
    return (
        <div className="py-16">
            <h2 className="text-center homeArticlesHeader  mb-8">MAKALELER</h2>
            <p className="text-center text-lg mb-12 container mx-auto">
                Mehmet Yıldız'ın kaleminden, iman hakikatleri, siyer, fıkıh, sahabeler ve birçok önemli konuda derinleşen makaleleriyle sizlere bilgi dolu bir platform sunuyoruz. İslam’ın temel prensiplerini anlamak, tarih boyunca yaşanmış örnekleri keşfetmek ve günlük hayatımıza anlam katmak için yazıldı.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
                {articles?.map((article, idx) => (

                    <ArticleCard
                        id={article.id}
                        key={idx}
                        title={ article.title}
                        description ={article.description}
                        image = {article.image}
                        date={article.date}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <Link href={"/articles"} className="bg-[#F7E652] text-[#fff] px-6 py-2 rounded-2xl font-semibold hover:bg-[#e0d048]">
                    TÜM MAKALELERİ GÖSTER
                </Link>
            </div>
        </div>
    );
};

export default Articles;