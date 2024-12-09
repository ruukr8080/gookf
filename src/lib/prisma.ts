// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// 개발할 때 핫 리로드 때문에 connection 존나 많이 생기는거 방지
const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

// 이미 있으면 재사용, 없으면 새로 만들기
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma