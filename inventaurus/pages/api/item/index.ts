// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(req : NextApiRequest, res:NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const items = await prisma.item.findMany();
      res.status(200).json(items);
      return;
    case 'PUT':
      // TODO validation
      const item = req.body;
      const returnedItem = await prisma.item.create({data:item})
      res.status(200).json(returnedItem);
      return;
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
