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
    console.log("videos", videos.find((p: any) => p.videoId === "QSnRtWSe_Pw"));
    let dbDataCopy: any[] = [...dbData];
    let newVideos: any[] = [];
    let oldVideos: any[] = [];
    let updateVideos: any[] = [];

    if (videos.length > 0) {
        videos.forEach((video: any) => {
            if (video.thumbnail !== "") {
                if (!dbDataCopy.find(dbVideo => dbVideo.videoId === video.videoId)) {
                    newVideos.push(video);
                    add(video);
                }
            }
        })
        dbDataCopy.forEach(dbVideo => {
            if (!videos.find((video: any) => video.videoId === dbVideo.videoId)) {
                oldVideos.push(dbVideo);
                remove(dbVideo);
            }
        })
        videos.forEach((video: any) => {
            if (video.thumbnail !== "") {
                let findedData = dbDataCopy.find(dbVideo => dbVideo.videoId === video.videoId);
                if (findedData && (findedData.title !== video.title || findedData.thumbnail !== video.thumbnail || findedData.playlistId !== video.playlistId)) {
                    updateVideos.push(video);
                    update(video);
                }
            }
        })
    }


    async function remove(video: Video) {
        await videoRepo.delete(video.videoId);
    }

    async function add(video: Video) {
        await videoRepo.create(video);
    }

    async function update(video: Video) {
        await videoRepo.update(video.videoId, video);
    }
}


