
const express = require('express');
const router = express.Router();
const { Video } = require('../Entities/video');
const { getData } = require('../DataAccess/mongoDB/mongoDBDal');
const { videoService } = require("../Business/videoManager")

router.get('/', async (req, res, next) => {
    const allvideos = await getData(Video);
    res.json(allvideos);
    next();
    videoService(allvideos);
});

module.exports = router;

