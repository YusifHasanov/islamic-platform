import React from 'react';
import {FaClock, FaUser} from "react-icons/fa";

const Page = () => {
    const book = {
        title: '1984',
        author: 'George Orwell',
        description: 'A dystopian novel set in a totalitarian society ruled by Big Brother.',
        cover: 'https://radioviaducto.cl/wp-content/uploads/2023/09/biblia-mes-de-010923.webp',
        date: '1949'
    };
    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">{book.title}</h1>
                <div className="flex items-center space-x-2">
                    <FaUser className="text-gray-500"/>
                    <span className="text-gray-700 font-medium">{book.author}</span>
                </div>
            </div>
            <img
                src={book.cover}
                alt={book.title}
                className="w-full h-80 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-4">{book.description}</p>
            <div className="text-gray-500">
                <FaClock className="inline mr-1"/>
                <span>Published: {book.date}</span>
            </div>
        </div>
    );
};

export default Page;