'use client'
import { useRouter, useParams } from 'next/navigation'

export default function DeletePostPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const handleDelete = async () => {

    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
      })

      router.push('/admin/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">記事削除</h1>
      <p>この記事を削除しますか？</p>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        削除する
      </button>
    </div>
  )
}

