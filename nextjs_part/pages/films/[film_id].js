import { useState } from "react"
export default function DetailPage({data}) {
	const {title} = data
	return (
		<div>{title}</div>
	)

}

export async function getFilmDetail(id) {
	const res = await fetch(`https://douban.8610000.xyz/data/${id}.json`)
	const data = await res.json()
	return data
}

export async function getServerSideProps(context) {
	const filmId = context.params.film_id
	const data = await getFilmDetail(filmId)

	return {
		props: {
			data
		}
	}
}