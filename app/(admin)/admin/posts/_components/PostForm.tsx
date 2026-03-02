// 共通コンポーネント（新規作成のコードと記事編集コードの重複部分をまとめた物）
'use client'
import { Category } from "@/api/admin/posts/[id]/route"

type CategoryProps = {
  title: string
  setTitle: (title: string) => void
  content: string
  setContent: (content: string) => void
  thumbnailUrl: string
  setThumbnailUrl: (thumbnailUrl: string) => void
  categories: Category[]  // 選択されたカテゴリー一覧
  setCategories: (categories: Category[]) => void
  onSubmit: (e: React.FormEvent) => void
  disabled?: boolean
  mode: 'new' | 'edit'
}

export const PostForm: React.FC<CategoryProps> = ({
  title,
  setTitle,
  content,
  setContent,
  thumbnailUrl,
  setThumbnailUrl,
  categories,
  setCategories,
  onSubmit,
  disabled,
  mode,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">

      <div>
        <label>タイトル</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
          disabled={disabled}
        />
      </div>

      <div>
        <label>内容</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 h-40"
          disabled={disabled}
        />
      </div>

      <div>
        <label>画像</label>
        <input
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          className="w-full border p-2"
          disabled={disabled}
        />
      </div>
      
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {mode === 'new' ? '作成' : '更新'}
      </button>

    </form>
  )
}