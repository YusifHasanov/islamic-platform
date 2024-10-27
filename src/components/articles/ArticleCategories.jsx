import React from 'react';

const ArticleCategories = () => {

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
            <h3
                style={{lineHeight: "1"}}
                className="text-lg  mb-5 text-gray-800 border-l-4 pl-4 border-yellow-500 ">Kategoriler</h3>
            <ul className="space-y-1 categoriesList text-gray-700 font-medium">
                {
                    arr.map((item, index) => (
                        <li key={index}
                            className={"hover:text-yellow-600 px-1 py-0.5 transition-colors cursor-pointer"}>
                            {item.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ArticleCategories;

