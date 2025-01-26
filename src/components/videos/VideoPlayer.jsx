import React from 'react';
import {BASE_URL} from "@/util/Const";
import Link from "next/link";
import VideoPlayerPlaylistItems from "@/components/videos/VideoPlayerPlaylistItems";
import HttpClient from "@/util/HttpClient";


const VideoPlayer = async ({playlistId, videoId}) => {

    if (playlistId == null || playlistId === "" || playlistId === "undefined" || playlistId === "null") {
        playlistId = process.env.DEFAULT_PLAYLIST_ID;
    }

    // const videRes = await fetch(`${BASE_URL}/videos?playlistId=${playlistId}`, {
    //     next: {revalidate: 60},
    // });
    // const videos = await videRes.json();
    //
    // const playlistRes = await fetch(`${BASE_URL}/playlists/${playlistId}`, {
    //     next: {revalidate: 60},
    // });
    // const playlist = await playlistRes.json();




    const videRes = await HttpClient.get(`/videos?playlistId=${playlistId}`, {
        next: {revalidate: 60},
    });
    const videos = await videRes.json();

    const playlistRes = await HttpClient.get(`/playlists/${playlistId}`, {
        next: {revalidate: 60},
    });

    const playlist = await playlistRes.json();

    return (
        <div>
            <div style={{
                backgroundColor: "#1d1f2a",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px"
            }} className="w-full py-6 px-4 sm:px-8 ">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Video Player Section */}
                    <div className="lg:col-span-2">
                        <div style={{height: "500px"}} className="aspect-w-16 aspect-h-9 mb-4">
                            <iframe
                                className="w-full h-full rounded-lg"
                                src={`https://www.youtube.com/embed/${videos.find(video => video.videoId === videoId)?.videoId ?? videos[0]?.videoId}`}
                                title="Hz. Muhammed'in (asm) Hayatı"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <h2 className="text-white text-2xl font-semibold mb-2">
                            {videos.find(video => video.videoId === videoId)?.title ?? videos[0]?.title}
                        </h2>
                        <p className="text-gray-400">
                            {videos.find(video => video.videoId === videoId)?.title ?? videos[0]?.title}
                        </p>
                    </div>

                    {/* Related Videos Section */}
                    <div style={{maxHeight: "560px"}} className="border border-gray-600 rounded-lg overflow-hidden">
                        <h3 className="text-white text-xl bg-gray-600 p-4 font-semibold mb-4">{playlist.title}</h3>
                        <div className="space-y-4  max-h-[470px] overflow-y-auto px-3">
                          <VideoPlayerPlaylistItems playlistId={playlistId} videos={videos} videoId={videoId} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;