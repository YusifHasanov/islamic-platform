const { getYoutubeVideos } = require('../DataAccess/youtube/videoYoutubeDal');
const { addData, deleteData,updateData } = require('../DataAccess/mongoDB/mongoDBDal');
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
    let updateVideos = [];

    if (videos.length > 0) {
        videos.forEach(video => {
            if (video.thumbnail !== "") {
                if (!dbDataCopy.find(dbVideo => dbVideo.id === video.id)) {
                    newVideos.push(video);
                }
            }
        })
        dbDataCopy.forEach(dbVideo => {
            if (!videos.find(video => video.id === dbVideo.id)) {
                oldVideos.push(dbVideo);
            }
        })
        videos.forEach(video => {
            if (video.thumbnail !== "") {
                let findedData = dbDataCopy.find(dbVideo => dbVideo.id === video.id);
                    if (findedData && (findedData.title !== video.title|| findedData.thumbnail !== video.thumbnail)) {
                        updateVideos.push(video);
                    }
            }
        })
    }

    oldVideos.forEach(video => {
        deleteData(Video, video._id);
    })

    newVideos.forEach(video => {
        addData(Video, video);
    })
    updateVideos.forEach(video => {
        updateData(Video, video);
    })
}



module.exports = {
    videoService
}