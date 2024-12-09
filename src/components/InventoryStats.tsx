// components/InventoryStats.tsx
import { Product } from '@prisma/client'

// products 배열을 받아서 통계를 계산하고 표시하는 컴포넌트
export default function InventoryStats({ products }: { products: Product[] }) {
    // 전체 입고된 수량 계산 (모든 제품의 quantity 합)
    const totalSupplied = products.reduce((sum, product) => sum + product.quantity, 0)

    // 남은 재고 수량 계산
    const totalRemaining = totalSupplied

    // 평균 가격 계산 (모든 제품 가격의 평균)
    const averagePrice = products.length > 0
        ? products.reduce((sum, product) => sum + Number(product.price), 0) / products.length
        : 0

    // 총 재고 가치 계산 (각 제품의 수량 * 가격의 합)
    const totalValue = products.reduce(
        (sum, product) => sum + (Number(product.price) * product.quantity),
        0
    )

    return (
        <div className="pt-5 align-center justify-center flex h-[200px] bg-temp_board shadow-xl rounded-2xl">
            <div className="flex flex-col gap-2">
                <div>
                    <span className="pr-2">supplied</span>
                    <input
                        type="text"
                        value={totalSupplied}
                        readOnly
                        className="w-3/5 h-[30px] border border-[#d9d9d9] rounded px-3 bg-gray-50"
                    />
                </div>
                <div>
                    <span className="pr-2">remaining</span>
                    <input
                        type="text"
                        value={totalRemaining}
                        readOnly
                        className="w-[184px] h-[30px] border border-[#d9d9d9] rounded px-3 bg-gray-50"
                    />
                </div>
                <div>
                    <span className="pr-2">average</span>
                    <input
                        type="text"
                        value={`$${averagePrice.toFixed(2)}`}
                        readOnly
                        className="w-[184px] h-[30px] border border-[#d9d9d9] rounded px-3 bg-gray-50"
                    />
                </div>
                <div>
                    <span className="pr-2">total</span>
                    <input
                        type="text"
                        value={`$${totalValue.toFixed(2)}`}
                        readOnly
                        className="w-[184px] h-[30px] border border-[#d9d9d9] rounded px-3 bg-gray-50"
                    />
                </div>
            </div>
        </div>
    )
}

// components/InventoryLogs.tsx
import { Product } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns'

// 로그를 날짜순으로 정렬하고 표시하는 함수
function sortAndFormatLogs(products: Product[]) {
    // 모든 제품의 로그를 하나의 배열로 합치기
    const allLogs = products.flatMap(product =>
        product.logs.map(log => ({
            ...log,
            productName: product.name,
            productMaker: product.maker
        }))
    )

    // 날짜순으로 정렬 (최신순)
    return allLogs.sort((a, b) =>
        b.createdAt.getTime() - a.createdAt.getTime()
    )
}

export default function InventoryLogs({ products }: { products: Product[] }) {
    const logs = sortAndFormatLogs(products)

    return (
        <div className="overflow-y-auto h-[350px] p-4">
            {logs.map(log => (
                <div
                    key={log.id}
                    className="mb-3 p-2 bg-white rounded shadow"
                >
                    <div className="flex justify-between text-sm">
                        <span className="font-semibold">
                            {log.productMaker} - {log.productName}
                        </span>
                        <span className="text-gray-500">
                            {formatDistanceToNow(log.createdAt, { addSuffix: true })}
                        </span>
                    </div>
                    <div className="mt-1 text-sm">
                        <span className={`${
                            log.type === 'hold'
                                ? 'text-green-600'
                                : 'text-red-600'
                        }`}>
                            {log.type === 'hold' ? '입고' : '출고'}: {log.quantity}개
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}