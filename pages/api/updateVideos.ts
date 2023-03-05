// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { videoRepo } from '@/src/Services/Repositories';
import { videoService } from '@/src/youtube/videoService';

const methods = ['POST', 'PUT', 'DELETE', 'GET'];
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const { method } = req;
    try {
        if (methods.includes(method as string)) {
            const videos = await videoRepo.getAll();
            await videoService(videos);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ message: 'Videos Updated' });
        }
    } catch (error: any) {
        res.status(500).json({ statusCode: 500, message: error.message });
    }
}
