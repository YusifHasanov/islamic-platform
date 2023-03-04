import IRepository from "../abstracts/IRepository"; 
import prisma from "@/prisma/prisma";
import { Playlist } from "../../types/Types";

export default class VideoRepository implements IRepository<Playlist> {
  async getAll(): Promise<Playlist[]> {
    const data = await prisma.playlist.findMany();
    return data as Playlist[];
  }
  async getWhere(limit: number, order: string, cursor: any): Promise<Playlist[]> {
    const data = await prisma.playlist.findMany({
      take: limit,
      skip: cursor === "" ? 0 : 1,
      cursor: cursor === "" ? undefined : { id: cursor },
      orderBy: {
        publishedAt: order,
      } as any,
    });
    return data as Playlist[];
  }
  async getById(id: string): Promise<Playlist> {
    const data = await prisma.playlist.findUnique({
      where: { id },
    });
    return data as Playlist;
  }
  async create(data: Playlist): Promise<Playlist> {
    const createdData = await prisma.playlist.create({
      data,
    } as any);
    return createdData as Playlist;
  }
  async delete(id: string): Promise<void> {
    await prisma.playlist.delete({
      where: { id },
    });
  }


  async update(id: string, data: Playlist): Promise<Playlist> {
    const updatedVideos = await prisma.playlist.update({
      where: { id },
      data: {
        title: data.title,
        thumbnail: data.thumbnail,
      },
    });
    return updatedVideos as Playlist;
  }
}