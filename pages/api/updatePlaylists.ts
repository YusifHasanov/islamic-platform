// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { playlistService } from '@/src/youtube/playlistService';
import { playlistRepo } from '@/src/Services/Repositories';

const methods = ['POST', 'PUT', 'DELETE', 'GET'];
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const { method } = req;
    try {
        if (methods.includes(method as string)) {
            const playlists = await playlistRepo.getAll();
            await playlistService(playlists);
            res.status(200).json({ message: 'Playlists Updated' });
        }
    } catch (error: any) {
        res.status(500).json({ statusCode: 500, message: error.message });
    }
}
