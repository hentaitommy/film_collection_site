import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	try {
		let prisma: PrismaClient;
		switch (req.method) {
			case 'GET':
				const filmId = +(req.query.filmId as string)
				prisma = new PrismaClient()
				const comments = await prisma.comment.findMany({
					where: {
						filmId
					}
				})
				res.status(200).json(comments);
				await prisma.$disconnect()
				break

			case 'POST':
				prisma = new PrismaClient()
				const comment = await prisma.comment.create({
					data: {
						filmId: +(req.query.filmId as string),
						username: req.body.username,
						content: req.body.content,
					}
				})
				res.status(200).json(comment);
				await prisma.$disconnect()
				break
				
			case 'OPTIONS':
				res.status(200).send(null)
				break;
			default:
				res.status(405).json({ error: 'Method not allowed' })
		}
	} catch (error: any) {
		console.log(error)
		res.status(500).json(error);
	}
}