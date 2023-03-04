import { getYoutubeVideos } from "./youtubeVideos";
import { videoRepo } from "../Services/Repositories";
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
        videos.forEach((video: any) => {
            if (video.thumbnail !== "") {
                if (!dbDataCopy.find(dbVideo => dbVideo.videoId === video.videoId)) {
                    newVideos.push(video);
                }
            }
        })
        dbDataCopy.forEach(dbVideo => {
            if (!videos.find((video: any) => video.videoId === dbVideo.videoId)) {
                oldVideos.push(dbVideo);
            }
        })
        videos.forEach((video: any) => {
            if (video.thumbnail !== "") {
                let findedData = dbDataCopy.find(dbVideo => dbVideo.videoId === video.videoId);
                if (findedData && (findedData.title !== video.title || findedData.thumbnail !== video.thumbnail)) {
                    updateVideos.push(video);
                }
            }
        })
    }

    oldVideos.forEach(video => {
        videoRepo.delete(video.id);
    })

    newVideos.forEach(video => {
        videoRepo.create(video);
    })
    updateVideos.forEach(video => {
        videoRepo.update(video.id, video);
    })
}


