'use client'
import React from 'react';
import {useRouter} from "next/navigation";

const ArticleCard = ({title, description,image, date}) => {
   const router = useRouter();
    return (
        <div
            style={{boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.09)"}}
            className="bg-white rounded-md  overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
                onClick={() => router.push("/articles/" + title)}
                src={image} alt={title} className="w-full cursor-pointer  h-48 object-cover"/>
            <div className="p-4">
                <h2 onClick={() => router.push("/articles/" + title)}
                    className="text-lg cursor-pointer font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-2 text-sm">{description}</p>
                <p className="text-gray-400 mt-4 text-xs">{date}</p>
            </div>
        </div>

    );
};


export default ArticleCard;