import { google } from 'googleapis';
let apiKeys = [
    process.env.API_KEY_1];
let randomIndex = Math.floor(Math.random() * apiKeys.length);
const currentApikey = apiKeys[0];

let nextPageToken: string | undefined;




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
    return res?.data?.items ? res.data.items[0].statistics : {};
}




async function getOnePage(typeOfVideo: string) {
    let youtube = google.youtube({ version: 'v3', auth: currentApikey });
    let res: any;

    try {
        if (nextPageToken) {
            res = await youtube.playlists.list({
                part: "snippet",
                channelId: process.env.CHANNEL_ID,
                type: typeOfVideo,
                maxResults: 50,
                pageToken: nextPageToken,
            } as any);
        } else {
            res = await youtube.playlists.list({
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
export async function getOnePageVideo() {
    let youtube = google.youtube({ version: 'v3', auth: currentApikey });
    let res: any;

    try {
        if (nextPageToken) {
            res = await youtube.playlists.list({
                part: "snippet",
                channelId: process.env.CHANNEL_ID,
                type: "video", 
                pageToken: nextPageToken,
            } as any);
        } else {
            res = await youtube.playlists.list({
                part: "snippet",
                channelId: process.env.CHANNEL_ID,
                type: "video", 
            } as any);

        }
    } catch (error: any) {
        throw new Error(error);
    }

    nextPageToken = res?.data?.nextPageToken;
    return res?.data?.items ? res.data.items : [];
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


export async function getAllVideos() {
    const youtube = google.youtube({
        version: 'v3',
        auth: currentApikey
    });

    let channelVideos :any = [];
    let nextPageToken = null;

    do {
        const res: any = await youtube.search.list({
            part: 'id',
            channelId: process.env.CHANNEL_ID,
            maxResults: 50,
            pageToken: nextPageToken,
            type: 'video'
        } as any);

        const videoIds = res.data.items.map((item : any) => item.id.videoId);
        // Remove any duplicate video IDs
        const uniqueVideoIds = [...new Set(videoIds) as any] ;

        try {
            const videos = await youtube.videos.list({
                part: 'snippet',
                id: uniqueVideoIds.join(',')
            } as any);

            channelVideos = channelVideos.concat(videos.data.items);
            nextPageToken = res.data.nextPageToken;
        } catch (error) {
            console.error('Error retrieving videos:', error);
        }
    } while (nextPageToken);

    return channelVideos;
}

