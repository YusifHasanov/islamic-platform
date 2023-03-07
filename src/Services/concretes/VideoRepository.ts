import IRepository from "../abstracts/IRepository";
import prisma from "@/prisma/prisma";
import { Video } from "@prisma/client";

export default class VideoRepository implements IRepository<Video> {
  async getAll(): Promise<Video[]> {
    const data = await prisma.video.findMany();
    return data as Video[];
  }
  async getWhere(limit: number, order: string, cursor: any, playlist: string): Promise<Video[]> {
    const data = await prisma.video.findMany({
      take: limit < 0 ? undefined : limit,
      skip: cursor === "" ? 0 : 1,
      cursor: cursor === "" ? undefined : { id: cursor },
      where: {
        playlistId: playlist.length > 0 ? playlist : undefined
      },
      orderBy: {
        publishedAt: order,
      } as any,
    });
    return data as Video[];
  }
  async getById(id: string): Promise<Video> {
    const data = await prisma.video.findUnique({
      where: { videoId: id },
    });
    return data as Video;
  }
  async create(data: Video): Promise<Video> {
    const createdData = await prisma.video.create({ data, } as any);
    return createdData as Video;
  }
  async delete(id: string): Promise<Video> {
    const response = await prisma.video.delete({
      where: { id },
    });

    return response as Video;
  }


  async update(id: string, data: Video): Promise<Video> {
    const updatedVideos = await prisma.video.update({
      where: { videoId: id },
      data: {
        title: data.title,
        thumbnail: data.thumbnail,
      },
    });
    return updatedVideos as Video;
  }
}