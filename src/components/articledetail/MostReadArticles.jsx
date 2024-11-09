import React from 'react';
import {BASE_URL} from "@/util/Const";
import Link from "next/link";



// Main Component
const MostReadArticles = async () => {

    const res = await fetch(`${BASE_URL}/articles/popular`)
    const articles = await res.json();


    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-[17px] font-normal text-black mb-6">EN ÇOK OKUNANLAR</h2>
            <div className="space-y-6">
                {articles.map((item, index) => (
                    <React.Fragment key={index}>
                        <Link href={`/articles/${item.id}`} className="flex   space-x-4 mb-8">
                            <img src={item.image} alt={item.title} className="w-40 cursor-pointer h-24 object-cover rounded-lg" />
                            <div className="">
                                <h3  style={{fontSize:"15px"}}  className="mb-4 cursor-pointer hover:text-[#fcb900] font-normal text-gray-800">{item.title}</h3>
                                <p className="text-xs text-gray-500">{item.publishedAt}</p>
                            </div>
                        </Link>
                        {index !== articles.length - 1 && <hr className="border-gray-300" />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default MostReadArticles;