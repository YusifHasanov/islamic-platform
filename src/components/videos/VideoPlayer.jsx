import React from 'react';
import { BASE_URL } from "@/util/Const";
import VideoPlayerPlaylistItems from "@/components/videos/VideoPlayerPlaylistItems";

export const revalidate = 60;

const VideoPlayer = async ({ playlistId, videoId }) => {

    // Yalnız videoId verilmişsə, playlistId tapılır
    if ( videoId) {
    // if ((!playlistId || playlistId === "undefined" || playlistId === "null") && videoId) {
      console.log("birinci ifff")
        const playlistRes = await fetch(`${BASE_URL}/playlists/of-video/${videoId}`, {
            next: { revalidate: 60 }
        });
        const playlist = await playlistRes.json();
        playlistId = playlist?.playlistId ?? process.env.DEFAULT_PLAYLIST_ID;
    }

    // Əgər playlistId yenə də yoxdursa (nə videoId, nə də playlistId gəlibsə), default dəyəri ver
    if (!playlistId || playlistId === "undefined" || playlistId === "null") {
        console.log("ikinci ifff")
        playlistId = process.env.DEFAULT_PLAYLIST_ID;
    }

    // Playlist videolarını çək
    const videRes = await fetch(`${BASE_URL}/videos?playlistId=${playlistId}`, {
        next: { revalidate: 60 },
    });
    const videos = await videRes.json();

    // Playlist məlumatını çək
    const playlistRes = await fetch(`${BASE_URL}/playlists/${playlistId}`, {
        next: { revalidate: 60 },
    });
    const playlist = await playlistRes.json();

    const selectedVideo = videos.find(v => v.videoId === videoId) ?? videos[0];

    return (
        <div>
            <div style={{
                backgroundColor: "#1d1f2a",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px"
            }} className="w-full py-6 px-4 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Video Player Section */}
                    <div className="lg:col-span-2">
                        <div style={{ height: "500px" }} className="aspect-w-16 aspect-h-9 mb-4">
                            <iframe
                                className="w-full h-full rounded-lg"
                                src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                                title={selectedVideo.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <h2 className="text-white text-2xl font-semibold mb-2">
                            {selectedVideo.title}
                        </h2>
                        <p className="text-gray-400">{selectedVideo.title}</p>
                    </div>

                    {/* Related Videos Section */}
                    <div style={{ maxHeight: "560px" }} className="border border-gray-600 rounded-lg overflow-hidden">
                        <h3 className="text-white text-xl bg-gray-600 p-4 font-semibold mb-4">{playlist.title}</h3>
                        <div className="space-y-4 max-h-[470px] overflow-y-auto px-3">
                            <VideoPlayerPlaylistItems
                                playlistId={playlistId}
                                videos={videos}
                                videoId={selectedVideo.videoId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
