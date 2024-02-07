import { Request, Response } from "express";
import { Login } from "./types";
import APIServices from "../../helpers/apiServices";
import { validateReq } from "../../helpers/validationsSchema";
import { userSchema } from "./validations";

export const login = async (req: Request, res: Response) => {
    try {
        const result = validateReq(req.body, userSchema);

        if (!result.success)
            return res.status(400).json({ error: result.error.issues });

        const payload = result.data as Login;
        const data    = await APIServices.login(payload);

        return res.json(data);
    } catch (error: any) {
        if (error?.code === 'ERR_BAD_REQUEST') {
            const { response: { status, data } } = error;
            return res.status(status).json({ message: data.message });
        }
    }
};