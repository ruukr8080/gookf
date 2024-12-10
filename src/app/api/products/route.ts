// app/api/products/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// DB 연결 인스턴스는 전역으로 하나만 만듦
const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 트랜잭션으로 처리 (에러나면 롤백됨)
        const product = await prisma.$transaction(async (tx) => {
            const newProduct = await tx.product.create({
                data: {
                    maker: body.maker,
                    name: body.name,
                    price: body.price,
                    quantity: parseInt(body.quantity)
                }
            });

            // 최초 입고 로그도 같이 생성
            await tx.inventoryLog.create({
                data: {
                    productId: newProduct.id,
                    quantity: newProduct.quantity,
                    type: 'hold'
                }
            });

            return newProduct;
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('상품 등록 실패:', error);
        return NextResponse.json(
            { error: '상품 등록하다가 터짐' },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        // URL에서 검색어 가져옴
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');

        const products = await prisma.product.findMany({
            where: search ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { maker: { contains: search, mode: 'insensitive' } }
                ]
            } : undefined,
            include: {
                // 최근 로그 5개까지만 가져옴
                logs: {
                    take: 5,
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('상품 조회 실패:', error);
        return NextResponse.json(
            { error: '상품 목록 가져오다가 터짐' },
            { status: 500 }
        );
    }
}