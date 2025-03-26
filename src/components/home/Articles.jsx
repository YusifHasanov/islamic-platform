import React from 'react';
import ArticleCard from "@/components/articles/ArticleCard";
import {BASE_URL} from "@/util/Const";
import Link from "next/link";

export const revalidate = 60;

const Articles =  async () => {
    const res = await fetch(`${BASE_URL}/articles/popular`)
    const articles = await res.json();
    // console.log("articles", articles);
    return (
        <div className="py-16">
            <h2 className="text-center homeArticlesHeader  mb-8">Məqalələr</h2>
            <p className="text-center text-lg mb-12 container mx-auto">
                İman, Fiqh və Siyarın İşığında – Mənəvi Səyahətinizə Yol Göstərir Bu kanalda, iman həqiqətləri, fiqh və siyer mövzularında hazırlanmış məzmunlarla mənəvi dünyanızı zənginləşdirir, bilgi birikiminizi artırır və doğru səyahətə çıxmanız üçün yol göstərişləri verir. Kanalımızı izləyərək ilim və mənəviyyatın dərinliklərinə çata bilərsiniz.            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
                {articles?.map((article, idx) => (

                    <ArticleCard
                        id={article.id}
                        key={idx}
                        title={ article.title}
                        description ={article.description}
                        image = {article.image}
                        date={article.date}
                        authorImage={article.authorImage}
                        authorName={article.authorName}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-12">
                <Link href={"/articles"} className="bg-[#F7E652] text-[#fff] px-6 py-2 rounded-2xl font-semibold hover:bg-[#e0d048]">
                    Bütün Məqalələri göstər GÖSTER
                </Link>
            </div>
        </div>
    );
};

export default Articles;
