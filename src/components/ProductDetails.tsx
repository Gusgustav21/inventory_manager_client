import { Form, redirect, useFetcher, useNavigate, type ActionFunctionArgs } from "react-router-dom"
import type { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

export async function action({ params }: ActionFunctionArgs) {
    if (params.id !== undefined) await deleteProduct(+params.id)
    return redirect("/")
}

interface ProductDetailsProps {
    product: Product
}
export default function ProductDetails({ product }: ProductDetailsProps) {

    const navigate = useNavigate()
    const fetcher = useFetcher()
    
    const isAvailable = product.availability ? true : false

    return (
        <tr className="border-b " key={product.id}>
            <td className="text-center p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="text-center p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="text-center p-3 text-lg text-gray-800">
                <fetcher.Form
                    method="PATCH"
                >
                    <button
                        type="submit"
                        name="id"
                        value={`${product.id}`}
                        className={`border ${isAvailable ? "text-black border-gray-400 hover:bg-slate-400" : "text-red-500 border-red-400 hover:bg-red-500 hover:text-white" } 
                                        rounded-lg p-2 transition-all w-full text-center text-xs font-bold uppercase hover:cursor-pointer`}
                    >
                        {isAvailable ? "Available" : "Not available"}
                    </button>
                </fetcher.Form>
                
            </td>
            <td className="text-center p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button 
                        onClick={() => navigate(`/products/${product.id}/edit`)} 
                        className="p-2 text-center bg-indigo-500 rounded-sm hover:rounded-lg uppercase font-bold text-sm w-full transition-all text-white hover:bg-indigo-600"
                    >
                        Edit
                    </button>
                    <Form 
                        action={`products/${product.id}/delete`}
                        method="POST"
                        className="p-2 text-center bg-red-600 rounded-sm hover:rounded-lg uppercase font-bold text-sm w-full transition-all text-white hover:bg-red-700"
                        onSubmit={(e) => {
                            if( !confirm("r u sure bro?") ) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <input
                            type="submit"
                            value="Delete"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}
