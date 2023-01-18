const { getYoutubeVideos } = require('../DataAccess/youtube/videoYoutubeDal');
const { addData, deleteData } = require('../DataAccess/mongoDB/mongoDBDal');
const { Video } = require('../Entities/video');
async function videoService(dbData) {
    let videos = []
    try {
        videos = await getYoutubeVideos();
    } catch (error) {
        console.log(error);
    }
 
    let dbDataCopy = [...dbData];
    let newVideos = [];
    let oldVideos = [];
    if (videos.length > 0) {
        videos.forEach(video => {
            if (!dbDataCopy.find(dbVideo => dbVideo.id === video.id)) {
                newVideos.push(video);
            }
        })
        dbDataCopy.forEach(dbVideo => {
            if (!videos.find(video => video.id === dbVideo.id)) {
                oldVideos.push(dbVideo);
            }
        })
    }
 
    oldVideos.forEach(video => {
        deleteData(Video, video._id);
    })

    newVideos.forEach(video => {
        addData(Video, video);
    })
   
}



module.exports = {
    videoService
}