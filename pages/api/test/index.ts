import type { NextApiRequest, NextApiResponse } from 'next';
import { videoRepo } from '@/src/Services/Repositories';
// import   videoMiddleware   from '@/middleware';
import { getAllVideos, getOnePageVideo } from '@/src/Services/youtube/data';
import { getYoutubeVideos } from '@/src/Services/youtube/youtubeVideos';
import { getAllFilteredVideos } from '@/src/Services/youtube/videoFilter';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
     
     
     
        switch (req.method) {
            case 'GET':
                const video = await getAllFilteredVideos()
                const playlistItems :any = await getYoutubeVideos();
                const concatted = [...video,...playlistItems]
                console.log (playlistItems.length)
                console.log(video.length);
                const uniqueArray = concatted.filter((obj, index, self) => {
                    return index === self.findIndex((t) => t.title === obj.title);
                  });
                  console.log(uniqueArray.length)
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(uniqueArray);
        }
   
}

// export const config = {
//     api: {
//         bodyParser: false,
//         // Add the middleware to the middleware array
//         middleware: [videoMiddleware],
//     },
// }