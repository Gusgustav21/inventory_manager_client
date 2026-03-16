import { newProductSchema, productSchema, productsSchema } from '../schemas'
import axios from 'axios'
import type { Product } from '../types'

interface ProductData {
    [k: string]: FormDataEntryValue
}

export async function createProduct(data: ProductData) {
    try {
        const result = newProductSchema.safeParse({
            name: data.name,
            price: +data.price
        })

        console.log(result)
        if (!result.success) {
            throw new Error(result.error.issues.map(issue => issue.message).join(', '))
        } else {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.data.name,
                price: result.data.price
            })
        }

    } catch (error) {
        
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios.get(url)

        const result = productsSchema.safeParse(data.data)

        if (!result.success) {
            throw new Error(result.error.issues.map(issue => issue.message).join(', '))
        } else {
            return result.data
        }
    } catch (error) {
        console.error("Error fetching products:", error)
        return []
    }
}

export async function getProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios.get(url)

        const result = productSchema.safeParse(data.data)

        if (!result.success) {
            throw new Error(result.error.issues.map(issue => issue.message).join(', '))
        } else {
            return result.data
        }
    } catch (error) {
        console.error("Error fetching product:", error)
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
    try {
        const result = productSchema.safeParse({ 
            name: data.name,
            price: +data.price,
            availability: data.availability.toString().toLowerCase() === 'true',
            id
        })
        if (!result.success) {
            throw new Error(result.error.issues.map(issue => issue.message).join(', '))
        } else {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, {
                name: result.data.name,
                price: result.data.price,
                availability: result.data.availability
            })
        }
    } catch (error) {
        console.error("Error updating product:", error)
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.error("Error deleting product:", error)
    }
}

export async function patchAvailability(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.error("Error deleting product:", error)
    }
}