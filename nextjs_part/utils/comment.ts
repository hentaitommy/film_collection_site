import { useState, useEffect, useMemo } from "react"

export type comment = {
	id: number
	username: string
	createdAt: string
	content: string
}

export function useComment(filmId: number) {
	const [comments, setComments] = useState<comment[]>([])
	const [error, setError] = useState<any>(null)
	async function getComments(filmId: number) {
		try {
			const res = await fetch(`/api/film/${filmId}/comment`)
			const data = await res.json()
			setComments(data)
		} catch (e) {
			setError(e)
		}

	}

	useEffect(() => {
		getComments(filmId)
	}, [filmId])
	const refresh = useMemo(() => () => getComments(filmId), [filmId])
	return [comments, error, refresh] as const
}

export async function postComment(filmId: number, content: string, username: string) {
	const res = await fetch(`/api/film/${filmId}/comment`, {
		method: 'POST',
		body: JSON.stringify({ content, username }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return res
}