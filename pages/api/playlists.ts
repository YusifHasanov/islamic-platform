// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { playlistRepo } from '@/src/Services/Repositories';
 import { Playlist } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        if (req.query.id) {
          const data = await playlistRepo.getById(req.query.id as string);
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(data);
        } else {
          const data = await playlistRepo.getAll();
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(data);
        }
        break;
      case 'POST':
        const postBody: Playlist = req.body;
        const createdData = await playlistRepo.create(postBody);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(createdData);
        break;
      case 'PUT':
        const putBody: Playlist = req.body;
        const id = req.query.id;
        console.log(putBody);
        const updatedData = await playlistRepo.update(id as string, putBody);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(updatedData);
        break;
      case 'DELETE':
        const deleteBody: Playlist = req.body;
        await playlistRepo.delete(deleteBody.id);
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
