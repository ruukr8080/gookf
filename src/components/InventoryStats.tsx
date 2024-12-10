// components/ui/InventoryStats.tsx
import { Product } from '@prisma/client'

// products 배열을 받아서 통계를 계산하고 표시하는 컴포넌트
export default function InventoryStats({ products }: { products: Product[] }) {
    // 전체 입고된 수량 계산 (모든 제품의 quantity 합)
    const totalSupplied = products.reduce((sum, product) => sum + product.quantity, 0)

    // 남은 재고 수량 계산
    const totalRemaining = products.reduce((sum,product)=>sum - product.quantity, 0)


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
                        className="w-14 h-7 border border-[#d9d9d9] rounded px-3 bg-gray-50"
                    />
                </div>
                <div>
                    <span className="pr-2">remaining</span>
                    <input
                        type="text"
                        value={totalRemaining}
                        readOnly
                        className="w-14 h-7 border border-[#d9d9d9] rounded px-3 bg-gray-50"
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
