import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(req : NextApiRequest, res:NextApiResponse) {
  const id = req.query.id;
  switch(req.method) {
    case 'GET':
      const item = await prisma.item.findUnique({where: {id: String(id)}});
      // TODO, FETCH ITEM
      res.status(200).json(item);
      return;
    case 'DELETE':
      await prisma.item.delete({where: {id: String(id)}});
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
