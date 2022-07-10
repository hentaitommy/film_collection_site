import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '../../../utils/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	try {
		let prisma: PrismaClient;
		switch (req.method) {
			case 'DELETE':
				try {
					if (!req.cookies?.token) { return res.status(401).send('Unauthorized') }
					await verifyToken(req.cookies.token)
				} catch (error: any) {
					return res.status(401).json(error);
				}

				prisma = new PrismaClient()
				const comment = await prisma.comment.delete({
					where: {
						id: +(req.query.commentId as string)
					}
				})
				res.status(200).json(comment);
				await prisma.$disconnect()
				break

			default:
				res.status(405).json({ error: 'Method not allowed' })
		}
	} catch (error: any) {
		console.log(error)
		res.status(500).json(error);
	}
}