import { Request } from "express";
import { AnyZodObject, ZodNumber } from "zod";

const validateReq = (input: Request, schema: AnyZodObject | ZodNumber) => schema.safeParse(input);
const validatePartialReq = (input: Request, schema: AnyZodObject) => schema.partial().safeParse(input);

export {
    validateReq,
    validatePartialReq
};