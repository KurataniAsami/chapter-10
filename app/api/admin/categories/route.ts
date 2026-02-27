// カテゴリー 一覧API
import { prisma } from '../../../src/_lib/prisma'
import { NextResponse } from 'next/server'

export type CategryIndexResponse = {
  categories: {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
  }[]
}

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    })

    return NextResponse.json({ categories }, { status: 200 })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message}, { status: 400 })
  }
}

// カテゴリー新規作成
export type CreateCategoryRequestBody = {
  name: string
}

export type CreateCategoryResponse = {
  id: number
}

export const POST = async (request: Request) => {
  try {
    const body = await request.json()

    const { name }: CreateCategoryRequestBody = body

    const data = await prisma.category.create({
      data: {
        name,
      }
    })

    return NextResponse.json<CreateCategoryResponse>({
      id: data.id
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message}, { status: 400 })
    }
  }
}
