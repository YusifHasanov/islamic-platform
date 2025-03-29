import React from 'react';
import {BASE_URL} from "@/util/Const";
import VideoPlayerPlaylistItems from "@/components/videos/VideoPlayerPlaylistItems";

export const revalidate = 60;

const VideoPlayer = async ({playlistId, search, videoId, content, page}) => {
    // Geçerliliği kontrol eden yardımcı fonksiyon
    const isValid = (prop) => prop != null && prop !== "undefined" && prop !== "null";

    let selectedVideo, videos, playlist

    // Eğer playlistId sağlanmamışsa, videoId varsa ilgili playlisti bul; yoksa varsayılanı kullan.
    if (!isValid(playlistId)) {
        if (!isValid(videoId)) {
            const latestVideoRes = await fetch(`${BASE_URL}/videos/latest`, {
                next: {revalidate: 60}
            });

            selectedVideo = await latestVideoRes.json();
            videoId = selectedVideo.videoId;
        }

        // if (isValid(videoId)) {
        const findPlaylistResponse = await fetch(`${BASE_URL}/playlists/of-video/${videoId}`, {
            next: {revalidate: 60}
        });
        const findPlaylist = await findPlaylistResponse.json();
        playlistId = findPlaylist?.playlistId ?? process.env.DEFAULT_PLAYLIST_ID;
        // } else {
        //     playlistId = process.env.DEFAULT_PLAYLIST_ID;
        // }
    }

    // Playlist ve videoları paralel şekilde çek
    const [playlistRes, videosRes] = await Promise.all([
        fetch(`${BASE_URL}/playlists/${playlistId}`, {next: {revalidate: 60}}),
        fetch(`${BASE_URL}/videos?playlistId=${playlistId}`, {next: {revalidate: 60}})
    ]);
    playlist = await playlistRes.json();
    videos = await videosRes.json();

    // videoId geçerli ise, ayrı fetch ile seçilen videoyu getir; aksi halde playlist içerisinden seç.

    if (selectedVideo == null) {
        if (isValid(videoId) && isValid(playlistId)) {
            const selectedVideoResponse = await fetch(`${BASE_URL}/videos/${videoId}`, {
                next: {revalidate: 60}
            });
            selectedVideo = await selectedVideoResponse.json();
        } else {
            selectedVideo = videos.find(v => v.playlistId === playlistId) ?? videos[0];
        }
    }

    return (
        <div>
            <div
                style={{
                    backgroundColor: "#1d1f2a",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px"
                }}
                className="w-full py-6 px-4 sm:px-8"
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Ana Video Oynatıcı Bölümü */}
                    <div className="lg:col-span-2">
                        <div style={{height: "500px"}} className="aspect-w-16 aspect-h-9 mb-4">
                            <iframe
                                className="w-full h-full rounded-lg"
                                src={`https://www.youtube.com/embed/${selectedVideo?.videoId}`}
                                title={selectedVideo?.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <h2 className="text-white text-2xl font-semibold mb-2">
                            {selectedVideo?.title}
                        </h2>
                        <p className="text-gray-400">{selectedVideo?.title}</p>
                    </div>

                    {/* İlgili Videolar Bölümü */}
                    <div style={{maxHeight: "560px"}} className="border border-gray-600 rounded-lg overflow-hidden">
                        <h3 className="text-white text-xl bg-gray-600 p-4 font-semibold mb-4">
                            {playlist?.title}
                        </h3>
                        <div className="space-y-4 max-h-[470px] overflow-y-auto px-3">
                            <VideoPlayerPlaylistItems
                                playlistId={playlistId}
                                videos={videos}
                                page={page}
                                searchParams={search}
                                content={content}
                                videoId={selectedVideo?.videoId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
