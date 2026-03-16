import z from "zod"
import { newProductSchema, productSchema } from "../schemas"

export interface NewProduct extends z.infer<typeof newProductSchema> {}

export interface Product extends z.infer<typeof productSchema> {}