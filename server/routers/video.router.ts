
import { procedure } from "../trpc";
import { z } from "zod";
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
        .query(async ({ ctx }) => await ctx.prisma.video.findMany()),

    oneByVideoId: procedure
        .input(z.string())
        .query(async ({ input, ctx }) => await ctx.prisma.video.findUnique({
            where: {
                videoId: input
            }
        })),

    manyByPlaylistId: procedure
        .input(z.string())
        .query(async ({ input, ctx }) => await ctx.prisma.video.findMany({
            where: {
                playlistId: input
            }
        })),

    manyByPlayPaginated: procedure
        .input(z.object({
            playlistId: z.string().default(""),
            cursor: z.string().default(""),
            limit: z.number().default(8),
        }))
        .query(async ({ input, ctx }) => {
            const { limit, cursor, playlistId } = input;
            const data = await ctx.prisma.video.findMany({
                take: limit < 0 ? undefined : limit,
                skip: cursor === "" ? 0 : 1,
                cursor: cursor === "" ? undefined : { id: cursor },
                where: {
                    playlistId: playlistId.length > 0 ? playlistId : undefined
                },
                orderBy: {
                    publishedAt: "desc",
                } as any,
            });
            return { data, nextId: data.length === limit ? data[limit - 1].id : undefined };
        }),
    manyByLimit: procedure
        .input(z.number())
        .query(async ({ input, ctx }) => await ctx.prisma.video.findMany({
            take: input,
            where: {
                thumbnail: {
                    not:{ 
                        equals:""
                    }
                }
            },
            orderBy: {
                publishedAt: "desc",
            } as any,
           
        })),

    create: procedure
        .input(videoPostType)
            .mutation(async ({ input, ctx }) => await ctx.prisma.video.create({
                data: input
            })

            ),
            update: procedure
                .input(videoType)
                .mutation(async ({ input, ctx }) => await ctx.prisma.video.update({
                    where: {
                        videoId: input.videoId
                    },
                    data: input
                })
                )
})
