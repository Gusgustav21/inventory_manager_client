import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import { getProducts, patchAvailability } from "../services/ProductService";
import type { Product } from "../types";
import ProductDetails from "../components/ProductDetails";

export async function loader() {
    const products = await getProducts()
    return products
}

export async function action({ request }: ActionFunctionArgs ) {
    const data = Object.fromEntries(await request.formData())

    await patchAvailability(+data.id)

    return {}
}

export default function Products() {

    const products = useLoaderData<Product[]>()

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Products</h2>
                <Link to="/products/new" className="bg-indigo-600 hover:bg-indigo-500 hover:rounded-lg transition-all text-white font-bold py-2 px-4 rounded-sm">
                    Add Product
                </Link>
            </div>
            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Product</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Availability</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <ProductDetails key={product.id} product={product} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
