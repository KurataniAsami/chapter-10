// カテゴリー作成
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreateCategoryRequestBody } from '@/api/admin/categories/route'

export default function CreateCategoryPage() {
  const router = useRouter()
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 作成処理
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: category }),
      })

      router.push('/admin/categories')
      } catch (err) {
        setError(err instanceof Error ? err.message : "サーバーからの応答がありませんでした");
      } finally {
        setLoading(false)
      }
    } 
 
  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded">
      <h1 className="text-2xl font-bold mb-4">カテゴリー作成</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name">カテゴリー名</label>
          <input
            type="text"
            id="name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
            placeholder="カテゴリー名を入力してください"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          作成
        </button>
      </form>
    </div>
  )
}

