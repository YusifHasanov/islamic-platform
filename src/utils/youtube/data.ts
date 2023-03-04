import { google } from 'googleapis';
let apiKeys = [
    process.env.API_KEY_1];
let randomIndex = Math.floor(Math.random() * apiKeys.length);
const currentApikey = apiKeys[0];

let nextPageToken: string | undefined;



//get nuymber of subscribers
export async function getSubscribers() {
    let youtube = google.youtube({ version: 'v3', auth: currentApikey });
    let res: any;
    try {
        res = await youtube.channels.list({
            part: "statistics",
            id: process.env.CHANNEL_ID,
        } as any);
    } catch (error: any) {
        throw new Error(error);
    }
    return res?.data?.items ? res.data.items[0].statistics :{};
}




async function getOnePage(typeOfVideo: string) {
    let youtube = google.youtube({ version: 'v3', auth: currentApikey });
    let res: any;

    try {
        if (nextPageToken) {
            res = await youtube.search.list({
                part: "snippet",
                channelId: process.env.CHANNEL_ID,
                type: typeOfVideo,
                maxResults: 50,
                pageToken: nextPageToken,
            } as any);
        } else {
            res = await youtube.search.list({
                part: "snippet",
                channelId: process.env.CHANNEL_ID,
                type: typeOfVideo,
                maxResults: 50,
            } as any);

        }
    } catch (error: any) {
        throw new Error(error);
    }

    nextPageToken = res?.data?.nextPageToken;
    return res?.data?.items ? res.data.items : [];
}

export async function getAllPages(typeOfVideo: string) {
    let channelVideos: any[] = [];
    let response;
    try {

        do {
            response = await getOnePage(typeOfVideo);
            channelVideos = channelVideos.concat(response);
        } while (nextPageToken);
    } catch (error: any) {
        throw new Error(error);
    }
    return channelVideos;
}
async function getOnePageOfPlaylistItems(playlistId: string) {
    let res: any;
    let youtube = google.youtube({ version: 'v3', auth: currentApikey });
    try {
        if (nextPageToken) {
            res = await youtube.playlistItems.list({
                part: "snippet",
                playlistId: playlistId,
                maxResults: 50,
                pageToken: nextPageToken,

            } as any);
        } else {
            res = await youtube.playlistItems.list({
                part: "snippet",
                playlistId: playlistId,
                maxResults: 50,

            } as any);

        }
    } catch (error: any) {

        throw new Error(error);
    }


    nextPageToken = res?.data?.nextPageToken;
    return res?.data?.items ? res.data.items : [];
}

export async function getAllPagesOfPlaylistItems(playlistId: string) {
    let channelVideos: any[] = [];
    let response;
    try {
        do {
            response = await getOnePageOfPlaylistItems(playlistId);
            channelVideos = channelVideos.concat(response);
        } while (nextPageToken);
    } catch (error: any) {
        throw new Error(error);
    }

    return channelVideos;
}

