import React from 'react';
import {BASE_URL} from "@/util/Const";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

// Main Component
const MostReadArticles = async ({article}) => {

    const res = await fetch(`${BASE_URL}/articles/popular`)
    const articles = await res.json();

    console.log("MostReadArticles", article);

    const isCurrentArticle = (id) => {
        return id.toString() === article.id?.toString() ? "text-[#fcb900]" : "";
    }

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-[17px] font-normal text-black mb-6">EN ÇOK OKUNANLAR</h2>
            <div className="space-y-6">
                {articles.map((item, index) => (
                    <React.Fragment key={index}>
                        <Link href={`/articles/${item.id}`} className={`flex space-x-4 mb-8`}>
                            <Image src={item.image} alt={item.title} height={24} width={400}
                                 className="w-40 cursor-pointer h-24 object-cover rounded-lg"/>
                            <div className="">
                                <h3 style={{fontSize: "15px"}}
                                    className={`${isCurrentArticle(item.id)} mb-4 cursor-pointer hover:text-[#fcb900] font-normal text-gray-800`}>{item.title}</h3>
                                <p className={`text-xs text-gray-500 ${isCurrentArticle(item.id)}`}>{item.publishedAt}</p>
                            </div>
                        </Link>
                        {index !== articles.length - 1 && <hr className="border-gray-300"/>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default MostReadArticles;
