import React from 'react';
import MostReadArticles from "@/components/articledetail/MostReadArticles";
import ArticleContent from "@/components/articledetail/ArticleContent";

const ArticleDetail = () => {
    return (
        <div>
            {/* Full Width Image */}
            <div className="relative w-full h-[700px]">
                <img
                    src="https://hayalhanem.com/wp-content/uploads/2024/10/Cemaat-Olmanin-Onemi.webp"
                    alt="Blog Image"
                    className="w-full h-full object-cover"
                />
                {/* Overlay with Text */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white px-4 md:px-8">
                        <h1 className="text-2xl md:text-4xl font-bold mb-2">
                            MÜSLÜMANIN BORCU OLUR MU? – EFENDİMİZ(S.A.V.) BORCU OLAN MÜSLÜMANIN CENAZE NAMAZINI
                            KILDIRMAMIŞ MIDIR?
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
                    <ArticleContent/>

                    {/* Sağ Menü - En Çok Okunanlar */}
                    <MostReadArticles/>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;