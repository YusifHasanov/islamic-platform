import React from 'react';
import {BASE_URL} from "@/util/Const";
import Link from "next/link";
import Pagination from "@/components/common/Pagination";

export const revalidate = 60;

const LIMIT = 12;

const VideosGrid = async ({searchParams, playlistId, search, videoId, page}) => {

    const clientPage = parseInt(page, 10) || 1;
    const backendPage = clientPage - 1;

    const res = await fetch(`${BASE_URL}/videos?page=${backendPage}&size=${LIMIT}`, {
        next: {revalidate: 60}
    });

    const data = await res.json();

    let videos = data.content ?? data;
    const totalPages = data.page.totalPages ?? 1;

    if (search && search !== '') {
        videos = videos?.filter(x => x.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (playlistId) {
        videos = videos?.sort((a, b) =>
            a.videoId === videoId ? -1 : b.videoId === videoId ? 1 : 0
        );
    }

    const isCurrentVideo = (id) => videoId === id ? "bg-slate-200" : "";

    const buildPageLink = (newPage, dynamicVideoId) => {
        const params = new URLSearchParams();
        params.set('page', newPage);

        if (dynamicVideoId) {
            params.set('videoId', dynamicVideoId);
        } else if (videoId) {
            params.set('videoId', videoId);
        }

        if (search) {
            params.set('search', search);
        }
        if (playlistId) {
            params.set('playlistId', playlistId);
        }
        return `?${params.toString()}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="py-3 mx-auto px-7">
                {
                    videos?.length === 0 ? <NoAnyVideo/> :
                        <>
                            <div className="grid grid-cols-1 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {videos?.map((video) => (
                                    <Link href={buildPageLink(clientPage, video.videoId)} key={video.videoId}
                                          className="bg-white playlistCard cursor-pointer rounded-2xl overflow-hidden shadow-sm">
                                        <img
                                            src={video.thumbnail.split("+")[2] ?? video.thumbnail.split("+")[1] ?? video.thumbnail.split("+")[0]}
                                            alt={video.title}
                                            className="w-full object-cover"
                                        />
                                        <div
                                            className={`px-4 pt-1 min-h-20 flex flex-col justify-between pb-1 ${isCurrentVideo(video.videoId)}`}>
                                            <h3 className="text-lg font-semibold">{video.title}</h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {/* Pagination */}
                            <Pagination clientPage={clientPage} totalPages={totalPages} buildPageLink={buildPageLink}/>
                        </>
                }
            </div>
        </div>
    );
};

export default VideosGrid;

const NoAnyVideo = () => (
    <div className="mt-24 items-center justify-center bg-gray-100">
        <div className="text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2}
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 className="mt-4 text-2xl font-semibold text-gray-700">Heç bir video tapılmadı</h2>
            <p className="mt-2 text-gray-500">Axtarışa uyğun bir nəticə tapılmadı</p>
        </div>
    </div>
);
