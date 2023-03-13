import { z } from 'zod'
import { procedure, router } from '../trpc'


/*

model Article {
  id          String            @id @default(cuid()) @map("_id")
  title       String
  content     String
  publishedAt DateTime
  authorId    String            @map("author_id")
  author      Author            @relation(fields: [authorId], references: [id])
  categories  CategoryArticle[]
}

*/


export const articleType = z.object({
    id: z.string().cuid(),
    title: z.string(),
    content: z.string(),
    publishedAt: z.date(),
    authorId: z.string(),

})
export const articlePostType = z.object({
    title: z.string(),
    content: z.string(),
    publishedAt: z.date(),
    authorId: z.string(),
})
export const articleTypeArray = z.array(articleType)

export const articleRouter = router({
    getAll: procedure
        .query(async ({ ctx }) => {
            return await ctx.prisma.article.findMany()
        }),
    oneByArticleId: procedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.article.findUnique({
                where: {
                    id: input
                }
            })
        }),
    create: procedure
        .input(articlePostType)
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.article.create({
                data: input
            })
        }),
    update: procedure
        .input(articleType)
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.article.update({
                where: {
                    id: input.id
                },
                data: {
                    title: input.title,
                    content: input.content,
                    publishedAt: input.publishedAt,
                    authorId: input.authorId,
                }
            })
        }),
    delete: procedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.article.delete({
                where: {
                    id: input
                }
            })
        })

})
