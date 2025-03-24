'use client';
import React, {useEffect, useRef, useState} from 'react';
import {FaComment, FaShare, FaClock} from 'react-icons/fa';
import {useRouter} from "next/navigation";
import HttpClient from "@/util/HttpClient";
import {Button} from "primereact/button";
import Link from "next/link";
import {InputNumber} from "primereact/inputnumber";
import {Toast} from "primereact/toast";

function ArticleList() {
    const router = useRouter();
    const [articles, setArticles] = useState([]);
    const [selectedArticles, setSelectedArticles] = useState([]); // Track selected articles
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const PAGE_SIZE = 10;
    const [findById, setFindById] = useState(0);
    const toast = useRef(null);
    // Fetch articles from API
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

    // Initial fetch and on page change
    useEffect(() => {
        fetchArticles(page);
    }, [page]);

    const onClick = (id) => {
        router.push(`/admin/articles/${id}`);
    };

    const toggleSelection = (id) => {
        setSelectedArticles((prev) =>
            prev.includes(id) ? prev.filter((articleId) => articleId !== id) : [...prev, id]
        );
    };

    const deleteSelectedArticles = async () => {
        if (!selectedArticles.length) {
            alert('No articles selected for deletion.');
            return;
        }

        if (!confirm('Are you sure you want to delete the selected articles?')) return;


        try {
            // Await all delete requests
            await Promise.all(
                selectedArticles.map(articleId =>
                    HttpClient.delete(`/articles/${articleId}`)
                )
            );
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Selected articles deleted successfully.',
            });
            // Clear the selection
            setSelectedArticles([]);
            // Revalidate and refresh the list
            await revalidateArticle(null);
            await fetchArticles(page);
        } catch (err) {
            console.error('Error deleting articles:', err);
            alert("Failed to delete selected articles");
        }

    };
    async function revalidateArticle(articleId) {
        if (!articleId) {
        fetch(
            `/api/revalidate?path=/articles/${articleId}&secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}`,
            {method: 'GET'}
        )
            .then(() => console.log(`Revalidated article ${articleId} successfully.`))
            .catch(() => console.error(`Failed to revalidate article ${articleId}.`));

        }

        fetch(`/api/revalidate?path=/articles&secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}`)
            .then(() => console.log('Revalidated articles revalidated.'))
            .catch((err) => console.error('Failed to revalidate /articles page.'));
    }

    const goToPreviousPage = () => {
        if (page > 0) setPage(page - 1);
    };

    const goToNextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    if (articles.length === 0) {
        return (
            <div className="articles">
                <p>No articles found</p>
                <div className="flex items-center mb-2 space-x-2">

                    <Link href={'/admin/articles/create'}>
                        <Button>
                            Create
                        </Button>
                    </Link>

                </div>
            </div>
        );
    }


    const goFindById = () => {
        if (findById != null && findById > 0) {
            router.push(`/admin/articles/${findById}`);
        }
    }

    const route = (path) => router.push(path);

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Toast ref={toast}/>
            <div className="flex justify-between items-center mb-4">
                <Button onClick={() => route('/admin/articles/create')}>
                    Create
                </Button>
                <div className={"flex"}>
                    <InputNumber value={findById} onValueChange={(e) => setFindById(e.target.value)}/>
                    <Button onClick={goFindById}>Tap </Button>
                </div>
                <Button
                    onClick={deleteSelectedArticles}
                    className="bg-red-500 hover:bg-red-700 text-white"
                >
                    Delete Selected
                </Button>
            </div>
            <h1 className="text-2xl font-bold mb-4">Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article) => (
                    <div
                        key={article.id}
                        className="border rounded-lg shadow-md overflow-hidden relative"
                    >
                        <div className="absolute top-2 left-2">
                            <input
                                type="checkbox"
                                checked={selectedArticles.includes(article.id)}
                                onChange={() => toggleSelection(article.id)}
                                className="w-6 h-6"
                            />
                        </div>
                        {article.image ? (
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-40 object-cover "

                            />
                        ) : (
                            <div
                                className="w-full h-40 bg-gray-200 flex items-center justify-center cursor-pointer"
                                onClick={() => onClick(article.id)}
                            >
                                <span>No Image</span>
                            </div>
                        )}
                        <div className="p-4">
                            <h2
                                className="text-xl font-semibold mb-2 cursor-pointer"
                                onClick={() => onClick(article.id)}
                            >
                                {article.title}
                            </h2>
                            <p className="text-gray-600 mb-2">
                                Categories: {article.categories || 'No Categories'}
                            </p>
                            <p className="text-gray-600 mb-4">
                                Authors: {article.authorName || 'No Authors'}
                            </p>
                            <div className="flex justify-between text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <FaClock/>
                                    <span>Published : {new Date(article.publishedAt).toLocaleDateString('az-AZ', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                    })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
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
