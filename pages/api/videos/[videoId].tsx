
import type { NextApiRequest, NextApiResponse } from 'next'
import { videoRepo } from '@/src/Services/Repositories';
import { Video } from '@prisma/client';
import prisma from '@/prisma/prisma';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { videoId } = req.query
    try {
        switch (req.method) {
            case 'GET':
                const video = await videoRepo.getById(videoId as string);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(video);
        }

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}