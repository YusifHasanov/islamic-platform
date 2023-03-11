import { Book } from "@prisma/client";
import IRepository from "./IRepository";
import prisma from "@/prisma/prisma";



export default class BookRepository implements IRepository<Book> {
    async getAll(): Promise<Book[]> {
        const response = await prisma.book.findMany();
        return response as Book[];
    }

    async getById(id: string): Promise<Book> {
        const response = await prisma.book.findUnique({
            where: {
                id: id
            }
        });
        return response as Book;
    }
    async create(data: Book): Promise<Book> {
        const response = await prisma.book.create({ data });
        return response as Book;
    }
    async delete(id: string): Promise<Book> {
        const response = await prisma.book.delete({
            where: {
                id: id
            }
        });
        return response as Book;
    }
    async update(id: string, data: Book): Promise<Book> {
        const response = await prisma.book.update({
            where: { id: id },
            data: {
                title: data.title,
                description: data.description,
                authorId: data.authorId,
            }
        })
        return response as Book;
    }
}