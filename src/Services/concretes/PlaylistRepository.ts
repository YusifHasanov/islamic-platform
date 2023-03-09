import { Playlist } from "@prisma/client";
import IRepository from "../abstracts/IRepository";
import prisma from "@/prisma/prisma";


export default class VideoRepository implements IRepository<Playlist> {
  async getAll(): Promise<Playlist[]> {
    const data = await prisma.playlist.findMany({
      orderBy: {
        publishedAt: "desc",
      }
    });
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
      where: { playlistId: id },
    });
    return data as Playlist;
  }
  async create(data: Playlist): Promise<Playlist> {
    const createdData = await prisma.playlist.create({ data, });
    return createdData as Playlist;
  }
  async delete(id: string): Promise<Playlist> {
    const response = await prisma.playlist.delete({ where: { id } });
    return response as Playlist;
  }


  async update(id: string, data: Playlist): Promise<Playlist> {
    console.log(id, data)
    let updatedVideos: any;
    try {
      updatedVideos = await prisma.playlist.update({
        where: { playlistId: id },
        data: {
          title: data.title,
          thumbnail: data.thumbnail,
          publishedAt: data.publishedAt,
        },
      });
    } catch (error) {
      console.log(error)
    }
    return updatedVideos as Playlist;
  }
}