'use client';
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import HttpClient from "@/util/HttpClient";

export default function DetailPage() {
    const { id } = useParams(); // Extract the question ID from the route
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch question details from the API
        HttpClient.get(`/questions/${id}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error("Error fetching question:", err));
    }, [id]);

    if (!data) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                {/* Page Title */}
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
                    Soru Detayı
                </h1>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
                    {data.question}
                </h2>

                {/* Author & Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <span>
                        <strong>Yazar:</strong> {data.author || "Bilinmiyor"}
                    </span>
                </div>

                {/* Categories */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Kategoriler:</h3>
                    <p className="text-gray-700">
                        {data.categories.length > 0
                            ? data.categories.map((c) => c.name).join(", ")
                            : "Kategori yok"}
                    </p>
                </div>

                {/* Tags */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Etiketler:</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.tags.length > 0 ? (
                            data.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full shadow-sm"
                                >
                                    #{tag.name}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-500">Etiket yok</span>
                        )}
                    </div>
                </div>

                {/* Question */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Sual:</h3>
                    <p className="text-gray-700 leading-relaxed">{data.question}</p>
                </div>

                {/* Answer */}
                <div className="bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Cavab:</h3>
                    <p className="text-gray-700 leading-relaxed break-words whitespace-pre-line">
                        {data.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}