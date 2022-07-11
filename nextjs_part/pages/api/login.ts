import type { NextApiRequest, NextApiResponse } from 'next'
import { signToken } from "@/utils/jwt";
import Cookies from 'cookies'
import { corsMiddleWare } from './_middleware/cors';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	await corsMiddleWare(req, res)
	const cookies = new Cookies(req, res)
	switch (req.method) {
		case 'POST':
			try {
				const { username, password } = req.body
				if (username !== 'admin') {
					return res.status(401)
						.send('用户不存在')
				}
				if (password !== '123456') {
					return res.status(401)
						.send('密码错误')
				}
				cookies.set('token', await signToken(0))
				res.status(200).send(null)
			} catch (error: any) {
				console.log(error)
				res.status(500).json(error);
			}
			break;
		case 'OPTIONS':
			res.status(200).send(null)
			break;
		default:
			res.status(405).json({ error: 'Method not allowed' })
	}
}