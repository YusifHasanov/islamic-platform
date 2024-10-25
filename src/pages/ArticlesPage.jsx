import Header from "@/components/articles/Header";
import React from "react";

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

                    {/* Yeni Kategorilere Göre Makaleler Section */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Kategorilere Göre Makaleler</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {categories.map((category, index) => (
                                <CategorySection
                                    key={index}
                                    title={category.title}
                                    articles={category.articles}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function ArticleCard({ title, description, date, image }) {
    return (
        <div style={{ maxHeight: "400px" }}
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
                            <h4 className="text-sm  font-semibold text-gray-700">{item.title}</h4>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}