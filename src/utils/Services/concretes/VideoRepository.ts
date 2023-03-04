import IRepository from "../abstracts/IRepository";
import prisma from "@/prisma/prisma";
import { Video } from "../../types/Types";

export default class VideoRepository implements IRepository<Video> {
  async getAll(): Promise<Video[]> {
    const data = await prisma.video.findMany();
    return data as Video[];
  }
  async getWhere(limit: number, order: string, cursor: any): Promise<Video[]> {
    const data = await prisma.video.findMany({
      take: limit,
      skip: cursor === "" ? 0 : 1,
      cursor: cursor === "" ? undefined : { id: cursor },
      orderBy: {
        publishedAt: order,
      } as any,
    });
    return data as Video[];
  }
  async getById(id: string): Promise<Video> {
    const data = await prisma.video.findUnique({
      where: { id },
    });
    return data as Video;
  }
  async create(data: Video): Promise<Video> {
    const createdData = await prisma.video.create({
      data,
    } as any);
    return createdData as Video;
  }
  async delete(id: string): Promise<void> {
    await prisma.video.delete({
      where: { id },
    });
  }


  async update(id: string, data: Video): Promise<Video> {
    const updatedVideos = await prisma.video.update({
      where: { id },
      data: {
        title: data.title,
        thumbnail: data.thumbnail,
      },
    });
    return updatedVideos as Video;
  }
}