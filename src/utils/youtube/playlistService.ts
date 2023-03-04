import { getYoutubePlaylists } from "./youtubePlaylists";
import { playlistRepo } from "../Services/Repositories";
export async function playlistService(dbData: any[]) {

    let videos: any[] = [];
    try {
        videos = await getYoutubePlaylists();
    } catch (error: any) {
        throw new Error(error);
    }
    let dbDataCopy = JSON.parse(JSON.stringify(dbData));
    let newPlaylists: any[] = [];
    let oldPlayliists: any[] = [];
    let updateVideos: any[] = [];
    if (videos.length > 0) {
        videos.forEach(video => {
            if (!dbDataCopy.find((dbVideo: any) => dbVideo.playlistId === video.playlistId)) {
                newPlaylists.push(video);
            }
        })
        dbDataCopy.forEach((dbVideo: any) => {
            if (!videos.find(video => video.playlistId === dbVideo.playlistId)) {
                oldPlayliists.push(dbVideo);
            }
        })
        videos.forEach(video => {
            if (video.thumbnail !== "") {
                let findedData = dbDataCopy.find((dbVideo: any) => dbVideo.playlistId === video.playlistId);
                if (findedData && (findedData.title !== video.title || findedData.thumbnail !== video.thumbnail)) {
                    updateVideos.push(video);
                }
            }
        })
    }
    oldPlayliists.forEach(video => {

        playlistRepo.delete(video._id);
    })

    newPlaylists.forEach(video => {
        playlistRepo.create(video);
    })

    updateVideos.forEach(video => {
        playlistRepo.update(video._id, video);
    });

}


