import { z } from 'zod'

export const newProductSchema = z.object({
    name: z.string().min(2).max(100).nonempty(),
    price: z.number().positive()
})

export const productSchema = z.object({
    id: z.number(),
    name: z.string().nonempty(),
    price: z.number().positive(),
    availability: z.boolean()
})

export const productsSchema = z.array(productSchema)