'use client';
import React, {useEffect, useState} from 'react';
import { BASE_URL } from "@/util/Const";
import Link from "next/link";
import HttpClient from "@/util/HttpClient";

const fetchCategories = async () => {
    const res = await fetch(`${BASE_URL}/categories`, {
        next: { revalidate: 60 },
    });
    return await res.json();
};

const ArticleCategories =  ({ page, category }) => {
    // const categories = await fetchCategories();
    const [categories,setCategories]= useState([]);
    useEffect(() => {
        HttpClient.get("/categories",{
            next: { revalidate: 60 },
        }).then(r=>r.json())
        .then(data => setCategories(data))
        .catch(err => console.error(err));
    }, []);
    // State to track which categories are expanded
    const [expanded, setExpanded] = useState({});

    // Toggle accordion for a specific category
    const toggleAccordion = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Render categories and subcategories recursively
    const renderCategoryTree = (parentId = null) => {
        const filteredCategories = categories.filter(cat => cat.parentId === parentId);

        if (filteredCategories.length === 0) return null;

        return (
            <ul className="space-y-1">
                {filteredCategories.map((item) => (
                    <li key={item.id} className="border-b border-gray-200">
                        <div className="flex justify-between items-center py-2 px-1">
                            <Link
                                href={category === item.id ? `/articles?page=${page}` : `/articles?page=${page}&category=${item.id}`}
                                className={`transition-colors font-medium text-gray-700 hover:text-yellow-600 ${
                                    item.id === category ? "text-yellow-600" : ""
                                }`}
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
                style={{ lineHeight: "1" }}
                className="text-lg mb-5 text-gray-800 border-l-4 pl-4 border-yellow-500"
            >
                Kategoriler
            </h3>
            {renderCategoryTree()}
        </div>
    );
};

export default ArticleCategories;