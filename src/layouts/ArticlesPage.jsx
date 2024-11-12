import Header from "@/components/articles/Header";
import React from "react";
import ArticleCard from "@/components/articles/ArticleCard";
import ArticleCategories from "@/components/articles/ArticleCategories";
import PopularArticles from "@/components/articles/PopularArticles";
import OtherArticleList from "@/components/articles/OtherArticleList";
import {BASE_URL} from "@/util/Const";
import Pagination from "@/components/articles/Pagination";

export const revalidate = 60; // ISR: 60 saniyede bir yeniden oluştur
const PAGE_SIZE = 6;


export default async function ArticlesPage({page, category}) {
    page = parseInt(page || '0', 10);

    // API'den veri çek ve sayfalama parameterizing ekle
    category = parseInt(category || '0', 0);

    const res = await fetch(`${BASE_URL}/articles?page=${page}&size=${PAGE_SIZE}&categoryId=${category}`, {
        next: { revalidate: 60 },
    });
    const data = await res.json();
    const {content, pageable} = data;
    console.log(data);


    return (
        <>
            <Header/>
            <div className="min-h-screen">
                <div className=" px-6 sm:px-12 mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">Son Eklenenler</h1>
                    <div className="flex flex-wrap lg:flex-nowrap gap-10">
                        {/* Makale Kartları */}
                        <div style={{gridTemplateRows: "repeat(2, 350px)"}}
                             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            { content &&
                                content.map((item, id) => (
                                    <ArticleCard
                                        key={id}
                                        id={item.id}
                                        title={item.title}
                                        description={item.description}
                                        image={item.image}
                                        date={item.date}
                                    />
                                ))
                            }
                        </div>

                        {/* Sağ Sidebar (Kategoriler ve En Çok Okunanlar) */}
                        <aside className="bg-white p-6 rounded-lg  lg:w-5/12 w-full">
                            <Search/>
                            <ArticleCategories page={page} category={category}/>
                            <PopularArticles/>
                        </aside>
                    </div>
                    <Pagination currentPage={data.pageable.pageNumber} totalPages={data.totalPages}/>
                    <OtherArticleList/>
                </div>
            </div>
        </>
    );
}


function Search() {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Aranacak kelime..."/>
            <button type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="icon">
                    <path
                        d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                    </path>
                </svg>
            </button>
        </div>
    );
}






