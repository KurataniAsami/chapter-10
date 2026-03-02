// 一覧（管理者）
'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PostsIndexResponse } from '@/api/posts/route'

export default function Home() {
  const [posts, setPosts] = useState<PostsIndexResponse["posts"]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllPosts = async () => {
      const res = await fetch('/api/admin/posts')
      const data = await res.json()
      setPosts(data.posts)
      setLoading(false)
    }

    getAllPosts()
  }, [])

  if (loading) return <p>loading</p>
  if (posts.length === 0) return <p>記事が見つかりません</p>

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className="text-2xl font-bold mb-6">記事一覧</h1>
        <Link href={'/admin/new'}
          className="bg-blue-500 text-white p-2"
        >
          新規記事作成
        </Link>
      </div>
    <ul>
      {posts.map((post) => (
        <li key={post.id}
          className='border border-gray-300 max-w-3xl mx-auto my-5'
        >
          <Link
            href={`/admin/posts/${post.id}`}
          >
            <div className='flex justify-between mx-4 my-4'>
              <div>{post.createdAt}</div>
              {post.postCategories.map((postCategory) => (
                <span key={postCategory.category.id}>{postCategory.category.name}</span>
              ))}
            </div>

            <div>
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className='line-clamp-2 mx-4 mb-3'
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
    </div>
  );
}
