// components/CreateProductForm.tsx
'use client'

import { Card } from "@/components/ui/card"
import { createProduct } from "@/lib/actions"
import { useState } from "react"

export default function CreateProductForm() {
    const [error, setError] = useState<string>('')

    async function handleSubmit(formData: FormData) {
        const result = await createProduct(formData)
        if (result?.message) {
            setError(result.message)
        }
    }

    return (
        <Card className="flex h-full flex-col gap-2 pt-5 m-auto w-2/5">
            <form action={handleSubmit}>
                <input
                    name="maker"
                    type="text"
                    placeholder="제조사"
                    className="w-[184px] h-[30px] border border-[#d9d9d9] rounded px-3"
                />
                <input
                    name="name"
                    type="text"
                    placeholder="품목"
                    className="w-[184px] h-[30px] border border-[#d9d9d9] rounded px-3"
                />
                <input
                    name="price"
                    type="number"
                    placeholder="가격"
                    className="w-[184px] h-[30px] border border-[#d9d9d9] rounded px-3"
                />
                <input
                    name="quantity"
                    type="number"
                    placeholder="물량"
                    className="w-1/2 h-[30px] border border-[#d9d9d9] rounded px-3"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-[150px] h-[30px] text-temp_font mb-1 font-bold"
                >
                    Create
                </button>
            </form>
        </Card>
    )
}