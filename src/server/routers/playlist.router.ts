import prisma from "@/prisma/prisma";
import { procedure, router } from "../trpc";
import { Playlist } from "@prisma/client";



export const playlistRouter = router({
    getAll: procedure
    .query(async ()=>{
        const playlists = await prisma.playlist.findMany();
        return playlists;
    })
})