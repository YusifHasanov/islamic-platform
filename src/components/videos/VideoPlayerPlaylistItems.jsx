'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {getBestThumbnailUrl} from "@/util/Thumbnail";

const VideoPlayerPlaylistItems = ({playlistId, videos, searchParams, videoId, content, page}) => {
    const [search, setSearch] = useState('');
    const [filteredVideos, setFilteredVideos] = useState(videos);

    useEffect(() => {
        setFilteredVideos(
            search.toLowerCase().trim() === ''
                ? videos
                : videos.filter(x => x.title.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search, videos]);


    const buildPageLink = (dynamicVideoId) => {
        const params = new URLSearchParams();
        if (page) {
            params.set('page', page);
        }

        if (dynamicVideoId) {
            params.set('videoId', dynamicVideoId);
        } else if (videoId) {
            params.set('videoId', videoId);
        }

        if (content) {
            params.set('content', content);
        }
        if (searchParams) {
            params.set('search', searchParams);
        }
        if (playlistId) {
            params.set('playlistId', playlistId);
        }
        return `?${params.toString()}`;
    };


    return (
        <div className="p-2 bg-gray-900 text-white rounded-lg">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search videos..."
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                    className="w-full px-2 py-1 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="space-y-2">
                {filteredVideos.map((video, id) => (
                    <Link
                        scroll={false}
                        href={buildPageLink(video.videoId)}
                        key={id}
                        className={`flex videosItem items-center space-x-4 p-2 rounded-lg hover:bg-gray-700 ${(videoId == null && id === 0) || video.videoId === videoId ? "bg-gray-800" : ""}`}>
                        {/*<Image*/}
                        {/*    loading={"lazy"}*/}
                        {/*    src={video.thumbnail.split("+")[2]}*/}
                        {/*    alt={video.title}*/}
                        {/*    height={20}*/}
                        {/*    width={200}*/}
                        {/*    className="w-28 h-20 object-cover rounded-lg"*/}
                        {/*/>*/}
                        <img
                            src={getBestThumbnailUrl(video.thumbnail)}
                            alt={video.title}
                            className="w-28 object-cover "
                        />
                        <div>
                            <h4 className="text-white text-md font-medium">
                                {video.title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default VideoPlayerPlaylistItems;
