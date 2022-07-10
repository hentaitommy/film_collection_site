import { UmiApiRequest, UmiApiResponse } from "umi";
import { signToken } from "@/utils/jwt";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
	switch (req.method) {
		case 'POST':
			try {
				const { username, password } = req.body
				if (username !== 'admin') {
					return res.status(401)
						.json({ message: '用户不存在' })
				}
				if (password !== '123456') {
					return res.status(401)
						.json({ message: '密码错误' })
				}

				res.status(200)
					.setCookie('token', await signToken(0))
					.text('login success')
			} catch (error: any) {
				console.log(error)
				res.status(500).json(error);
			}
			break;
		default:
			res.status(405).json({ error: 'Method not allowed' })
	}
}