
// components/inventoryLogs.tsx
import { Product } from '@prisma/client'

type Log = {
  id: string;
  createdAt: Date;
  type: string;
  quantity: number;
}
import { formatDistanceToNow } from 'date-fns'

// 로그를 날짜순으로 정렬하고 표시하는 함수
function sortAndFormatLogs(products: (Product & { logs: Log[] })[]) {
    // 모든 제품의 로그를 하나의 배열로 합치기
    const allLogs = products.flatMap(product =>
        product.logs.map((log: { id: string, createdAt: Date, type: string, quantity: number }) => ({
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

export default function InventoryLogs({ products }: { products: (Product & { logs: Log[] })[] }) {
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