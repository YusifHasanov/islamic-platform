import React from 'react';
import Link from "next/link";
import Image from "next/image";

const ArticleCard = ({ id, title, description, image, date, authorName, authorImage }) => {
   // console.log({ id, title, description, image, date, authorName, authorImage });

    return (
        <div
            style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.09)" }}
            className="bg-white rounded-md overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col"
        >
            <Link href={`/articles/${id}`}>
                <Image
                    src={image}
                    alt={title}
                    height={48}
                    width={500}
                    className="w-full cursor-pointer h-48 object-cover"
                />
            </Link>
            <div className="p-4 flex flex-col flex-grow">
                <Link href={`/articles/${id}`}>
                    <h2 className="text-lg cursor-pointer font-semibold text-gray-800">
                        {title}
                    </h2>
                </Link>
                <p className="text-gray-600 mt-2 text-sm">{description}</p>
                <p className="text-gray-400 mt-4 text-xs">{date}</p>
                {/* Author details positioned at the bottom */}
                <div className="mt-auto flex items-center space-x-2">
                    <img
                        src={authorImage || "/default-avatar.png"}
                        alt={authorName}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-800">{authorName}</span>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
