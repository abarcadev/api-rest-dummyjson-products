import { z } from "zod";

const userSchema = z.object({
    username: z.string({
            required_error: "username is required",
            invalid_type_error: "username must be a string"
        })
        .min(5, { message: "username must be 5 or more characters long" })
        .max(15, { message: "username must be 15 or fewer characters long" }),
    password: z.string({
            required_error: "password is required",
            invalid_type_error: "password must be a string"
        })
        .min(5, { message: "password must be 5 or more characters long" })
        .max(15, { message: "password must be 15 or fewer characters long" })
});

export {
    userSchema
};