'use client'
import {useParams, useRouter} from "next/navigation";
import { useState, useEffect } from "react";

const mockVideos = [
    {
        id: 1,
        title: "Hakkım olandan fazlasını kazandığım tazminat helal midir?",
        author: "T. Y.",
        date: "2023-12-28",
        views: 561,
        tags: ["alacaklı", "avukat", "dava", "işveren", "maaş", "tazminat"],
        question:
            "Hocam çalıştığım bir iş yerinden alacaklıydım ancak ücretimi ödemedikleri için dava açıldı. Hukuki süreç sonunda alacağımdan daha fazlası, tazminat olarak hesabıma yatacak. Bu tazminatı almam helal midir?",
        answer:
            "Yasalar, sizin işvereniniz tarafından mağdur edildiğinizi kabul ederse 'tazminatınızı alabilirsiniz' ama hakkınızdan fazla olanını avukat masraflarını da çıkardıktan sonra iş yerinize iade etmek zorundasınız.",
    },
    {
        id: 2,
        title: "Başibos Sokak Köpekleri ile Alakalı Çözüm Nedir?",
        author: "Halis Bayancuk Hoca",
        date: "2024-05-25",
        views: 303,
        tags: ["sokak köpekleri", "çözüm", "güncel"],
        question: "Sokak köpekleri sorununa nasıl yaklaşmalıyız?",
        answer:
            "Bu sorun insan ve hayvan haklarını gözeten bir şekilde çözümlenmelidir. İslami bakış açısıyla merhamet ve adalet gözetilmelidir.",
    },
];

export default function DetailPage() {
    const router = useRouter();
    const { id } = useParams(); // Detay sayfasına gelen id parametresi
    const [data, setData] = useState(null);

    useEffect(() => {
        if (id) {
            const videoData = mockVideos.find((video) => video.id === parseInt(id));
            setData(videoData);
        }
    }, [id]);

    if (!data) {
        return <p className="text-center text-gray-500 mt-10">Yükleniyor...</p>;
    }

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            {/* Başlık Kartı */}
            <div className="bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>
                <div className="flex items-center justify-between text-gray-500 mt-4">
                    <span>{data.date}</span>
                    <span className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 10l4.553 2.276a2 2 0 010 3.448L15 18m0-8l-4.553 2.276a2 2 0 000 3.448L15 18m-6-8v8"
                            />
                        </svg>
                        {data.views} görüntülenme
                    </span>
                </div>
            </div>

            {/* İçerik Bölümü */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Soru ve Cevap */}
                <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Soru</h2>
                        <p className="text-gray-700">{data.question}</p>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Cevap</h2>
                        <p className="text-gray-700">{data.answer}</p>
                    </div>
                </div>

                {/* Yazar ve Etiketler */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                        <div className="ml-4">
                            <p className="font-semibold text-gray-800">{data.author}</p>
                            <p className="text-sm text-gray-500">Yazar</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Etiketler</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Benzer Sorular */}
            <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Benzer Sorular</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockVideos
                        .filter((video) => video.id !== parseInt(id))
                        .map((video) => (
                            <div
                                key={video.id}
                                className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition cursor-pointer"
                                onClick={() => router.push(`/detail/${video.id}`)}
                            >
                                <h4 className="font-semibold text-gray-800">{video.title}</h4>
                                <p className="text-sm text-gray-500">{video.date}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}