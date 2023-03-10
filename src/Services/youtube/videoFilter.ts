import { getAllVideos } from "./data";



export async function getAllFilteredVideos() {
    const videos = await getAllVideos()
    let filteredVideos: any = []
    videos.map((item: any) => {
        let video = {
            id: item.id, 
            publishedAt: item.snippet.publishedAt,
            thumbnail: item.snippet.thumbnails?.high?.url ? item.snippet.thumbnails?.high?.url : "",
            title: item.snippet.title,
            playlistId: item.playlistId,
        }
        filteredVideos.push(video)
    })
    return filteredVideos
}