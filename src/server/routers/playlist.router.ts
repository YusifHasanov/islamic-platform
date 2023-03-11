
import { procedure, router } from "../trpc";
import { Playlist } from "@prisma/client";
import { z } from "zod";
import { playlistType } from "@/src/utils/types/playlistType";



export const playlistRouter = router({
    getAll: procedure
        .query(async ({ ctx }) => {
            const playlists = await ctx.prisma.playlist.findMany();
            return playlists;
        }),
    getByPlaylistId: procedure
        .input(z.string())
        .query(async ({ ctx, input }) => {

            const playlist = await ctx.prisma.playlist.findUnique({
                where: {
                    playlistId: input
                }
            });
            return playlist;
        }),
    create: procedure
        .input(playlistType)
        .mutation(async ({ ctx, input }) => {
            const playlist = await ctx.prisma.playlist.create({
                data: input
            });
            return playlist;
        }),
    update: procedure
        .input(playlistType)
        .mutation(async ({ ctx, input }) => {
            const playlist = await ctx.prisma.playlist.update({
                where: {
                    playlistId: input.playlistId
                },
                data: input
            });
            return playlist;
        }),

})