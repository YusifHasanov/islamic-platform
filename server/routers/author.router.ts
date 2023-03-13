
import { any, z } from "zod";
import { procedure, router } from "../trpc";





export const authorRouter = router({
    getAll: procedure
        .query(async ({ ctx }) => {
            return await ctx.prisma.author.findMany()
        }),
    oneByAuthorId: procedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            return await ctx.prisma.author.findUnique({
                where: {
                    id: input
                }
            })
        }),
    create: procedure
        .input(z.object({
            name: z.string().nonempty(),
            image: z.string().nonempty()
        }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.author.create({
                data: input
            })
        }),
    update: procedure
        .input(z.object({
            id: z.string().cuid().nonempty(),
            name: z.string().nonempty(),
            image: z.string().nonempty()
        }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.author.update({
                where: {
                    id: input.id
                },
                data: {
                    name: input.name,
                    image: input.image
                }
            })
        }),
    delete: procedure
        .input(z.string().nonempty())
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.author.delete({
                where: {
                    id: input
                }
            })
        })
})