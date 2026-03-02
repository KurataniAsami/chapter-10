// 新規作成ページ
'use client'
import { useState} from "react";
import { useRouter } from 'next/navigation'
import { CreatePostRequestBody } from "@/api/admin/posts/route";
import { PostForm } from '../posts/_components/PostForm'
import { Category } from "@/api/admin/posts/[id]/route"

export default function CreatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('https://placehold.jp/800x400.png',)
  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState<string | null>(null)

  // 作成処理
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setLoading(true)

    const body: CreatePostRequestBody = {
      title,
      content,
      thumbnailUrl,
      categories: [],
    }

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        router.push('/admin/')
      } catch(err) {
        setError(err instanceof Error ? err.message : 'ポストを作成できませんでした')
      } finally {
        setLoading(false)
      }
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">新規記事投稿</h1>
      
      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        categories={categories}
        setCategories={setCategories}
        onSubmit={handleSubmit}
        disabled={loading}
        mode="new"
      />
    </div>
  )
}
