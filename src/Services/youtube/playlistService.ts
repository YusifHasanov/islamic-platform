import { getYoutubePlaylists } from "./youtubePlaylists";
import { playlistRepo } from "../Repositories";
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
    let dublikate: any[] = [];

    if (videos.length > 0) {


        for (const video of videos) {
            if (!dbDataCopy.find((dbVideo: any) => dbVideo.playlistId === video.playlistId)) {
                newPlaylists.push(video);
                await createWithRetry(video);
            }
        }
        for (const dbVideo of dbDataCopy) {
            if (!videos.find((video: any) => video.playlistId === dbVideo.playlistId)) {
                oldPlayliists.push(dbVideo);
                await removeWithRetry(dbVideo);
            }
        }
        //find dublikate
        for (const video of videos) {
            if (video.thumbnail !== "") {
                const findedData = dbDataCopy.find((dbVideo: any) => dbVideo.playlistId === video.playlistId);
                if (findedData && (findedData.title === video.title && findedData.thumbnail === video.thumbnail)) {
                    dublikate.push(video);
                    await removeDublicatesWithRetry(video);
                }
            }



            for (const video of videos) {
                if (video.thumbnail !== "") {
                    const findedData = dbDataCopy.find((dbVideo: any) => dbVideo.playlistId === video.playlistId);
                    if (findedData && (findedData.title !== video.title || findedData.thumbnail !== video.thumbnail)) {
                        updateVideos.push(video);
                        await updateWithRetry(video);
                    }
                }
            }


        }

        console.log("newPlaylists", newPlaylists.length);
        console.log("oldPlayliists", oldPlayliists.length);
        console.log("updateVideos", updateVideos.length);
        console.log("dublikate", dublikate.length);

    }


    async function createWithRetry(video: any) {
        let retries = 5;
        let success = false;

        while (retries > 0 && !success) {
            try {
                await playlistRepo.create(video);
                success = true;
            } catch (error) {
                console.error(`Transaction failed. Retries left: ${retries}`, error);
                retries--;
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
            }
        }
    }
    async function removeWithRetry(video: any) {
        let retries = 5;
        let success = false;

        while (retries > 0 && !success) {
            try {
                await playlistRepo.delete(video.playlistId);
                success = true;
            } catch (error) {
                console.error(`Transaction failed. Retries left: ${retries}`, error);
                retries--;
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
            }
        }
    }
    async function updateWithRetry(video: any) {
        let retries = 5;
        let success = false;

        while (retries > 0 && !success) {
            try {
                await playlistRepo.update(video.playlistId, video);
                success = true;
            } catch (error) {
                console.error(`Transaction failed. Retries left: ${retries}`, error);
                retries--;
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
            }
        }
    }
}
async function removeDublicatesWithRetry(video: any) {
    let retries = 5;
    let success = false;

    while (retries > 0 && !success) {
        try {
            await playlistRepo.delete(video.playlistId);
            success = true;
        } catch (error) {
            console.error(`Transaction failed. Retries left: ${retries}`, error);
            retries--;
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
        }
    }
}