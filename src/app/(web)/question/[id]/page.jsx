'use client'
import {useParams, useRouter} from "next/navigation";

import { useState, useEffect } from "react";

const mockVideos = [
    {
        id: 1,
        title: "İdrar akıntısı nedeniyle namazı terk eden arkadaşıma ne tavsiye edebilirim?",
        author: "Halis Bayancuk Hoca",
        date: "2023-09-29",
        duration: "00:05:13",
        category: "Fıkıh Soruları",
        views: 397,
        tags: ["namaz", "ibadet", "fıkıh"],
        question: "İdrar akıntısı gibi durumlarda namazdan sorumlu olur muyuz?",
        answer:
            "Bu durumda temizliğe özen göstermeli ve mümkünse abdest alarak namaz kılmalıyız. Şartları yerine getiremiyorsak Allah kolaylık sağlar.",
    },
    {
        id: 2,
        title: "Başibos Sokak Köpekleri ile Alakalı Çözüm Nedir?",
        author: "Halis Bayancuk Hoca",
        date: "2024-05-25",
        duration: "00:08:46",
        category: "Güncel Sorular",
        views: 303,
        tags: ["sokak köpekleri", "çözüm", "güncel"],
        question: "Sokak köpekleri sorununa nasıl yaklaşmalıyız?",
        answer:
            "Bu sorun insan ve hayvan haklarını gözeten bir şekilde çözümlenmelidir. İslami bakış açısıyla merhamet ve adalet gözetilmelidir.",
    },
    {
        id: 3,
        title: "Sabah namazına kalkmak için ne yapmalıyım?",
        author: "Halis Bayancuk Hoca",
        date: "2024-01-15",
        duration: "00:04:30",
        category: "Ahlak Soruları",
        views: 150,
        tags: ["namaz", "ahlak", "motivasyon"],
        question: "Sabah namazına kalkma alışkanlığı nasıl kazanılır?",
        answer:
            "Düzenli bir uyku alışkanlığı ve niyet önemlidir. Ayrıca sabah erken kalkmayı kolaylaştıran alarm uygulamaları kullanılabilir.",
    },
];

export default function DetailPage() {

    const { id } = useParams()// Detay sayfasına gelen id parametresi
    const [data, setData] = useState(null);

    useEffect(() => {
        // Mock verilerden id'ye göre veri alma
        if (id) {
            const videoData = mockVideos.find((video) => video.id === parseInt(id));
            setData(videoData);
        }
    }, [id]);

    if (!data) {
        return <p className="text-center text-gray-500 mt-10">Yükleniyor...</p>;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                Soru Detayı
            </h1>

            <div className="bg-white rounded-lg shadow-lg p-6">
                {/* Başlık */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {data.title}
                </h2>

                {/* Yazar ve Tarih */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <span>Yazar: <strong>{data.author}</strong></span>
                    <span>Tarih: {data.date}</span>
                </div>

                {/* Kategori */}
                <p className="text-gray-700 mb-4">
                    <strong>Kategori:</strong> {data.category}
                </p>

                {/* Tagler */}
                <div className="mb-4 flex flex-wrap gap-2">
                    <strong className="mr-2">Etiketler:</strong>
                    {data.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Soru */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Soru:</h3>
                    <p className="text-gray-700">{data.question}</p>
                </div>

                {/* Cevap */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Cevap:</h3>
                    <p className="text-gray-700">{data.answer}</p>
                </div>
            </div>
        </div>
    );
}