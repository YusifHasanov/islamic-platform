import React from 'react';

function CreateArticle() {
    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Create a new post</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Side: Image Upload and Content Input */}
                <div className="lg:col-span-2">
                    <div className="border-2 border-dashed rounded-lg p-4 mb-4 flex flex-col items-center justify-center h-48">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded">+ Choose</button>
                        <p className="mt-2 text-gray-500">Drop or select a cover image</p>
                    </div>
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        placeholder="Content"
                        className="w-full p-2 border border-gray-300 rounded h-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* Right Side: Publish Options, Tags, Meta */}
                <div className="space-y-4">
                    <div className="border p-4 rounded shadow">
                        <h2 className="text-lg font-medium">Publish</h2>
                        <div className="mt-2">
                            <div className="flex justify-between items-center mb-2">
                                <span>Status:</span>
                                <span className="text-gray-600">Draft</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Visibility:</span>
                                <span className="text-gray-600">Private</span>
                            </div>
                        </div>
                    </div>

                    <div className="border p-4 rounded shadow">
                        <h2 className="text-lg font-medium">Tags</h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">Software</span>
                            <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">Web</span>
                        </div>
                    </div>

                    <div className="border p-4 rounded shadow">
                        <h2 className="text-lg font-medium">Meta</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            placeholder="Description"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <button className="px-4 py-2 bg-red-500 text-white rounded">Discard</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">Publish</button>
            </div>
        </div>
    );
}

export default CreateArticle;
