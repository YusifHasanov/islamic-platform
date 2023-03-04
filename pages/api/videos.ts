// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { videoRepo } from '@/src/utils/Services/Repositories';
import { Video } from '@/src/utils/types/Types';
import prisma from '@/prisma/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { method } = req;
    const { order } = req.query;
    const limit = Number(req.query.limit) || 8;
    const cursor = req.query.cursor ?? "";
    const playlistId = req.query.playlistId??"" ;
    try {
        switch (method) {
            case 'GET':
                if (req.query.videoId) {
                    const data = await videoRepo.getById(req.query.videoId as string);
                    res.status(200).json(data);
                } else {
                    if (limit && order) {

                        const data =
                            await videoRepo.getWhere(limit, (order as string), (cursor as any),playlistId as string );
                        return res.json({ data, nextId: data.length === limit ? data[limit - 1].id : undefined })
                    } else {
                        const data = await videoRepo.getAll();
                        res.status(200).json(data);
                    }
                }
            case 'POST':
                const postBody: Video = req.body;
                const createdData = await videoRepo.create(postBody);
                res.status(200).json(createdData);
                break;
            case 'PUT':
                const putBody: Video = req.body;
                console.log(putBody);
                const updatedData = await videoRepo.update(putBody.id, putBody);
                res.status(200).json(updatedData);
                break;
            case 'DELETE':
                const deleteBody: Video = req.body;
                await videoRepo.delete(deleteBody.id);
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
