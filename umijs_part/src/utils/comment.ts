import { useState, useEffect, useMemo } from "react"

export type comment = {
	id: number
	username: string
	createdAt: string
	content: string
}

export function useComment(filmId: number | undefined) {
	const [comments, setComments] = useState<comment[]>([])
	const [error, setError] = useState<any>(null)
	async function getComments(filmId: number | undefined) {
		if (filmId === undefined) return
		try {
			const res = await fetch(`https://film-collection-site.vercel.app/api/film/${filmId}/comment`)
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

export async function deleteComment(commentId: number) {
	const res = await fetch(`https://film-collection-site.vercel.app/api/comment/${commentId}`, {
		body: JSON.stringify({
			token: localStorage.getItem('token')
		}),
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return res
} 