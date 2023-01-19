const { getYoutubePlaylists } = require('../DataAccess/youtube/playlistYoutubeDal');
const { addData, deleteData, updateData } = require('../DataAccess/mongoDB/mongoDBDal');
const { Playlist } = require('../Entities/playlist');

async function playlistService(dbData) {

    let videos = [];
    try {
        videos = await getYoutubePlaylists();
    } catch (error) {
        console.log(error);
    }
    let dbDataCopy = JSON.parse(JSON.stringify(dbData));
    let newPlaylists = [];
    let oldPlayliists = [];
    let updateVideos = [];
    if (videos.length > 0) {
        videos.forEach(video => {
            if (!dbDataCopy.find(dbVideo => dbVideo.id === video.id)) {
                newPlaylists.push(video);
            }
        })
        dbDataCopy.forEach(dbVideo => {
            if (!videos.find(video => video.id === dbVideo.id)) {
                oldPlayliists.push(dbVideo);
            }
        })
        videos.forEach(video => {
            if (video.thumbnail !== "") {
                let findedData = dbDataCopy.find(dbVideo => dbVideo.id === video.id);
                if (findedData && (findedData.title !== video.title || findedData.thumbnail !== video.thumbnail)) {
                    updateVideos.push(video);
                }
            }
        })
    }
    oldPlayliists.forEach(video => {
        deleteData(Playlist, video._id);
    })

    newPlaylists.forEach(video => {
        addData(Playlist, video);
    })
    
    updateVideos.forEach(video => {
        updateData(Playlist, video);
    });

}


module.exports = {
    playlistService
}