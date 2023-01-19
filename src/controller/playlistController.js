
const express = require('express');
const router = express.Router();
const { Playlist } = require('../Entities/playlist');
const { getData } = require('../DataAccess/mongoDB/mongoDBDal');
const { playlistService } = require("../Business/playlistManager")


router.get('/', async (req, res, next) => {
    const allPlaylists = await getData(Playlist);
    res.json(allPlaylists);
    next();
    playlistService(allPlaylists);
});

module.exports = router;

