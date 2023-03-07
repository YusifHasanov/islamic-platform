// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { videoRepo } from '@/src/Services/Repositories';
import { Video } from '@prisma/client';
import prisma from '@/prisma/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { method } = req;
    const { order } = req.query;
    const limit = Number(req.query.limit) || -1;
    const cursor = req.query.cursor ?? "";
    const playlistId = req.query.playlistId ?? "";
    try {
        switch (method) {
            case 'GET':
                if (req.query.videoId) {
                    const data = await videoRepo.getById(req.query.videoId as string);
                    res.setHeader('Content-Type', 'application/json');

                    res.status(200).json(data);
                } else {
                    if (limit > 0 && order) {
                        const data =
                            await videoRepo.getWhere(limit, (order as string), (cursor as any), playlistId as string);
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).json({ data, nextId: data.length === limit ? data[limit - 1].id : undefined })
                    } else if (playlistId.length > 0) {
                        const data = await videoRepo.getWhere(-1, order as string, '', playlistId as string);
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).json(data);
                    } else {
                        const data = await videoRepo.getAll();
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).json(data);
                    }
                }
                break;
            case 'POST':
                const postBody: Video = req.body;
                const createdData = await videoRepo.create(postBody);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(createdData);
                break;
            case 'PUT':
                const putBody: Video = req.body;
                console.log(putBody);
                const updatedData = await videoRepo.update(putBody.id, putBody);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(updatedData);
                break;
            case 'DELETE':
                const deleteBody: Video = req.body;
                await videoRepo.delete(deleteBody.id);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({ message: 'Deleted' });
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);

        }


    } catch (error: any) {
        res.status(500).json({ statusCode: 500, message: error.message });
    }
}
