import React from 'react';
import { FaClock, FaComment, FaEye } from 'react-icons/fa';

function ArticleDetail() {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">How To Get Started Tutorial</h1>
                <div className="flex items-center space-x-2">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="Author"
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">Jane Cooper</span>
                </div>
            </div>

            <div className="flex space-x-4 text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                    <FaClock />
                    <span>2d ago</span>
                </div>
                <div className="flex items-center space-x-1">
                    <FaComment />
                    <span>24</span>
                </div>
                <div className="flex items-center space-x-1">
                    <FaEye />
                    <span>124</span>
                </div>
            </div>

            <img
                src="https://via.placeholder.com/800x400"
                alt="Article Cover"
                className="w-full rounded-lg mb-4"
            />

            <h2 className="text-2xl font-bold mb-2">Sodales massa, morbi convallis</h2>
            <p className="mb-4 text-gray-700">
                First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words per minute and your writing skills are sharp. From the seed of the idea to finally hitting “Publish,” you might spend several days or maybe even a week “writing” a blog post, but it’s important to spend those vital hours planning your post and even thinking about Your Post(yes, thinking counts as working if you’re a blogger) before you actually write it.
            </p>
            <p className="mb-4 text-gray-700">
                There’s an old maxim that states, “No fun for the writer, no fun for the reader.” No matter what industry you’re working in, as a blogger, you should live and die by this statement.
            </p>
            <p className="mb-4 text-gray-700">
                Before you do any of the following steps, be sure to pick a topic that actually interests you. Nothing – and I mean NOTHING – will kill a blog post more effectively than a lack of enthusiasm from the writer. You can tell when a writer is bored by their subject, and it’s so cringe-worthy it’s a little embarrassing.
            </p>

            <h2 className="text-2xl font-bold mb-2">Commodo ultricies orci tempus et fermentum, pellentesque ultricies.</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700">
                <li>Fermentum neque odio laoreet morbi sit. Venenatis in quam ut non.</li>
                <li>Enim in porta facilisi a vulputate fermentum, morbi. Consequat, id praesent tristique euismod pellentesque.</li>
                <li>Implements This is an external link</li>
                <li>Scelerisque ultricies tincidunt lectus faucibus non morbi sed nibh varius. Quam a, habitasse egestas eleifend.</li>
            </ul>

            <div className="flex space-x-4">
                <button className="px-4 py-2 bg-gray-700 text-white rounded flex items-center">
                    <FaComment className="mr-2" /> Twitter
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded flex items-center">
                    <FaComment className="mr-2" /> Facebook
                </button>
            </div>
        </div>
    );
}

export default ArticleDetail;
