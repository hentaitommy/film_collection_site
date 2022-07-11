import { useEffect, useState } from "react"
import { useComment, postComment } from "@/utils/comment"
import Image from 'next/image'
import { Input, List, Button, message } from 'antd';

// example page: http://localhost:3000/films/35235502
export default function DetailPage({ data }: { data: any }) {
	const { id, year, title, original_title, cover, directors, actors, genres, aka, pubdate, tags, rating, intro } = data
	const { url: cover_url, height, width } = cover.image.normal
	const [comments, commentError, refresh] = useComment(id)

	const [content, setContent] = useState('')
	const onContentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setContent(e.target.value)
	}
	const [username, setUsername] = useState('')
	const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setUsername(e.target.value)
	}
	const [loading, setLoading] = useState(false)
	const onSubmit = async () => {
		if (!content) {
			message.error('未填写评论内容')
			return
		}
		if (!username) {
			message.error('未填写用户名')
			return
		}

		setLoading(true)
		const res = await postComment(id, content, username)
		if (res.status === 200) {
			refresh()
			setContent('')
		}
		setLoading(false)
	}

	return <>
		<div className="flex justify-center">
			<div className="w-[800px]">
				<div className="text-3xl my-4">
					<span className="mr-2">{title}</span>
					<span className="mr-2">{original_title}</span>
					<span className="mr-2">({year})</span>
				</div>
				<div className="flex flex-row justify-between">
					<Image src={cover_url} width={216} height={304} alt='电影封面' />
					<div className="flex-1 px-4">
						<div>导演：{directors.map((d: any) => d.name).join('/')}</div>
						<div>主演：{actors.map((a: any) => a.name).join('/')}</div>
						<div>类型：{genres}</div>
						<div>上映时间：{pubdate.join('/')}</div>
						<div>又名：{aka.join('/')}</div>
						<div>标签：{tags.map((t: any) => t.name).join('/')}</div>
					</div>
					<div>
						<div>豆瓣评分</div>
						<div>{rating.value}</div>
					</div>
				</div>
				<div className="mt-4">
					简介：{intro}
				</div>
				<div className="mt-4">
					用户评论：
					<List
						dataSource={comments}
						renderItem={item => (
							<List.Item>
								<List.Item.Meta
									title={item.content}
									description={<>
										{`用户：${item.username}`}<br />
										{`发布时间：${(new Date(item.createdAt)).toLocaleString()}`}<br />
									</>}
								/>
							</List.Item>
						)}
					/>
					<Input.TextArea rows={4} value={content} onChange={onContentChange} className='resize-none' placeholder="畅所欲言吧" />
					<div className="flex justify-between my-2">
						<div className="w-64 flex items-center">
							<span className="w-24">用户名：</span>
							<Input value={username} onChange={onUsernameChange} />
						</div>
						<Button onClick={onSubmit} loading={loading}>发表评论</Button>
					</div>

				</div>
			</div>
		</div>
	</>
}

export async function getFilmDetail(id: any) {
	const res = await fetch(`https://douban.8610000.xyz/data/${id}.json`)
	const data = await res.json()
	return data
}

export async function getServerSideProps(context: any) {
	const filmId = context.params.film_id
	const data = await getFilmDetail(filmId)

	return {
		props: {
			data
		}
	}
}