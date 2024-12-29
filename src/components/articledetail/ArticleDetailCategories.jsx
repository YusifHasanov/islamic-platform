'use client';
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import HttpClient from "@/util/HttpClient";
import CacheProvider from "@/util/CacheProvider";


const ArticleDetailCategories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CacheProvider.fetchData("article_categories", 60, async () => HttpClient.get('/categories'))
            .then(data => setCategories(data))
            .catch((err) => console.log(err));
    }, []);

    const [expanded, setExpanded] = useState({});


    const toggleAccordion = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };


    const renderCategoryTree = (parentId = null) => {
        const filteredCategories = categories.filter(cat => cat.parentId === parentId);

        if (filteredCategories.length === 0) return null;

        return (
            <ul className="space-y-1">
                {filteredCategories.map((item) => (
                    <li key={item.id} className="border-b border-gray-200">
                        <div className="flex justify-between items-center py-2 px-1">

                            <Link
                                href={`/articles?page=0&category=${item.id}`}
                                className={`transition-colors font-medium text-gray-700 hover:text-yellow-600`}
                            >
                                {item.name}
                            </Link>
                            {categories.some(cat => cat.parentId === item.id) && (
                                <button
                                    onClick={() => toggleAccordion(item.id)}
                                    className="text-gray-500 hover:text-gray-800 transition"
                                >
                                    {expanded[item.id] ? '▲' : '▼'}
                                </button>
                            )}
                        </div>
                        {expanded[item.id] && (
                            <div className="pl-4">
                                {renderCategoryTree(item.id)}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="mb-8">
            <h3
                style={{lineHeight: "1"}}
                className="text-lg mb-5 text-gray-800 border-l-4 pl-4 border-yellow-500"
            >
                Kateqoriyalar
            </h3>
            {renderCategoryTree()}
        </div>
    );
};

export default ArticleDetailCategories;