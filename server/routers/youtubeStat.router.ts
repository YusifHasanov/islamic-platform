import { z } from "zod";
import { procedure, router } from "../trpc";


export const youtubeStatType = z.object({
    id: z.string().cuid(),
    viewCount: z.string(),
    subscriberCount: z.string(),
    hiddenSubscriber: z.boolean(),
    videoCount: z.string()
})

export const youtubeStatPostType = z.object({
    viewCount: z.string(),
    subscriberCount: z.string(),
    hiddenSubscriber: z.boolean(),
    videoCount: z.string()
})

export const youtubeStatTypeArray = z.array(youtubeStatType)


export const youtubeStatRouter = router({
    getAll: procedure
        .query(async ({ ctx }) => {
            return await ctx.prisma.youtubeStatistics.findMany()
        }),

    oneByYoutubeStatId: procedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            return await ctx.prisma.youtubeStatistics.findUnique({
                where: {
                    id: input
                }
            })
        }),

    create: procedure
        .input(youtubeStatPostType)
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.youtubeStatistics.create({
                data: input
            })
        }),
    update: procedure
        .input(youtubeStatType)
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.youtubeStatistics.update({
                where: {
                    id: input.id
                },
                data: {
                    viewCount: input.viewCount,
                    subscriberCount: input.subscriberCount,
                    hiddenSubscriber: input.hiddenSubscriber,
                    videoCount: input.videoCount
                }
            })
        }),
    delete: procedure
        .input(z.string().nonempty())
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.youtubeStatistics.delete({
                where: {
                    id: input
                }
            })
        }

        )
})



