import { UmiApiRequest, UmiApiResponse } from "umi";
import { PrismaClient } from '@prisma/client'

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
	try {
		let prisma: PrismaClient;
		switch (req.method) {
			case 'GET':
				prisma = new PrismaClient()
				const comments = await prisma.comment.findMany({
					where: {
						filmId: +req.params.filmId
					}
				})
				res.status(200).json(comments);
				await prisma.$disconnect()
				break

			case 'POST':
				prisma = new PrismaClient()
				const comment = await prisma.comment.create({
					data: {
						filmId: +req.params.filmId,
						username: req.body.username,
						content: req.body.content,
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