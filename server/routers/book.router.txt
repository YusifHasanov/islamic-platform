import { z } from "zod";
import { procedure, router } from "../trpc";


export const bookType = z.object({
    id: z.string().cuid(),
    title: z.string(),
    authorId: z.string(),
    description: z.string(),
    publishedAt: z.date()
})

export const bookPostType = z.object({
    title: z.string(),
    authorId: z.string(),
    description: z.string(),
    publishedAt: z.date()
})

export const bookTypeArray = z.array(bookType)




export const bookRouter = router({
    getAll: procedure
        .query(async ({ ctx }) => {
            return await ctx.prisma.book.findMany()
        }),
    oneByBookId: procedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.book.findUnique({
                where: {
                    id: input
                }
            })
        }),
    create: procedure
        .input(bookPostType)
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.book.create({
                data: input
            })
        }
        ),
    update: procedure
        .input(bookType)
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.book.update({
                where: {
                    id: input.id
                },
                data: {
                    title: input.title,
                    authorId: input.authorId,
                    description: input.description,
                    publishedAt: input.publishedAt
                }
            })
        }
        ),
    delete: procedure
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.book.delete({
                where: {
                    id: input
                }
            })
        }
        )
})
