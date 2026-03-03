// カテゴリー詳細ページ（管理者）
'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link';
import { CategoryShowResponse } from '@/api/admin/categories/[id]/route';

const CategoryDetail = () => {
  const [category, setCategory] = useState<CategoryShowResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await fetch(`/api/admin/categories/${id}`)
        const data = await response.json()
        setCategory(data.category)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (id) getCategory()
  }, [id])

  if (loading) return <p>loading</p>
  if (error || !category)  return <p>記事が見つかりません</p>
  
  return (
    <div className='w-[800px] mx-auto'>
      {category.thumbnailUrl && (
        <Image
          src={category.thumbnailUrl}
          width={800}
          height={400}
          alt={category.title}
        />
      )}

      <div className='flex justify-between mx-5 items-center my-3'>
        <div>{category.createdAt}</div>
        <div className='border-2 border-blue-500 rounded px-2 py-1 text-blue-500 inline-block'>
          {category.postCategories.map((postCategory) => (
            <span key={postCategory.category.id}>
              {postCategory.category.name}
            </span>
          ))}
        </div>
      </div>
      <h2  className='text-2xl mb-3 mx-4'>
        {category.title}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: category.content }} 
        className='mx-4 mb-20'
      />

      <div>
        {category.postCategories.map((postCategory) => (
          <span key={postCategory.category.id}>
            <>{postCategory.category.name}</>
          </span>
        ))}
      </div>

      <Link
        href={`/admin/categories/${category.id}/edit`}
        className="bg-black text-white px-4 py-2 rounded mr-3"
      >
        編集
      </Link>
      <div className='mt-3'>
        <Link href={'./'}>
          一覧に戻る
        </Link>
      </div>
    </div>
  )
}

export default PostDetail

