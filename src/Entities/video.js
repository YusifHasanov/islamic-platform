const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
    id: String,
    videoId: String,
    publishedAt: Date,
    thumbnail: String,
    title: String,
    playlistId: String,

})
const Video = mongoose.model('videos', videoSchema);


module.exports = {
    Video
}