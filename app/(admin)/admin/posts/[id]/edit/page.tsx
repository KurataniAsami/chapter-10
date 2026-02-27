'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [loading, setLoading] = useState(true)

  //  フォームの情報を取得
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/admin/posts/${id}`)
      const data = await res.json()

      const post = data.post

      setTitle(post.title)
      setContent(post.content)
      setThumbnailUrl(post.thumbnailUrl ?? '')
      setLoading(false)
    }

    if (id) fetchPost()
  }, [id])

  //  更新処理
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    await fetch(`/api/admin/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        thumbnailUrl,
        categories: [], 
      }),
    })

    router.push('/admin/')
  }

  if (loading) return <p>loading...</p>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">記事編集</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 h-40"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          更新する
        </button>
      </form>
    </div>
  )
}

