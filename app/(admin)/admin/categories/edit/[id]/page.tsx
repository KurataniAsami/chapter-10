// カテゴリー更新
'use client'

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { UpdateCategoryRequestBody } from "@/api/admin/categories/[id]/route"

export default function EditCategoryPage() {
  const { id } = useParams<{ id : string}>()
  const router = useRouter()
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 既存カテゴリデータ取得
  useEffect(() => {
  const fetchCategory = async () => {
    setLoading(true);
      try {
        const res = await fetch(`/api/admin/categories/${id}`)  
        const data = await res.json()   
        setCategory(data.name)  
      } catch (err) {
        setError(err instanceof Error ? err.message : "取得に失敗");
      } finally {
        setLoading(false);
      }
};
fetchCategory();
}, [id])

// 更新処理
const handleSubmit = async (e: { preventDefault: () => void }) => {
  e.preventDefault()

  try {
  await fetch(`/api/admin/categories/${id}`, {
    method: 'PUT',  // 上のURLにPUT（更新リクエスト）を送るという意味
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: category,
    }),
  })
    router.push('/admin/categories')
  } catch (err) {
      setError(err instanceof Error ? err.message : "更新に失敗");
    }
}
if (loading) return <p>loading...</p>

const handleDelete = async () => {
  try {
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: 'DELETE',
    })

    router.push('/admin/categories')
  } catch (err) {
    setError(err instanceof Error ? err.message : '削除に失敗')
  }
}

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">カテゴリー編集</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name">{category}</label>
          <input
            type="text"
            id="name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
            placeholder="カテゴリー名を入力してください"
            required
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          削除する
        </button>
      </form>
    </div>
  )
}
