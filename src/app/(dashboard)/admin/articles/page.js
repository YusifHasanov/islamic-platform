'use client';
import React, { useEffect, useState } from 'react';
import { FaComment, FaShare, FaClock } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import HttpClient from "@/util/HttpClient";
import { Button } from "primereact/button";
import Link from "next/link";

function ArticleList() {
    const router = useRouter();
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(0); // Başlangıç sayfası 0
    const [totalPages, setTotalPages] = useState(0); // Toplam sayfa sayısı
    const PAGE_SIZE = 10;

    // API'den makaleleri çek
    const fetchArticles = async (currentPage) => {
        try {
            const res = await HttpClient.get(`/articles?page=${currentPage}&size=${PAGE_SIZE}`);
            const data = await res.json();
            setArticles(data.content);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.log(err);
        }
    };

    // İlk yüklemede ve sayfa değiştiğinde makaleleri çek
    useEffect(() => {
        fetchArticles(page);
    }, [page]);

    const onClick = (id) => {
        router.push(`/admin/articles/${id}`);
    };

    const goToPreviousPage = () => {
        if (page > 0) setPage(page - 1);
    };

    const goToNextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    if (articles.length === 0) {
        return (
            <div className="articles">
                <p>Not found any articles</p>
                <div className="flex items-center mb-2 space-x-2">
                    <Button>
                        <Link href={'/admin/articles/create'}>Create</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex items-center mb-2 space-x-2">
                <Button>
                    <Link href={'/admin/articles/create'}>Create</Link>
                </Button>
            </div>
            <h1 className="text-2xl font-bold mb-4">Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article, index) => (
                    <div
                        key={index}
                        onClick={() => onClick(article.id)}
                        className="border rounded-lg shadow-md overflow-hidden cursor-pointer"
                    >
                        {article.image ? (
                            <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
                        ) : (
                            <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                                <span>No Image</span>
                            </div>
                        )}
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                            <p className="text-gray-600 mb-2">Categories: {article.categories || 'No Categories'}</p>
                            <p className="text-gray-600 mb-4">Authors: {article.authors || 'No Authors'}</p>
                            <div className="flex justify-between text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <FaClock />
                                    <span>Published</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sayfalama Butonları */}
            <div className="flex justify-center mt-4 space-x-2">
                <button
                    className="px-3 py-1 border rounded"
                    onClick={goToPreviousPage}
                    disabled={page === 0}
                >
                    &laquo; Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`px-3 py-1 border rounded ${index === page ? 'bg-gray-200' : ''}`}
                        onClick={() => setPage(index)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="px-3 py-1 border rounded"
                    onClick={goToNextPage}
                    disabled={page === totalPages - 1}
                >
                    Next &raquo;
                </button>
            </div>
        </div>
    );
}

export default ArticleList;