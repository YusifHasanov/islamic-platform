import React from 'react';

// Reusable Card Component
const MostReadCard = ({ image, title, date }) => {
    return (
        <div className="flex items-center space-x-4 mb-8">
            <img src={image} alt={title} className="w-40 h-24 object-cover rounded-lg" />
            <div>
                <h3 className="text-md font-medium text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500">{date}</p>
            </div>
        </div>
    );
};

// Main Component
const MostReadArticles = () => {
    const mostReadData = [
        {
            image: 'https://hayalhanem.com/wp-content/uploads/2024/10/Cemaat-Olmanin-Onemi.webp',
            title: 'Cemaat Olmanın Önemi',
            date: 'Ekim 1, 2024',
        },
        {
            image: 'https://hayalhanem.com/wp-content/uploads/2024/10/Cemaat-Olmanin-Onemi.webp',
            title: 'Yatsı Namazı Tesbihatı Arapça Okunuş',
            date: 'Ekim 1, 2024',
        },
        {
            image: 'https://hayalhanem.com/wp-content/uploads/2024/10/Cemaat-Olmanin-Onemi.webp',
            title: 'Yatsı Namazı Tesbihatı Türkçe Anlamı',
            date: 'Ekim 1, 2024',
        },
        {
            image: 'https://hayalhanem.com/wp-content/uploads/2024/10/Cemaat-Olmanin-Onemi.webp',
            title: 'Akşam Namazı Tesbihatı Türkçe Okunuşu',
            date: 'Ekim 1, 2024',
        },
    ];

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">EN ÇOK OKUNANLAR</h2>
            <div className="space-y-6">
                {mostReadData.map((item, index) => (
                    <React.Fragment key={index}>
                        <MostReadCard image={item.image} title={item.title} date={item.date} />
                        {index !== mostReadData.length - 1 && <hr className="border-gray-300" />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default MostReadArticles;