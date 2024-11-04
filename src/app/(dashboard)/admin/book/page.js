import React from 'react';
import { FaClock } from 'react-icons/fa';
import Link from "next/link";

const books = [
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A novel set in the Roaring Twenties, exploring themes of wealth, excess, and the American dream.',
        cover: 'https://radioviaducto.cl/wp-content/uploads/2023/09/biblia-mes-de-010923.webp',
        date: '1925'
    },
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'A story of racial injustice and childhood innocence in the Deep South.',
        cover: 'https://radioviaducto.cl/wp-content/uploads/2023/09/biblia-mes-de-010923.webp',
        date: '1960'
    },
    {
        title: '1984',
        author: 'George Orwell',
        description: 'A dystopian novel set in a totalitarian society ruled by Big Brother.',
        cover: 'https://radioviaducto.cl/wp-content/uploads/2023/09/biblia-mes-de-010923.webp',
        date: '1949'
    },
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A novel set in the Roaring Twenties, exploring themes of wealth, excess, and the American dream.',
        cover: 'https://radioviaducto.cl/wp-content/uploads/2023/09/biblia-mes-de-010923.webp',
        date: '1925'
    },
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'A story of racial injustice and childhood innocence in the Deep South.',
        cover: 'https://radioviaducto.cl/wp-content/uploads/2023/09/biblia-mes-de-010923.webp',
        date: '1960'
    },
    {
        title: '1984',
        author: 'George Orwell',
        description: 'A dystopian novel set in a totalitarian society ruled by Big Brother.',
        cover: 'https://radioviaducto.cl/wp-content/uploads/2023/09/biblia-mes-de-010923.webp',
        date: '1949'
    },

];

function BookList() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.map((book, index) => (
                    <Link key={index} className="border rounded-lg shadow-md overflow-hidden" href={'/admin/book/1'}>
                        <img src={book.cover} alt={book.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
                            <p className="text-gray-700 mb-2 italic">by {book.author}</p>
                            <p className="text-gray-600 mb-4">{book.description}</p>
                            <div className="flex items-center text-gray-500">
                                <FaClock className="mr-1" />
                                <span>Published: {book.date}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}



export default BookList;