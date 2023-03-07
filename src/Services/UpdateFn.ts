

export async function UpdateFn() {
    const videoUpdate = fetch("/api/updateVideos", { method: "PUT", });
    const playlistUpdate = fetch("/api/updatePlaylists", { method: "PUT" });


    const data = await Promise.all([videoUpdate, playlistUpdate])
}


//5 minit in milliseconds
// const fiveMinutes = 300000;