const { google } = require('googleapis');
let apiKeys = [
    process.env.API_KEY_1, 
    process.env.API_KEY_2, 
    process.env.API_KEY_3, 
    process.env.API_KEY_4, 
    process.env.API_KEY_5,
    process.env.API_KEY_6,
    process.env.API_KEY_7];
let randomIndex = Math.floor(Math.random() * apiKeys.length);
const currentApikey = apiKeys[randomIndex];

let nextPageToken;


async function getOnePage(typeOfVideo) {
    let res = [];
    let youtube = google.youtube({ version: 'v3', auth: currentApikey });
    try {
        if (nextPageToken) {
            res = await youtube.search.list({
                part: "snippet",
                channelId: process.env.CHANNEL_ID,
                type: typeOfVideo,
                maxResults: 50,
                pageToken: nextPageToken,
            });
        } else {
            res = await youtube.search.list({
                part: "snippet",
                channelId: process.env.CHANNEL_ID,
                type: typeOfVideo,
                maxResults: 50,

            });

        }
    } catch (error) {
        console.log(error);
    }

    nextPageToken = res?.data?.nextPageToken;
    return res?.data?.items ? res.data.items : [];
}

async function getAllPages(typeOfVideo) {
    let channelVideos = [];
    let response;
    try {

        do {
            response = await getOnePage(typeOfVideo);
            channelVideos = channelVideos.concat(response);
        } while (nextPageToken);
    } catch (error) {
        console.log(error);
    }
    return channelVideos;
}
async function getOnePageOfPlaylistItems(playlistId) {
    let res = [];
    let youtube = google.youtube({ version: 'v3', auth: currentApikey });
    try {
        if (nextPageToken) {
            res = await youtube.playlistItems.list({
                part: "snippet",
                playlistId: playlistId,
                maxResults: 50,
                pageToken: nextPageToken,

            });
        } else {
            res = await youtube.playlistItems.list({
                part: "snippet",
                playlistId: playlistId,
                maxResults: 50,

            });

        }
    } catch (error) {
        console.log(error);
    }

    nextPageToken = res?.data?.nextPageToken;
    return res?.data?.items ? res.data.items : [];
}

async function getAllPagesOfPlaylistItems(playlistId) {
    let channelVideos = [];
    let response;
    try {
        do {
            response = await getOnePageOfPlaylistItems(playlistId);
            channelVideos = channelVideos.concat(response);
        } while (nextPageToken);
    } catch (error) {
        console.log(error);
    }
    return channelVideos;
}


module.exports = {
    getAllPages,
    getAllPagesOfPlaylistItems
}