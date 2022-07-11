import React, { useState } from 'react';
import { history } from "umi";
import { Form, Input, Button, message } from 'antd'

async function login(user: { username: string, password: string }) {
	try {
		const res = await fetch('https://film-collection-site.vercel.app/api/login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
		})

		if (res.status !== 200) {
			message.error((await res.text()));
			return;
		}

		localStorage.setItem("isLogin", "true")
		localStorage.setItem("currentUser", user.username)
		history.push('/');
	} catch (err) {
		console.error(err)
	}
}

export default function Index() {
	const [loading, setLoading] = useState(false)
	const onFinish = async (values: any) => {
		setLoading(true)
		await login(values)
		setLoading(false)
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div className='h-screen flex justify-center items-center bg-blue-300'>
			<div className='bg-blue-100 rounded-lg px-4 pt-4'>
				<Form
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					className='w-96'
				>
					<Form.Item>
						<header className='font-mono text-2xl'>
							Management Login
						</header>
					</Form.Item>
					<Form.Item
						label="Username"
						name="username"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Password"
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 0 }}>
						<Button type="primary" htmlType="submit" loading={loading} className="w-40" >
							Login
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
