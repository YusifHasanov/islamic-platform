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
            image: "https://hayalhanem.com/wp-content/uploads/2024/10/Cemaat-Olmanin-Onemi.webp"
        },
        {
            title: "Cemaat Olmanın Önemi",
            description: "Cemaat Olmanın Önemi Efendimiz(s.a.v) meclislerle ilgili bir hadisinde şöyle buyuruyor...",
            date: "1 Ekim 2024",
            image: "https://hayalhanem.com/wp-content/uploads/2024/10/Aksam-Namazi-Tesbihati-Turkce-Okunusu.webp"
        },
        {
            title: "Cemaat Olmanın Önemi",
            description: "Cemaat Olmanın Önemi Efendimiz(s.a.v) meclislerle ilgili bir hadisinde şöyle buyuruyor...",
            date: "1 Ekim 2024",
            image: "https://hayalhanem.com/wp-content/uploads/2024/10/efendimiz-cenaze-namazi-kildirmismidir-.webp"
        },
        {
            title: "Cemaat Olmanın Önemi",
            description: "Cemaat Olmanın Önemi Efendimiz(s.a.v) meclislerle ilgili bir hadisinde şöyle buyuruyor...",
            date: "1 Ekim 2024",
            image: "https://hayalhanem.com/wp-content/uploads/2024/10/Uhud-Savasinin-Cikma-Sebebi-Nedir.webp"
        },
        {
            title: "Cemaat Olmanın Önemi",
            description: "Cemaat Olmanın Önemi Efendimiz(s.a.v) meclislerle ilgili bir hadisinde şöyle buyuruyor...",
            date: "1 Ekim 2024",
            image: "https://hayalhanem.com/wp-content/uploads/2024/10/Kuran-i-Kerimin-Kitap-Haline-Getirilmesi.webp"
        },
    ];

    return (
        <>
            <Header/>
            <div className="min-h-screen">
                <div className="px-12 mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">Son Eklenenler</h1>
                    <div className="flex flex-wrap lg:flex-nowrap gap-10">
                        {/* Makale Kartları */}
                        <div style={{gridTemplateRows: "repeat(2, 350px)"}}
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
                        <aside className="bg-white p-6 rounded-lg  lg:w-5/12 w-full">
                            <Search/>
                            <Categories/>
                            <PopularArticles/>
                        </aside>
                    </div>
                    <ArticleList/>
                </div>
            </div>
        </>
    );
}

const ArticleList = () => {
    return (
        <div className=" mx-auto py-8">
            <div className="grid grid-cols-2 gap-8 gap-x-12">
                {/* İman Column */}
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">İMAN</h2>
                    <OtherArticleCard
                        title="Efendimiz (s.a.v.) Boykot Döneminde Nasıl Sıkıntılar Çekmiştir?"
                        date="Ekim 1, 2024"
                        image="https://hayalhanem.com/wp-content/uploads/2024/10/Efendimizs.a.v.-Boykot-Doneminde-Nasil-Sikintilar-Cekmistir.webp"
                    />
                    <hr className="border-gray-300 mb-4"/>
                    <OtherArticleCard
                        title="Ebû Talip İmanlı mı Öldü? – Hz. Hatice’nin (r.a.) Vefatı"
                        date="Ekim 1, 2024"
                        image="https://hayalhanem.com/wp-content/uploads/2024/10/Efendimizs.a.v.-Boykot-Doneminde-Nasil-Sikintilar-Cekmistir.webp"
                    />
                    <hr className="border-gray-300 mb-4"/>
                    <OtherArticleCard
                        title="Efendimiz (s.a.v.) Taif’te Kimler Taşladı?"
                        date="Ekim 1, 2024"
                        image="https://hayalhanem.com/wp-content/uploads/2024/10/Efendimizs.a.v.-Boykot-Doneminde-Nasil-Sikintilar-Cekmistir.webp"
                    />
                    <hr className="border-gray-300 mb-4"/>
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

const OtherArticleCard = ({title, date, image}) => {
    return (
        <div className="flex space-x-4 mb-6">
            {/* Image */}
            <div className="w-1/3">
                <img src={image} alt={title} className="w-full h-24 rounded-lg object-cover"/>
            </div>
            {/* Text */}
            <div className="w-2/3">
                <h3 className="text-md font-semibold text-gray-800">{title}</h3>
                <p className="text-gray-500 text-sm mt-1">{date}</p>
            </div>
        </div>
    );
};


function ArticleCard({title, description, date, image}) {
    const router = useRouter()
    return (
        <div
            style={{boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.09)"}}
            className="bg-white rounded-md  overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
                onClick={() => router.push("/articles/" + title)}
                src={image} alt={title} className="w-full cursor-pointer  h-48 object-cover"/>
            <div className="p-4">
                <h2 onClick={() => router.push("/articles/" + title)}
                    className="text-lg cursor-pointer font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-2 text-sm">{description}</p>
                <p className="text-gray-400 mt-4 text-xs">{date}</p>
            </div>
        </div>
    );
}

function Search() {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Aranacak kelime..."/>
            <button type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="icon">
                    <path
                        d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                    </path>
                </svg>
            </button>
        </div>
    );
}

function Categories() {

    const arr = [
        {
            name: "Abrurrhman b. Avf"
        },
        {
            name: "Ebû Ubeyde b. Cerrâh"
        },
        {
            name: "Hz. Ali"
        },
        {
            name: "Hz. Ali"
        },
        {
            name: "Hz. Ali"
        },
        {
            name: "Hz. Ali"
        },
        {
            name: "Hz. Ali"
        },
        {
            name: "Hz. Ali"
        },
        {
            name: "Hz. Ali"
        }
    ]
    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b-4 border-yellow-500 pb-2">Kategoriler</h3>
            <ul className="space-y-1 categoriesList text-gray-700 font-medium">
                {
                    arr.map((item, index) => (
                        <li key={index} className={"hover:text-yellow-600 px-1 py-0.5 transition-colors cursor-pointer"}>
                            {item.name}
                        </li>
                    ))
                }
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
                             className="w-16 h-16 object-cover rounded-lg"/>
                        <div>
                            <h4 className="text-sm   font-semibold text-gray-700">{item.title}</h4>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}


