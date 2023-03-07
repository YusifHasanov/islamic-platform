// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { articleRepo } from '@/src/Services/Repositories';
import { Article } from '@prisma/client';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { method } = req;
    
    try {
        switch (method) {
            case 'GET':
                if (req.query.id) {
                    const data = await articleRepo.getById(req.query.id as string);
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(data);
                } else {
                    const data = await articleRepo.getAll();
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(data);
                }
                break;
            case 'POST':
                const postBody: Article = req.body;
                const createdData = await articleRepo.create(postBody);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(createdData);
                break;
            case 'PUT':
                const putBody: Article = req.body;
                const id = req.query.id;
                console.log(putBody);
                const updatedData = await articleRepo.update(id as string, putBody);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(updatedData);
                break;
            case 'DELETE':
                const deleteBody: Article = req.body;
                await articleRepo.delete(deleteBody.id);
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
