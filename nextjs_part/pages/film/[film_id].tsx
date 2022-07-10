import { useState } from "react"
import Image from 'next/image'

// example page: http://localhost:3000/films/35235502
export default function DetailPage({ data }: { data: any }) {
	const { year, title, original_title, cover, directors, actors, genres, aka, pubdate, tags, rating, intro } = data
	const { url: cover_url, height, width } = cover.image.normal
	return <>
		<div>
			<span>{title}</span>
			<span>{original_title}</span>
			<span>({year})</span></div>
		<div className="flex flex-row">
			<Image src={cover_url} width={width} height={height} alt='电影封面' />
			<div>
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
		<div>
			简介：{intro}
		</div>
		<div>
			用户评论
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