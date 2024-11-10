import React from 'react';
import {BASE_URL} from "@/util/Const";
import Link from "next/link";

export const revalidate = 60;

const PlaylistsSection = async ({playlistId}) => {
    const res = await fetch(`${BASE_URL}/playlists`, {
        next: { revalidate: 60 },
    });
    const playlists = await res.json();

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="py-3 mx-auto px-7">
                {/* Buttons Section */}
                {/*<div className="flex justify-center space-x-4 mb-8">*/}
                {/*    <button className="bg-gray-700 text-white py-2 px-4 rounded-full">Oynatma Listeleri</button>*/}
                {/*    <button className="bg-gray-700 text-white py-2 px-4 rounded-full">Son Yüklenenler</button>*/}
                {/*</div>*/}
                <div className="flex justify-center space-x-4 mb-8">
                    <button className="bg-gray-700 text-white py-2 px-4 rounded-full">Playlistlər</button>
                </div>

                {/* Playlists Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {playlists.map((playlist, index) => (
                        <Link href={`/videos?playlistId=${playlist.playlistId}`}
                            key={playlist.playlistId}
                            className="bg-white playlistCard cursor-pointer rounded-2xl overflow-hidden  shadow-sm">
                            <img
                                src={playlist.thumbnail.split("+")[2]}
                                alt={playlist.title}
                                className="w-full h-50 object-cover mb-1"
                            />
                            <div className="px-4 min-h-20 flex flex-col justify-between pb-1">
                                <h3 className="text-lg font-semibold">{playlist.title}</h3>
                                <p className="text-gray-500 text-center">{playlist.videoCount} Video</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlaylistsSection;