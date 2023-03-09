import type { NextApiRequest, NextApiResponse } from 'next';
import { videoRepo } from '@/src/Services/Repositories';
import   videoMiddleware   from '@/middleware';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { videoId } = req.query
     
     
        switch (req.method) {
            case 'GET':
                const video = await videoRepo.getById(videoId as string)

                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(video);
        }
   
}

// export const config = {
//     api: {
//         bodyParser: false,
//         // Add the middleware to the middleware array
//         middleware: [videoMiddleware],
//     },
// }