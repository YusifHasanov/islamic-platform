const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
    id: String,
    publishedAt: Date,
    thumbnail: String,
    title: String,
   
    liveContent: String,
})
const Playlist = mongoose.model('playlists', videoSchema);


module.exports = {
    Playlist
}