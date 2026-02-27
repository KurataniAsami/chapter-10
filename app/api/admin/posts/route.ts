// 記事一覧API(管理者)
import { request } from 'http'
import { prisma } from '../../../src/_lib/prisma'
import { NextResponse } from 'next/server'

export type PostIndexResponse = {
  posts: {
    id: number
    title: string
    content: string
    thumbnailUrl: string
    createdAt: Date
    updatedAt: Date
    postCategories: {
      category: {
        id: number
        name: string
      }
    }[]
  }[]
}

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        postCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      }
    })

    return NextResponse.json({ posts }, { status: 200 })
  } catch (error) {
    if ( error instanceof Error)
      return NextResponse.json({ massage: error.message}, { status: 400})
  }
}

// 記事新規作成API
// リクエストの型(送るデータ)
export type CreatePostRequestBody = {
  title: string
  content: string
  categories: { id: number }[]
  thumbnailUrl: string
}

// レスポンス（返す型）
export type CreatePostResponse = {
  id: number
}

export const POST = async (request: Request) => {
  try {
    const body: CreatePostRequestBody = await request.json()

    const { title, content, categories, thumbnailUrl } = body

    const data = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailUrl
      },
    })

    // 中間テーブルのレコード作成(PostとPostCategory)
    for (const category of categories) {
      await prisma.postCategory.create({
        data: {
          categoryId: category.id,
          postId: data.id
        }
      })
    }

    return NextResponse.json({
      id: data.id,
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message}, {status: 400})
    }
  }
}

