import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'

const cors = Cors({
	origin: [
		'http://localhost:8000',
		'https://film-collection-site-management.vercel.app',

	],
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
	credentials: true,
	allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
})

export function corsMiddleWare(req: NextApiRequest, res: NextApiResponse,) {
	return new Promise((resolve, reject) => {
		cors(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result)
			}
			return resolve(result)
		})
	})
}