import filmIndex from '@@/static/query.json'
import { useState } from 'react'
import { Input, List } from 'antd';
import Image from 'next/image'
import Link from 'next/link'

export type FilmBrief = {
	title: string
	original_title: string,
	is_tv: boolean,
	year: string,
	id: string,
	poster: string
}

export default function Index() {
	const [filteredIndex, setFilteredIndex] = useState<FilmBrief[]>([])
	const onSearch = (v: string) => {
		setFilteredIndex(
			(filmIndex as FilmBrief[])
				.filter((f) => f.title.includes(v) || f.original_title.includes(v))
		)
	}
	return <>
		<div className='flex justify-center'>
			<div className='w-[800px] h-screen flex flex-col'>
				<div className='text-5xl italic flex justify-center p-8'>Movie Search</div>
				<Input.Search
					className='p-4'
					placeholder="输入关键词搜索电影"
					allowClear
					enterButton="Search"
					size="large"
					onSearch={onSearch}
				/>
				<div className='overflow-auto px-8'>
					<List
						dataSource={filteredIndex}
						renderItem={item => (
							<List.Item>
								<List.Item.Meta
									avatar={<Image src={item.poster} alt={`${item.title}的海报`} width={110} height={160} />}
									title={<Link href={`/film/${item.id}`}>{item.title}</Link>}
									description={<>
										{`电影原名：${item.original_title}`}<br />
										{`上映年份：${item.year}`}<br />
									</>}
								/>
							</List.Item>
						)}
					/>
				</div>

			</div>
		</div>


	</>

}