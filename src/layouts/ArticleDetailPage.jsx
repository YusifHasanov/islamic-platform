import React from 'react';
import MostReadArticles from "@/components/articledetail/MostReadArticles";

import {BASE_URL} from "@/util/Const";

export const revalidate = 60;

const ArticleDetail = async ({id}) => {
    const response = await fetch(`${BASE_URL}/articles/${id}`);
    const article = await response.json();

    console.log(article);

    if (!article) {
        return <di>Loading</di>
    }

    return (
        <div>
            {/* Full Width Image */}
            <div className="relative w-full h-[700px]">
                <img
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
                        <p className="text-lg mb-4">Ekim 1, 2024</p>
                        <p className="text-yellow-500 font-semibold">
                            İMAN / PEYGAMBERE İMAN / HZ. MUHAMMED (sav)
                        </p>
                    </div>
                </div>
            </div>

            <div className=" mx-auto py-12 px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8">
                    {/* Blog İçeriği */}
                    <div className={"flex flex-col justify-between"}>
                        <div dangerouslySetInnerHTML={{__html: article.content}}/>
                        <div>
                            <div>Oxunma sayi {article.readCount}</div>
                            <div>Publish date {article.publishedAt?.toString()}</div>
                        </div>

                    </div>

                    <MostReadArticles/>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;