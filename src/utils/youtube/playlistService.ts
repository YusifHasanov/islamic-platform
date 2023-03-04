import { getYoutubePlaylists } from "./youtubePlaylists";
import { playlistRepo } from "../Services/Repositories";
import { Playlist } from "../types/Types";
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
            }
        })
        dbDataCopy.forEach((dbVideo: Playlist) => {
            if (!videos.find(video => video.playlistId === dbVideo.playlistId)) {
                oldPlayliists.push(dbVideo);
            }
        })
        videos.forEach(video => {
            if (video.thumbnail !== "") {
                let findedData = dbDataCopy.find((dbVideo: Playlist) => dbVideo.playlistId === video.playlistId);
     
                if (findedData && (findedData.title !== video.title || findedData.thumbnail !== video.thumbnail)) {
                    updateVideos.push(video);
                }
            }
        })
       
    }
        console.log("oldPlayliists", oldPlayliists);
        console.log("newPlaylists", newPlaylists);
        console.log("updateVideos", updateVideos);

 
    oldPlayliists.forEach(video => {

        playlistRepo.delete(video.playlistId);
    })

    newPlaylists.forEach(video => {
        playlistRepo.create(video );
    })

    updateVideos.forEach(video => {
        playlistRepo.update(video.playlistId, video);
    });

}


