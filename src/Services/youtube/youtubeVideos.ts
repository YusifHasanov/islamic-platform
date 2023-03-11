import { getAllPagesOfPlaylistItems } from "./data";
import { getYoutubePlaylists } from "./youtubePlaylists";


export async function getYoutubeVideos() {
    let videos: any[] = [];
    try {
        const playlist = await getYoutubePlaylists();

        let a = playlist.map(async (element) => {
            let returnData: any[] = [];
            const playlistItems = await getAllPagesOfPlaylistItems(element.playlistId);
            playlistItems.forEach((item) => {

                let video = {
                    videoId: item.snippet.resourceId.videoId,
                    publishedAt: item.snippet.publishedAt,
                    thumbnail: item.snippet.thumbnails?.high?.url ? item.snippet.thumbnails?.high?.url : "",
                    title: item.snippet.title,
                    playlistId: element.playlistId,

                }
                returnData.push(video);
            });
            return returnData;
        });
        let b = await Promise.all(a);
        b.forEach((item) => {
            item.forEach((video) => {
                videos.push(video);
            })
        })

    } catch (error: any) {
        throw new Error(error);
    }

    return videos;
}



