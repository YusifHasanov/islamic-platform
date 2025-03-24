import React from 'react';
import MostReadArticles from "@/components/articledetail/MostReadArticles";
import ArticleApiCount from "@/components/articledetail/ArticleApiCount";
import ArticleDetailCategories from "@/components/articledetail/ArticleDetailCategories";
import Image from "next/image";


const ArticleDetail = async ({article}) => {
   console.log("ArticleDetail", article);
    return (
        <div>
            {/* Full Width Image */}
            <div className="relative w-full h-[700px]">
                <Image
                    height={100}
                    width={2000}
                    src={article.image}
                    alt="Blog Image"
                    className="w-full h-full object-cover"
                />
                {/* Overlay with Text */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white px-4 md:px-8">
                        <h1 className="text-2xl md:text-4xl font-bold mb-2">
                            {article.title}
                        </h1>
                        {/* Yayınlanma Tarihi */}
                        <p className="text-lg mb-4">
                            {new Date(article.publishedAt).toLocaleDateString('az-AZ', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                        <p className="text-yellow-500 font-semibold">
                            {/*İMAN / PEYGAMBERE İMAN / HZ. MUHAMMED (sav)*/}
                            {article?.author.name || 'Bilinmiyor'}
                        </p>
                    </div>
                </div>
            </div>

            <div className=" mx-auto py-12 px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8">
                    {/* Blog İçeriği */}
                    <div className="flex flex-col justify-between bg-white rounded-lg shadow-md p-6 space-y-6">
                        {/* Makale İçeriği */}
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: article.content}}/>

                        {/* Alt Bilgi Bölümü */}
                        <div className="border-t pt-4 space-y-2 text-gray-600">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">Oxunma sayı:</span>
                                <span className="text-gray-800">{article.readCount}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="font-semibold">Yayımlanma Tarixi:</span>
                                <span
                                    className="text-gray-800"> {new Date(article.publishedAt).toLocaleDateString('az-AZ', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}</span>
                            </div>

                            <div className="flex flex-wrap items-center pt-2 space-x-4">
                                {
                                    article.author ? (
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={article.author.image || "/default-avatar.png"}
                                                alt={article.author.name}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <span className="text-gray-800">{article.author.name}</span>
                                        </div>
                                    ) : (
                                        <span className="text-gray-800">Bilinmiyor</span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <ArticleApiCount/>

                    <div className={"pr-2"}>
                        <div className={"mb-6 mr-2"}>
                            <ArticleDetailCategories/>
                        </div>
                        <MostReadArticles article={article}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;
