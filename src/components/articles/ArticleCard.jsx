import React from 'react';
import Link from "next/link";
import Image from "next/image";
const ArticleCard = ({id,title, description,image, date}) => {

    return (
        <div
            style={{boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.09)"}}
            className="bg-white rounded-md  overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <Link href={"/articles/" + id}>
                <Image
                    src={image} alt={title}
                    height={48}
                    width={500}
                    className="w-full cursor-pointer  h-48 object-cover"/>
            </Link>
            <div className="p-4">
                <Link href={"/articles/" + id}>
                    <h2 className="text-lg cursor-pointer font-semibold text-gray-800">{title}</h2>
                </Link>
                <p className="text-gray-600 mt-2 text-sm">{description}</p>
                <p className="text-gray-400 mt-4 text-xs">{date}</p>
            </div>
        </div>

    );
};


export default ArticleCard;