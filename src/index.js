require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dbConnection = require('./config/dbConnection');
const mongoose = require('mongoose');
const port = process.env.SERVER_PORT || 5000;
const videoRouter = require('./controller/videoController');
const playlistRouter = require('./controller/playlistController');
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

// app use
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet())
app.use(limiter)

// connect to db
dbConnection();

// app routes
app.get('/', async (req, res) => {
    res.send('Hello World!')
});

// routes
app.use('/videos', videoRouter);
app.use('/playlists', playlistRouter);

//  start server
mongoose.connection.once('open', () => {
    console.log('connected to database');
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
});

