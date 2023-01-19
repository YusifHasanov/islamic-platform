const { getAllPages } = require('./data');


async function getYoutubePlaylists() {
    let playlistArray = [];
    try {
        const playlists = await getAllPages('playlist');
        playlists.forEach(element => {
            let playlist = {
                id: element.id.playlistId,
                publishedAt: element.snippet.publishedAt,
                thumbnail: element.snippet.thumbnails?.high?.url ? element.snippet.thumbnails?.high?.url : "",
                title: element.snippet.title,
                liveContent: element.snippet.liveBroadcastContent,
            }
            playlistArray.push(playlist);
        });
    } catch (error) {
        console.log(error);
    }
    return playlistArray;
}


module.exports = {
    getYoutubePlaylists
}