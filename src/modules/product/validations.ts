import { z } from "zod";

const getAllProductSchema = z.object({
    limit: z.coerce.number({
        required_error: "limit is required",
        invalid_type_error: "limit must be a number"
    }),
    skip: z.coerce.number({
        required_error: "skip is required",
        invalid_type_error: "skip must be a number"
    })
});

const productIdSchema = z.coerce.number({
    invalid_type_error: "id must be a number"
});

const saveProductSchema = z.object({
    title: z.string({
            required_error: "title is required",
            invalid_type_error: "title must be a string"
        })
        .min(2, { message: "title must be 2 or more characters long" })
        .max(30, { message: "title must be 30 or fewer characters long" }),

    description: z.string({
            required_error: "description is required",
            invalid_type_error: "description must be a string"
        })
        .min(2, { message: "description must be 2 or more characters long" })
        .max(30, { message: "description must be 30 or fewer characters long" }),

    price: z.number({
            required_error: "price is required",
            invalid_type_error: "price must be a number"   
        }).positive({ message: "price must be greater than 0" }),

    stock: z.number({
            required_error: "stock is required",
            invalid_type_error: "stock must be a number"   
        }).nonnegative({ message: "stock must be greater than or equal to 0" })
});

export {
    getAllProductSchema,
    productIdSchema,
    saveProductSchema
};