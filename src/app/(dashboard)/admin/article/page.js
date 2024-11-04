'use client'
import React from 'react';
import { FaComment, FaShare, FaClock } from 'react-icons/fa';
import {useRouter} from "next/navigation";

const articles = [
    {
        title: 'Blog',
        description: 'Curabitur vitae sit justo facilisi nec, sodales proin aliquet libero volutpat nunc',
        image: 'https://apollo.primereact.org/demo/images/blog/blog-4.png',
        author: 'https://via.placeholder.com/40',
        comments: 5,
        shares: 5,
        date: '14 Dec'
    },
    {
        title: 'Magazine',
        description: 'Id eget arcu suspendisse ullamcorper dolor lobortis dui et morbi penatibus quam',
        image: 'https://apollo.primereact.org/demo/images/blog/blog-4.png',
        author: 'https://via.placeholder.com/40',
        comments: 4,
        shares: 1,
        date: '05 Apr'
    },
    {
        title: 'Science',
        description: 'Sagittis hendrerit laoreet dignissim sed auctor sit pellentesque vel diam iaculis et',
        image: 'https://apollo.primereact.org/demo/images/blog/blog-4.png',
        author: 'https://via.placeholder.com/40',
        comments: 1,
        shares: 3,
        date: '12 Nov'
    },
    {
        title: 'Blog',
        description: 'Curabitur vitae sit justo facilisi nec, sodales proin aliquet libero volutpat nunc',
        image: 'https://apollo.primereact.org/demo/images/blog/blog-4.png',
        author: 'https://via.placeholder.com/40',
        comments: 5,
        shares: 5,
        date: '14 Dec'
    },
    {
        title: 'Magazine',
        description: 'Id eget arcu suspendisse ullamcorper dolor lobortis dui et morbi penatibus quam',
        image: 'https://apollo.primereact.org/demo/images/blog/blog-4.png',
        author: 'https://via.placeholder.com/40',
        comments: 4,
        shares: 1,
        date: '05 Apr'
    },
    {
        title: 'Science',
        description: 'Sagittis hendrerit laoreet dignissim sed auctor sit pellentesque vel diam iaculis et',
        image: 'https://apollo.primereact.org/demo/images/blog/blog-4.png',
        author: 'https://via.placeholder.com/40',
        comments: 1,
        shares: 3,
        date: '12 Nov'
    },
];

function ArticleList() {

   const  router = useRouter();

   const onClick = ()=>{
       router.push('/admin/article/14');
   }
    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article, index) => (
                    <div onClick={onClick} key={index} className="border rounded-lg shadow-md overflow-hidden">
                        <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                            <p className="text-gray-600 mb-4">{article.description}</p>
                            <div className="flex items-center space-x-2 mb-4">
                                <img src={article.author} alt="Author" className="w-8 h-8 rounded-full" />
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <FaComment />
                                    <span>{article.comments}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <FaShare />
                                    <span>{article.shares}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <FaClock />
                                    <span>{article.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4 space-x-2">
                <button className="px-3 py-1 border rounded">&laquo;</button>
                <button className="px-3 py-1 border rounded">1</button>
                <button className="px-3 py-1 border rounded bg-gray-200">2</button>
                <button className="px-3 py-1 border rounded">&raquo;</button>
            </div>
        </div>
    );
}

export default ArticleList;
