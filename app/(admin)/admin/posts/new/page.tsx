// 新規作成ページ
'use client'
import { useState} from "react";
import { useRouter } from 'next/navigation'

export default function CreatePage() {
  const router = useRouter()
  
  const [content, setContent] = useState('')

  const handleSubmit = async (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const res = await fetch('/api/admin/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: formData.get('title'),
      content: formData.get('content'),
      categories: [],
      thumbnailUrl: '',
    }),
  });

  let data: { message?: string } = {};
  try {
    data = await res.json();
  } catch {
    data = { message: 'サーバーからの応答がありませんでした' };
  }

  if (!res.ok) {
    alert("保存失敗: " + (data.message ?? '不明なエラー'));
    return;
  }

  router.push(`/admin/`);
};


  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">新規記事投稿</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title">タイトル</label>
          <input type="text" id="title" name="title" placeholder="タイトルを入力してください"/>
        </div>

        <div>
          <label htmlFor="content">内容</label>
          <textarea
            id="content"
            name="content"
            placeholder="内容を入力してください"
            className="w-full border p-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <button type="button" onClick={()=> handleSubmit}></button>
        </div>
        <button className="submit bg-blue-500 text-white px-4 py-2 rounded">投稿する</button>
      </form>
    </div>
  )
}

