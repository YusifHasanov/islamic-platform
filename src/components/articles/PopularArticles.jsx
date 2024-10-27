import React from 'react';

const PopularArticles = () => {
    const arr = [
        {
            img: "https://hayalhanem.com/wp-content/uploads/2024/10/Cemaat-Olmanin-Onemi.webp",
            title: "Cemaat Olmanın Önemi"
        },
        {
            img: "https://hayalhanem.com/wp-content/uploads/2024/10/Uhud-Savasinin-Cikma-Sebebi-Nedir.webp",
            title: "Uhud Savaşı’nın Çıkma Sebebi Nedir"
        },
        {
            img: "https://hayalhanem.com/wp-content/uploads/2024/10/Resulullah-sav-Vefati.webp",
            title: "Resulullah’ın (s.a.v.) Vefatı"
        },
        {
            img: "https://hayalhanem.com/wp-content/uploads/2024/10/efendimiz-cenaze-namazi-kildirmismidir-.webp",
            title: "Müslümanın Borcu Olur mu? – Efendimiz(s.a.v.)  Borcu Olan Müslümanın Cenaze Namazını Kıldırmamış mıdır?"
        },
    ];
    return (
        <div>
            <h3
                style={{lineHeight: "1"}}
                className="text-lg  mb-6 text-gray-800 border-l-4 pl-4 border-yellow-500 ">En Çok Okunanlar</h3>

            <ul className="space-y-6">
                {arr.map((item, id) => (
                    <li key={id} className="flex items-center space-x-4">
                        <img src={item.img} alt="Cemaat Olmanın Önemi"
                             className="w-24 cursor-pointer h-14 object-cover rounded-md"/>
                        <div>
                            <h4 style={{fontSize: "13px"}}
                                className="text-sm cursor-pointer transition hover:text-[#fcb900]  font-normal text-gray-700">{item.title}</h4>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopularArticles;

