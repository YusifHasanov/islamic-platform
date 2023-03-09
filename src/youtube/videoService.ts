import { getYoutubeVideos } from "./youtubeVideos";
import { videoRepo } from "../Services/Repositories";
import { Video } from "@prisma/client";
export async function videoService(dbData: any[]) {
    let videos: any = []
    try {
        videos = await getYoutubeVideos();
    } catch (error: any) {
        throw new Error(error);
    }

    let dbDataCopy: any[] = [...dbData];
    let newVideos: any[] = [];
    let oldVideos: any[] = [];
    let updateVideos: any[] = [];

    if (videos.length > 0) {
        for (const video of videos) {
            if (!dbDataCopy.find((dbVideo: any) => dbVideo.videoId === video.videoId)) {
                newVideos.push(video);
                await createWithRetry(video);
            }
        }
        for (const dbVideo of dbDataCopy) {
            if (!videos.find((video: any) => video.videoId === dbVideo.videoId)) {
                oldVideos.push(dbVideo);
                await removeWithRetry(dbVideo);
            }
        }


        for (const video of videos) {
            if (video.thumbnail !== "") {
                const findedData = dbDataCopy.find(dbVideo => dbVideo.videoId === video.videoId);
                if (findedData && (findedData.title !== video.title || findedData.thumbnail !== video.thumbnail || findedData.playlistId !== video.playlistId)) {
                    updateVideos.push(video);
                    await updateWithRetry(video);
                }
            }
        }

    }
    console.log("newVideos", newVideos);
    console.log("oldVideos", oldVideos);
    console.log("updateVideos", updateVideos);

    async function updateWithRetry(video: any) {
        let retries = 5;
        let success = false;

        while (retries > 0 && !success) {
            try {
                await videoRepo.update(video.videoId, video);
                success = true;
            } catch (error) {
                console.error(`Transaction failed. Retries left: ${retries}`, error);
                retries--;
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
            }
        }

        if (!success) {
            throw new Error('Unable to update video.');
        }
    }
    async function createWithRetry(video: any) {
        let retries = 5;
        let success = false;

        while (retries > 0 && !success) {
            try {
                await videoRepo.create(video);
                success = true;
            } catch (error) {
                console.error(`Transaction failed. Retries left: ${retries}`, error);
                retries--;
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
            }
        }

        if (!success) {
            throw new Error('Unable to create video.');
        }
    }
    async function removeWithRetry(video: Video) {
        let retries = 5;
        let success = false;

        while (retries > 0 && !success) {
            try {
                await videoRepo.delete(video.videoId);
                success = true;
            } catch (error) {
                console.error(`Transaction failed. Retries left: ${retries}`, error);
                retries--;
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
            }
        }

        if (!success) {
            throw new Error('Unable to remove video.');
        }
    }

}


