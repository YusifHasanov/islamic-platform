const { google } = require('googleapis');
const channelId = "UC1B8clCxtmb-bzCDdxmVPDA";
const apiKey1 = 'AIzaSyCjP_IofsUYjrMAWzKd_ROb5gdBQr4UZxc';
const apiKey2 = 'AIzaSyC524HaOQ4VzmsyuIIoCzs884QXAV9rvJA';
const apiKey3 = "AIzaSyC0ms0FHyD6TBw6lVg1daz2Uk2EZGiFDo4";
const apiKey4 = "AIzaSyBKSsL9icSxXWl1PMA74gDjSeB9KycT8AI"
const apiKey5 = 'AIzaSyAWYWmaQf4rcWNg7CeSGgzNzCtI-3aCHJA'
const apiKey6 = 'AIzaSyCMGNRMEQdVIs_AYD4mbxD6vZkAS_TWwr8'
const apiKey7 = 'AIzaSyBI-s8eiIZV_RsILgOTf1zPslk2qJO8wWs'
let apiKeys = [apiKey1, apiKey2, apiKey3, apiKey4, apiKey5, apiKey6, apiKey7];
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
                channelId: channelId,
                type: typeOfVideo,
                maxResults: 50,
                pageToken: nextPageToken,

            });
        } else {
            res = await youtube.search.list({
                part: "snippet",
                channelId: channelId,
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