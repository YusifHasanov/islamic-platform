import React from 'react';
import {BASE_URL} from "@/util/Const";
import Link from "next/link";

const ArticleCategories = async ({page, category}) => {
    const res = await fetch(`${BASE_URL}/categories`);
    const categories = await res.json();
    console.log(categories);
    return (
        <div className="mb-8">
            <h3
                style={{lineHeight: "1"}}
                className="text-lg  mb-5 text-gray-800 border-l-4 pl-4 border-yellow-500 ">Kategoriler</h3>
            <ul className="space-y-1 categoriesList text-gray-700 font-medium">
                {
                    categories.map((item, index) => (
                        <Link
                            key={index}
                            href={category === item.id ? `/articles?page=${page}` : `/articles?page=${page}&category=${item.id}`}>
                            <li
                                className={`hover:text-yellow-600 px-1 py-0.5 transition-colors cursor-pointer
            ${item.id === category ? "text-yellow-600" : ""}
        `}
                            >
                                {item.name}
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </div>
    );
};

export default ArticleCategories;

