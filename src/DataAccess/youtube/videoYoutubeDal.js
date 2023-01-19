
const { getAllPagesOfPlaylistItems } = require('./data');
const { getYoutubePlaylists } = require('./playlistYoutubeDal');

async function getYoutubeVideos() {
    let videos = [];
    try {
        const playlist = await getYoutubePlaylists();

        let a = playlist.map(async (element) => {
            let returnData = [];
            const playlistItems = await getAllPagesOfPlaylistItems(element.id);
            playlistItems.forEach((item) => {

                let video = {
                    id: item.id,
                    videoId: item.snippet.resourceId.videoId,
                    publishedAt: item.snippet.publishedAt,
                    thumbnail: item.snippet.thumbnails?.high?.url ? item.snippet.thumbnails?.high?.url : "",
                    title: item.snippet.title,
                    playlistId: element.id,
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

    } catch (error) {
        console.log(error);
    }
    
    return videos;
}




module.exports = {
    getYoutubeVideos
}