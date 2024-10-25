'use client'
import Header from "@/components/articles/Header";
import React from "react";
import {useRouter} from "next/navigation";

// background-image: linear-gradient(0deg, rgba(0, 0, 0, .35), transparent 75%);

export default function ArticlesPage() {

    const arr = [
        {
            title: "Cemaat Olmanın Önemi",
            description: "Cemaat Olmanın Önemi Efendimiz(s.a.v) meclislerle ilgili bir hadisinde şöyle buyuruyor...",
            date: "1 Ekim 2024",
            image: "https://hayalhanem.com/wp-content/uploads/2024/10/Resulullah-sav-Vefati.webp"
        },
        {
            title: "Cemaat Olmanın Önemi",
            description: "Cemaat Olmanın Önemi Efendimiz(s.a.v) meclislerle ilgili bir hadisinde şöyle buyuruyor...",
            date: "1 Ekim 2024",
            image: "https://hayalhanem.com/wp-content/uploads/2024/10/Resulullah-sav-Vefati.webp"
        },
        {
            title: "Cemaat Olmanın Önemi",
            description: "Cemaat Olmanın Önemi Efendimiz(s.a.v) meclislerle ilgili bir hadisinde şöyle buyuruyor...",
            date: "1 Ekim 2024",
            image: "https://hayalhanem.com/wp-content/uploads/2024/10/Resulullah-sav-Vefati.webp"
        },
        {
            title: "Cemaat Olmanın Önemi",
            description: "Cemaat Olmanın Önemi Efendimiz(s.a.v) meclislerle ilgili bir hadisinde şöyle buyuruyor...",
            date: "1 Ekim 2024",
            image: "https://hayalhanem.com/wp-content/uploads/2024/10/Resulullah-sav-Vefati.webp"
        },
    ];

    const categories = [
        {
            title: "İman",
            articles: [
                {
                    title: "Hudeybiye Barış Antlaşması",
                    date: "Ekim 1, 2024",
                    image: "https://hayalhanem.com/wp-content/uploads/2024/10/Resulullah-sav-Vefati.webp"
                },
                {
                    title: "Tebük Seferi",
                    date: "Ekim 1, 2024",
                    image: "https://hayalhanem.com/wp-content/uploads/2024/10/Resulullah-sav-Vefati.webp"
                },
                {
                    title: "Müslümanın Borcu Olur mu?",
                    date: "Ekim 1, 2024",
                    image: "https://hayalhanem.com/wp-content/uploads/2024/10/Resulullah-sav-Vefati.webp"
                },
                {
                    title: "Resulullah’ın (s.a.v.) Vefatı",
                    date: "Ekim 1, 2024",
                    image: "https://hayalhanem.com/wp-content/uploads/2024/10/Resulullah-sav-Vefati.webp"
                }
            ]
        },
        {
            title: "Fıkıh",
            articles: [
                {
                    title: "Müslümanın Borcu Olur mu? – Cenaze Namazı",
                    date: "Ekim 1, 2024",
                    image: "https://hayalhanem.com/wp-content/uploads/2024/10/Resulullah-sav-Vefati.webp"
                }
            ]
        },
        {
            title: "Sahabeler",
            articles: [
                {
                    title: "Bedir Savaşı’nda sahabeler hangi yakınları ile karşı karşıya gelmiştir?",
                    date: "Ekim 1, 2024",
                    image: "https://hayalhanem.com/wp-content/uploads/2024/10/Resulullah-sav-Vefati.webp"
                }
            ]
        },
        {
            title: "Tesbihatlar",
            articles: [
                {
                    title: "Yatsı Namazı Tesbihatı Türkçe Okunuşu",
                    date: "Ekim 1, 2024",
                    image: "https://hayalhanem.com/wp-content/uploads/2024/10/Resulullah-sav-Vefati.webp"
                }
            ]
        }
    ];

    return (
        <>
            <Header />
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">Son Eklenenler</h1>
                    <div className="flex flex-wrap lg:flex-nowrap gap-10">
                        {/* Makale Kartları */}
                        <div style={{gridTemplateRows: "400px 1fr"}}
                             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                arr.map((item, id) => (
                                    <ArticleCard
                                        key={id}
                                        title={item.title}
                                        description={item.description}
                                        image={item.image}
                                        date={item.date}
                                    />
                                ))
                            }
                        </div>

                        {/* Sağ Sidebar (Kategoriler ve En Çok Okunanlar) */}
                        <aside className="bg-white p-6 rounded-lg shadow-lg lg:w-5/12 w-full">
                            <Search />
                            <Categories />
                            <PopularArticles />
                        </aside>
                    </div>
                    <ArticleList/>
                </div>
            </div>
        </>
    );
}

function ArticleCard({ title, description, date, image }) {
    const router = useRouter()
    return (
        <div
            onClick={()=>router.push("/articles/" + title)}
            style={{ maxHeight: "400px" }}
             className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-2 text-sm">{description}</p>
                <p className="text-gray-400 mt-4 text-xs">{date}</p>
            </div>
        </div>
    );
}

