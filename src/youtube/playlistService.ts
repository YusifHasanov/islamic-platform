import { getYoutubePlaylists } from "./youtubePlaylists";
import { playlistRepo } from "../Services/Repositories";
import { Playlist } from "@prisma/client";

export async function playlistService(dbData: any[]) {

    let videos: Playlist[] = [];
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
            if (!dbDataCopy.find((dbVideo: Playlist) => dbVideo.playlistId === video.playlistId)) {
                newPlaylists.push(video);
                add(video);
            }
        })
        dbDataCopy.forEach((dbVideo: Playlist) => {
            if (!videos.find(video => video.playlistId === dbVideo.playlistId)) {
                oldPlayliists.push(dbVideo);
                remove(dbVideo);
            }
        })
        videos.forEach(video => {
            if (video.thumbnail !== "") {
                let findedData = dbDataCopy.find((dbVideo: Playlist) => dbVideo.playlistId === video.playlistId);

                if (findedData && (findedData.title !== video.title || findedData.thumbnail !== video.thumbnail || findedData.publishedAt !== video.publishedAt)) {
                    updateVideos.push(video);
                    update(video);
                }
            }
        })

    }
 

    async function remove(video: Playlist) {
        await playlistRepo.delete(video.playlistId);
    }
    async function add(video: Playlist) {
        await playlistRepo.create(video);
    }

    async function update(video: Playlist) {
        await playlistRepo.update(video.playlistId, video);
    }

}


