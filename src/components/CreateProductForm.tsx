// components/ui/CreateProductForm.tsx
'use client'


import {createProduct} from "@/lib/actions"
import {useState} from "react"

export default function CreateProductForm() {
    const [error, setError] = useState<string>('')

    async function handleSubmit(formData: FormData) {
        const result = await createProduct(formData)
        if (result?.message) {
            setError(result.message)
        }
    }
    return (
        <div className="pt-5 align-center justify-center  h-full shadow-xl rounded-3xl">
            <form className=" w-full h-full" action={handleSubmit}>
                <input
                    name="maker"
                    type={"textAutoComplete"+"maker"}
                    placeholder='company name'
                    className="h-8 border border-temp-basic rounded-l px-3 "
                />
                <input
                    name="name"
                    type="text"
                    placeholder="product name"
                    className="h-8 border border-temp-basic rounded-l px-3"
                />
                <input
                    name="price"
                    type="number"
                    placeholder="price"
                    className="h-8 border border-temp-basic rounded-l px-3"
                />
                <input
                    name="quantity"
                    type="number"
                    placeholder="quantity"
                    className="h-8 border border-[#d9d9d9] rounded px-3"
                />
                <input
                    name="date"
                    type="datetime-local"
                    placeholder="date-time"
                    className="w-1/3 h-8 border border-[#d9d9d9] rounded px-3"
                />
                <span>  ~~  </span>
                <input
                    name="date"
                    type="datetime-local"
                    placeholder="date-time"
                    className="w-1/3 h-[30px] border border-[#d9d9d9] rounded px-3"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                type="submit"
                className="w-1/4 text-temp_font mx-auth font-bold"
                >
                Create
                </button>
            </form>
        </div>
)
}