function CategorySection({ title, articles }) {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <ul className="space-y-4">
                {articles.map((article, index) => (
                    <li key={index} className="flex items-center space-x-4">
                        <img src={article.image} alt={article.title} className="w-24 h-24 object-cover rounded-lg" />
                        <div>
                            <h4 className="text-lg font-semibold">{article.title}</h4>
                            <p className="text-sm text-gray-500">{article.date}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Search() {
    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="Aranacak kelime..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
        </div>
    );
}

function Categories() {
    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b-4 border-yellow-500 pb-2">Kategoriler</h3>
            <ul className="space-y-3 text-gray-700 font-medium">
                <li className="hover:text-yellow-600 transition-colors cursor-pointer">Abrurrhman b. Avf</li>
                <li className="hover:text-yellow-600 transition-colors cursor-pointer">Ebû Ubeyde b. Cerrâh</li>
                <li className="hover:text-yellow-600 transition-colors cursor-pointer">Hz. Ali</li>
                <li className="hover:text-yellow-600 transition-colors cursor-pointer">Hz. Ebû Bekir</li>
                <li className="hover:text-yellow-600 transition-colors cursor-pointer">Hz. Ömer</li>
                <li className="hover:text-yellow-600 transition-colors cursor-pointer">Hz. Osman</li>
                <li className="hover:text-yellow-600 transition-colors cursor-pointer">İman</li>
                <li className="hover:text-yellow-600 transition-colors cursor-pointer">Namaz Tesbihatları</li>
                <li className="hover:text-yellow-600 transition-colors cursor-pointer">Sa’d b. Ebi Vakkas</li>
                <li className="hover:text-yellow-600 transition-colors cursor-pointer">Saîd bin Zeyd</li>
                <li className="hover:text-yellow-600 transition-colors cursor-pointer">Talha b. Ubeydullah</li>
                <li className="hover:text-yellow-600 transition-colors cursor-pointer">Zübeyr b. Avvam</li>
            </ul>
        </div>
    );
}

function PopularArticles() {
    const arr = [
        {
            img: "https://hayalhanem.com/wp-content/uploads/2024/10/Cemaat-Olmanin-Onemi.webp",
            title: "Cemaat Olmanın Önemi"
        },
        {
            img: "https://hayalhanem.com/wp-content/uploads/2024/10/Cemaat-Olmanin-Onemi.webp",
            title: "Cemaat Olmanın Önemi"
        },
        {
            img: "https://hayalhanem.com/wp-content/uploads/2024/10/Cemaat-Olmanin-Onemi.webp",
            title: "Cemaat Olmanın Önemi"
        },
        {
            img: "https://hayalhanem.com/wp-content/uploads/2024/10/Cemaat-Olmanin-Onemi.webp",
            title: "Cemaat Olmanın Önemi"
        },
    ];
    return (
        <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b-4 border-yellow-500 pb-2">En Çok Okunanlar</h3>
            <ul className="space-y-6">
                {arr.map((item, id) => (
                    <li key={id} className="flex items-center space-x-4">
                        <img src={item.img} alt="Cemaat Olmanın Önemi"
                             className="w-16 h-16 object-cover rounded-lg" />
                        <div>
                            <h4 className="text-sm   font-semibold text-gray-700">{item.title}</h4>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const OtherArticleCard = ({ title, date, image }) => {
    return (
        <div className="flex space-x-4 mb-6">
            {/* Image */}
            <div className="w-1/3">
                <img src={image} alt={title} className="w-full h-24 rounded-lg object-cover" />
            </div>
            {/* Text */}
            <div className="w-2/3">
                <h3 className="text-md font-semibold text-gray-800">{title}</h3>
                <p className="text-gray-500 text-sm mt-1">{date}</p>
            </div>
        </div>
    );
};

const ArticleList = () => {
    return (
        <div className=" mx-auto py-8">
            <div className="grid grid-cols-2 gap-8 gap-x-12">
                {/* İman Column */}
                <div  >
                    <h2 className="text-xl font-bold text-gray-800 mb-4">İMAN</h2>
                    <OtherArticleCard
                        title="Efendimiz (s.a.v.) Boykot Döneminde Nasıl Sıkıntılar Çekmiştir?"
                        date="Ekim 1, 2024"
                        image="https://hayalhanem.com/wp-content/uploads/2024/10/Efendimizs.a.v.-Boykot-Doneminde-Nasil-Sikintilar-Cekmistir.webp"
                    />
                    <hr className="border-gray-300 mb-4" />
                    <OtherArticleCard
                        title="Ebû Talip İmanlı mı Öldü? – Hz. Hatice’nin (r.a.) Vefatı"
                        date="Ekim 1, 2024"
                        image="https://hayalhanem.com/wp-content/uploads/2024/10/Efendimizs.a.v.-Boykot-Doneminde-Nasil-Sikintilar-Cekmistir.webp"
                    />
                    <hr className="border-gray-300 mb-4" />
                    <OtherArticleCard
                        title="Efendimiz (s.a.v.) Taif’te Kimler Taşladı?"
                        date="Ekim 1, 2024"
                        image="https://hayalhanem.com/wp-content/uploads/2024/10/Efendimizs.a.v.-Boykot-Doneminde-Nasil-Sikintilar-Cekmistir.webp"
                    />
                    <hr className="border-gray-300 mb-4" />
                    <OtherArticleCard
                        title="Efendimiz (s.a.v.) Hayatı Boyunca Ne Sıkıntılar Yaşamıştır?"
                        date="Ekim 1, 2024"
                        image="https://hayalhanem.com/wp-content/uploads/2024/10/Efendimizs.a.v.-Boykot-Doneminde-Nasil-Sikintilar-Cekmistir.webp"
                    />
                </div>

                {/* Fıkıh Column */}
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">FIKIH</h2>
                    <OtherArticleCard
                        title="Müslümanın Borcu Olur mu? – Efendimiz (s.a.v.) Borcu Olan Müslümanın Cenaze Namazını Kıldırmamış mıdır?"
                        date="Ekim 1, 2024"
                        image="https://hayalhanem.com/wp-content/uploads/2024/10/efendimiz-cenaze-namazi-kildirmismidir-.webp"
                    />
                </div>
            </div>
        </div>
    );
};
