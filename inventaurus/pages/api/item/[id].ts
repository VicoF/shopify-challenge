import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(req : NextApiRequest, res:NextApiResponse) {
  const id = req.query.id;
  switch(req.method) {
    case 'GET':{
      const item = await prisma.item.findUnique({where: {id: String(id)}});
      res.status(200).json(item);
      return;
    }
    case 'POST':{
      // TODO validation
      const item = req.body;
      const returnedItem = await prisma.item.update({where: {id:item.id}, data:item})
      res.json(returnedItem);
      return
    }
    case 'DELETE':
      await prisma.item.delete({where: {id: String(id)}});
      res.status(200).end();
      return;
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
