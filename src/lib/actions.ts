// app/lib/actions.ts
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// 상품 추가
export async function createProduct(formData: FormData) {
    const maker = formData.get('maker')?.toString()
    const name = formData.get('name')?.toString()
    const quantity = Number(formData.get('quantity'))
    const price = Number(formData.get('price'))

    // 유효성 검사
    if (!maker || maker.length === 0) {
        return { message: '제조사명 넣어라' }
    }
    if (!name || name.length === 0) {
        return { message: '상품명 넣어라' }
    }
    if (isNaN(quantity) || quantity < 0) {
        return { message: '수량은 0 이상의 숫자만' }
    }
    if (isNaN(price) || price < 0) {
        return { message: '가격은 0 이상의 숫자만' }
    }

    try {
        // 상품 생성하고 초기 재고 로그도 같이 기록
        const product = await prisma.product.create({
            data: {
                maker,
                name,
                quantity,
                price,
                logs: {
                    create: {
                        quantity,
                        type: 'hold'  // 초기 입고
                    }
                }
            }
        })

        revalidatePath('/inventory')
        redirect('/inventory')
    } catch (error) {
        console.error('상품 추가 실패:', error)
        return { message: 'error  다시 시도해' }
    }
}

// 상품 목록 조회 (페이지네이션 + 로그 포함)
export async function fetchProducts(page: number = 1, limit: number = 10) {
    try {
        const [products, total] = await Promise.all([
            prisma.product.findMany({
                orderBy: { updatedAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    logs: {
                        orderBy: { createdAt: 'desc' },
                        take: 5  // 최근 5개 로그만
                    }
                }
            }),
            prisma.product.count()
        ])

        return {
            products,
            total,
            pages: Math.ceil(total / limit)
        }
    } catch (error) {
        console.error('상품 조회 실패:', error)
        throw new Error('상품 목록 가져오기 실패함')
    }
}

// 단일 상품 조회 (로그 포함)
export async function fetchProduct(id: number) {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                logs: {
                    orderBy: { createdAt: 'desc' }
                }
            }
        })

        if (!product) throw new Error('상품이 없음')
        return product
    } catch (error) {
        console.error('상품 조회 실패:', error)
        throw new Error('상품 찾을 수 없음')
    }
}

// 재고 수정 (로그도 같이 기록)
export async function updateStock(id: number, formData: FormData) {
    const quantity = Number(formData.get('quantity'))
    const type = formData.get('type')?.toString() || 'hold'

    if (isNaN(quantity)) {
        return { message: '수량을 제대로 입력해라' }
    }

    try {
        // 트랜잭션으로 처리 (재고 업데이트 + 로그 기록 동시에)
        await prisma.$transaction(async (tx) => {
            // 현재 상품 정보 조회
            const product = await tx.product.findUnique({
                where: { id }
            })
            if (!product) throw new Error('상품이 없음')

            // 새 재고 수량 계산
            const newQuantity = product.quantity + quantity

            // 재고가 마이너스 되면 안됨
            if (newQuantity < 0) {
                throw new Error('재고가 부족함')
            }

            // 상품 업데이트
            await tx.product.update({
                where: { id },
                data: {
                    quantity: newQuantity,
                    logs: {
                        create: {
                            quantity,
                            type
                        }
                    }
                }
            })
        })

        revalidatePath('/inventory')
        return { message: '재고 수정 완료!' }
    } catch (error) {
        console.error('재고 수정 실패:', error)
        if (error instanceof Error) {
            return { message: error.message }
        }
        return { message: '재고 수정 실패함' }
    }
}

// 상품 삭제 (로그도 같이 삭제)
export async function deleteProduct(id: number) {
    try {
        await prisma.$transaction(async (tx) => {
            // 로그 먼저 삭제 (외래키 제약조건 때문)
            await tx.inventoryLog.deleteMany({
                where: { productId: id }
            })
            // 그 다음 상품 삭제
            await tx.product.delete({
                where: { id }
            })
        })

        revalidatePath('/inventory')
        return { message: '삭제 완료!' }
    } catch (error) {
        console.error('삭제 실패:', error)
        return { message: '삭제 실패함' }
    }
}