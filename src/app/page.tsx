// app/page.tsx
import { Suspense } from 'react'
import { Card } from "@/components/ui/card"
import CreateProductForm from '@/components/CreateProductForm'
import InventoryStats from '@/components/InventoryStats'
import InventoryLogs from '@/components/InventoryLogs'
// import SearchProducts from '@/components/SearchProducts'
import { fetchProducts } from '@/lib/actions'
import Decimal from 'decimal.js'

export default async function Home() {
    // 초기 데이터 가져오기
// Ensure that the `fetchProducts` function or the products data structure casts the `logs` to the correct `Log[]` type.
    const { products } = await fetchProducts(1, 10) as { products: ({ id: number; maker: string; name: string; price: Decimal; quantity: number; createdAt: Date; updatedAt: Date; } & { logs: Log[]; })[] }

    return (
        <>
            {/*<header className="absolute z-99 bg-temp_basic w-full h-1/4 flex">*/}
            {/*    <Card className="p-4">*/}
            {/*        <Suspense fallback={<div>검색중...</div>}>*/}
            {/*            <div />*/}
            {/*        </Suspense>*/}
            {/*    </Card>*/}
            {/*</header>*/}

            <div className="w-1/4 fixed h-full bg-temp_basic">
                {/* Create 섹션 */}

                    <Card className="h-1/4 z-0 w-full bg-primary shadow-xl rounded-3xl">
                    <CreateProductForm />
                    </Card>


                {/* Total 섹션 */}
                <div className="min-h-1/4 w-full shadow-m">
                    <Card className="p-6">
                        <div
                            className="flex font-bold text-m mt-2 mx-auto w-3/5 h-1/4 shadow-l bg-gray-100 bg-opacity-40 rounded-full">
                            <button className="w-1/2 h-full font-mono bg-green-800 bg-opacity-40 rounded-full">
                                hold
                            </button>
                            <button className="w-1/2 h-full font-mono rounded-full">
                                target
                            </button>
                            <button className="w-1/2 h-full font-mono rounded-full">
                                calc
                            </button>
                        </div>
                        <Suspense fallback={<div>통계 계산중...</div>}>
                            <InventoryStats products={products}/>

                        </Suspense>
                    </Card>
                </div>
                {/* LOGS 섹션 */}
                <div className="w-full">
                    <Card className="w-full p-4">
                        <div className="h-[400px] bg-background shadow-xl">
                            <h2 className="text-temp_font font-bold mx-auto w-5 h-5 mb-2">logs</h2>
                            <Suspense fallback={<div>로그 불러오는중...</div>}>
                                <InventoryLogs products={products}/>

                                <div/>
                            </Suspense>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}