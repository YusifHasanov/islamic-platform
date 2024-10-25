import React from 'react';

const PlaylistsSection = () => {
    const playlists = [
        {
            image: 'https://i.ytimg.com/vi/Py-4LPSqym0/mqdefault.jpg',
            title: 'Katkı Özel',
            videoCount: '1 Video',
        },
        {
            image: 'https://i.ytimg.com/vi/Py-4LPSqym0/mqdefault.jpg',
            title: 'İşaratü\'l İ\'caz',
            videoCount: '3 Video',
        },
        {
            image: 'https://i.ytimg.com/vi/Py-4LPSqym0/mqdefault.jpg',
            title: 'Hayalhanem - Sağlık',
            videoCount: '7 Video',
        },
        {
            image: 'https://i.ytimg.com/vi/Py-4LPSqym0/mqdefault.jpg',
            title: 'Kur\'an-ı Kerim - Hatm-i Şerif (114 Sure)',
            videoCount: '25 Video',
        },
        {
            image: 'https://i.ytimg.com/vi/Py-4LPSqym0/mqdefault.jpg',
            title: 'Hz. Muhammed\'in (sav) Hayatı',
            videoCount: '20 Video',
        },
        {
            image: 'https://i.ytimg.com/vi/Py-4LPSqym0/mqdefault.jpg',
            title: 'Fatih Ünal',
            videoCount: '3 Video',
        },
        {
            image: 'https://i.ytimg.com/vi/Py-4LPSqym0/mqdefault.jpg',
            title: 'Fatih Atmaca',
            videoCount: '3 Video',
        },
        {
            image: 'https://i.ytimg.com/vi/Py-4LPSqym0/mqdefault.jpg',
            title: 'İrfan Aykut',
            videoCount: '5 Video',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="py-3 mx-auto px-7">
                {/* Buttons Section */}
                <div className="flex justify-center space-x-4 mb-8">
                    <button className="bg-gray-700 text-white py-2 px-4 rounded-full">Oynatma Listeleri</button>
                    <button className="bg-gray-700 text-white py-2 px-4 rounded-full">Son Yüklenenler</button>
                </div>

                {/* Playlists Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {playlists.map((playlist, index) => (
                        <div key={index} className="bg-white hover:scale-105 transition rounded-lg shadow-md p-4">
                            <img
                                src={playlist.image}
                                alt={playlist.title}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-lg font-semibold">{playlist.title}</h3>
                            <p className="text-gray-500">{playlist.videoCount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlaylistsSection;