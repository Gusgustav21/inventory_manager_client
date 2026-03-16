import { Link, Form, useActionData, useLoaderData, type ActionFunctionArgs, redirect, type LoaderFunctionArgs } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { updateProduct, getProduct } from '../services/ProductService'
import type { Product } from '../types'
import ProductForm from '../components/ProductForm'

export async function loader({ params }: LoaderFunctionArgs) {
    const { id } = params
    if( id !== undefined) {
        const product = await getProduct(+id)
        if(!product) {
            redirect('/')
        }
        return product
    }
}

export async function action({ request, params }: ActionFunctionArgs){
    
    const data = Object.fromEntries(await request.formData())

    let error = ""

    if(Object.values(data).includes("")) {
        error = "All fields are required"
    }
    if(error.length) return error

    if(params.id !== undefined) {
        await updateProduct(data, +params.id)
        return redirect('/')
    }
}

const availabilityOptions = [
   { name: 'Disponible', value: true},
   { name: 'No Disponible', value: false}
]

export default function EditProduct() {

    const error = useActionData() as string
    
    const product = useLoaderData() as Product

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Edit Product</h2>
                <Link to="/" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-sm">
                    Back to products
                </Link>
            </div>
            <Form
                className="mt-10"
                method='POST'
            >
                {error && <ErrorMessage>{error}</ErrorMessage>}
            
                <ProductForm
                    product={product}
                />

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Availability:</label>
                    <select 
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>

                <input
                type="submit"
                className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                value="Edit Product"
                />
            </Form>
        </>
    )
}
