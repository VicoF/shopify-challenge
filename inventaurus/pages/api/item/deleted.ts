// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(req : NextApiRequest, res:NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const items = await prisma.item.findMany({where: {NOT: {deletedAt: null}}});
      res.status(200).json(items);
      return;
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
