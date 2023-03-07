import IRepository from "../abstracts/IRepository";
import { Article } from "@prisma/client";
import prisma from "@/prisma/prisma";
export default class ArticleRepository implements IRepository<Article>{
    async getAll(): Promise<Article[]> {
        const data = await prisma.article.findMany();
        return data as Article[];
    }
    async getById(id: string): Promise<Article> {
        const response = await prisma.article.findUnique({
            where: {
                id: id
            }
        });
        return response as Article;
    }
    async create(data: Article): Promise<Article> {
        const response = await prisma.article.create({ data });
        return response as Article;
    }
    async delete(id: string): Promise<Article> {
        const response = await prisma.article.delete({
            where: {
                id: id
            }
        });
        return response as Article;
    }
    async update(id: string, data: Article): Promise<Article> {
        const response = await prisma.article.update({
            where: { id: id },
            data: {
                title: data.title,
                content: data.content,
                authorId: data.authorId,
            }
        })
        return response as Article;
    }

}