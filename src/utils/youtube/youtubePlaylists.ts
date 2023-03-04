import { getAllPages } from './data';
export async function getYoutubePlaylists() {
    let playlistArray: any[] = [];
    try {
        const playlists = await getAllPages('playlist');
          


            
        playlists.forEach(element => {
            let playlist = {
                playlistId: element.id,
                publishedAt: element.snippet.publishedAt,
                thumbnail: element.snippet.thumbnails?.high?.url ? element.snippet.thumbnails?.high?.url : "",
                title: element.snippet.title,   
            }
            playlistArray.push(playlist);
        });
     
    } catch (error: any) {
        throw new Error(error);
    }    
    return playlistArray;
}

