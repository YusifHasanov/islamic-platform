
import { procedure } from "../trpc";
import { z } from "zod";
import prisma from "@/prisma/prisma";
import { router } from "../trpc"; 



export const videoType = z.object({
    videoId: z.string(),
    title: z.string(),
    publishedAt: z.date(),
    thumbnail: z.string(),
    playlistId: z.string(),
    id: z.string().cuid()
  })
  export const videoPostType = z.object({
    videoId: z.string(),
    title: z.string(),
    publishedAt: z.date(),
    thumbnail: z.string(),
    playlistId: z.string(),
  })
  export const videoTypeArray = z.array(videoType)

export const videoRouter = router({
    getAll: procedure
        .query(() => prisma.video.findMany()),
    oneByVideoId: procedure
        .input(z.string())
        .query(async ({ input }) => prisma.video.findUnique({
            where: {
                videoId: input
            }
        })),
    manyByPlaylistId: procedure
        .input(z.string())
        .query(async ({ input }) => {

            const videos = await prisma.video.findMany({
                where: {
                    playlistId: input
                }
            });
            return videos;
        }),

    create: procedure
        .input(videoPostType)
        .mutation(async ({ input }) => {
            const video = await prisma.video.create({
                data: input
            });
            return video;
        }),
    update: procedure
        .input(videoType)
        .mutation(async ({ input }) => {
            const video = await prisma.video.update({
                where: {
                    videoId: input.videoId
                },
                data: input
            });
            return video;
        })
})
