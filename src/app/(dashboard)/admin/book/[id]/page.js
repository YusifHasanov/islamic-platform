"use client";

import React, {useState, useEffect, use} from 'react';
import {FaClock, FaUser} from "react-icons/fa";
import {BASE_URL} from "@/util/Const";
import {useRouter, notFound} from "next/navigation";
import HttpClient from "@/util/HttpClient";

const Page = ({params}) => {
    const {id} = use(params);
    const router = useRouter();

    const [book, setBook] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        authorId: '',
        image: '',
    });
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch book data
    useEffect(() => {
        HttpClient.get(`/books/${id}`)
            .then(res => res.json()
                .then(data => {
                    setBook(data);
                    setFormData({
                        title: data.title,
                        authorId: data.authorId,
                        image: data.image,
                    });
                })
                .catch(err => console.log(err)));
    }, [id]);

    // Fetch authors
    useEffect(() => {
        HttpClient.get('/authors')
            .then(res => res.json())
            .then(data => setAuthors(data))
            .catch(err => console.log("Error fetching authors:", err));
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({...prev, image: reader.result}));
            };
            reader.readAsDataURL(file);
        }
    };

    // Save changes
    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title,
                    authorId: formData.authorId,
                    image: formData.image,
                }),
            });

            if (!res.ok) throw new Error('Failed to save book');
            alert('Book updated successfully');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Error updating book');
        } finally {
            setLoading(false);
        }
    };

    // Delete book
    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this book?')) return;

        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/books/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete book');
            alert('Book deleted successfully');
            router.push('/admin/book');
        } catch (error) {
            console.error(error);
            alert('Error deleting book');
        } finally {
            setLoading(false);
        }
    };

    if (!book) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Edit Book</h1>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <FaUser className="text-gray-500"/>
                    <span className="text-gray-700 font-medium">Author:</span>
                    <select
                        name="authorId"
                        value={formData.authorId}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                    >
                        <option value="">Select Author</option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Change Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border p-2 rounded"
                />
            </div>

            {formData.image && (
                <img
                    src={formData.image}
                    alt={formData.title}
                    className="w-full h-80 object-cover rounded-lg mb-4"
                />
            )}

            <div className="text-gray-500 mb-4">
                <FaClock className="inline mr-1"/>
                <span>Published: {book.publishedDate}</span>
            </div>

            <div className="flex space-x-2">
                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
};

export default Page;