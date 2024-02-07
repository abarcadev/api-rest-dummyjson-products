import { Request, Response } from "express";
import APIServices from "../../helpers/apiServices";
import { APIPayloadParams, APIPayloadSave } from "../../helpers/apiTypes";
import { PRODUCTS, PRODUCTS_ADD } from "../../globals/urlEndpoints";
import { validatePartialReq, validateReq } from "../../helpers/validationsSchema";
import { 
    getAllProductSchema, 
    productIdSchema, 
    saveProductSchema 
} from "./validations";

export default class ProductController {

    static async getAll(req: Request, res: Response) {
        try {
            const result = validateReq(req.query as any, getAllProductSchema);
            
            if (!result.success)
                return res.status(400).json({ error: result.error.issues });
            
            const query = result.data as unknown as GetAllProductsParams;
            
            const apiPayloadParams: APIPayloadParams = {
                endpoint: PRODUCTS,
                token   : global.token,
                query
            };

            const data = await APIServices.getAll<GetAllProductsResponse>(apiPayloadParams);

            return res.json({ message: 'OK', data });
        } catch (error) {
            return res.status(200).json({ message: 'Products not found' });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const result = validateReq(req.params.id as any, productIdSchema);

            if (!result.success)
                return res.status(400).json({ error: result.error.issues });                

            const id = Number(result.data);

            const apiPayloadParams: APIPayloadParams = {
                endpoint: PRODUCTS,
                token   : global.token,
                id
            };
            
            const data = await APIServices.getById<GetByIdProductResponse>(apiPayloadParams);

            return res.json({ message: 'OK', data });
        } catch (error) {
            return res.status(404).json({ message: 'Product not found' });
        }
    }

    static async insert(req: Request, res: Response) {
        try {
            const result = validateReq(req.body, saveProductSchema);

            if (!result.success)
                return res.status(400).json({ error: result.error.issues });  

            const body = result.data as SaveProductBody;

            const apiPayloadSave: APIPayloadSave<SaveProductBody> = {
                endpoint: PRODUCTS_ADD,
                token   : global.token,
                body                      
            };

            const { data } = await APIServices.insert<SaveProductBody, InsertProductResponse>(apiPayloadSave);

            return res.status(201).json({ message: 'OK', data });
        } catch (error: any) {
            // If the error response is not destructuring, will be return:
            // Request failed with status code 404

            if (error?.code === 'ERR_BAD_REQUEST') {
                const { response: { status, data } } = error;
                return res.status(status).json({ message: data.message });
            }
            else {
                return res.status(400).json({ message: error.message });
            }
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const resultId = validateReq(req.params.id as any, productIdSchema)

            if (!resultId.success)
                return res.status(400).json({ error: resultId.error.issues });

            const resultBody = validatePartialReq(req.body, saveProductSchema);

            if (!resultBody.success)
                return res.status(400).json({ error: resultBody.error.issues });

            const id   = Number(resultId.data);
            const body = resultBody.data as SaveProductBody;

            const apiPayloadSave: APIPayloadSave<SaveProductBody> = {
                endpoint: PRODUCTS,
                token   : global.token,
                id,
                body
            };

            const { data } = await APIServices.update<SaveProductBody, GetByIdProductResponse>(apiPayloadSave);

            return res.status(200).json({ message: 'OK', data });
        } catch (error: any) {
            // If the error response is not destructuring, will be return:
            // Request failed with status code 404

            if (error?.code === 'ERR_BAD_REQUEST') {
                const { response: { status, data } } = error;
                return res.status(status).json({ message: data.message });
            }
            else {
                return res.status(400).json({ message: error.message });
            }
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const result = validateReq(req.params.id as any, productIdSchema);

            if (!result.success)
                return res.status(400).json({ error: result.error.issues });

            const id = Number(result.data);
            
            const apiPayloadParams: APIPayloadParams = {
                endpoint: PRODUCTS,
                token   : global.token,
                id
            };

            await APIServices.delete(apiPayloadParams);

            return res.status(200).json({ message: 'Product deleted' });
        } catch (error: any) {
            // If the error response is not destructuring, will be return:
            // Request failed with status code 404
            
            if (error?.code === 'ERR_BAD_REQUEST') {
                const { response: { status, data } } = error;
                return res.status(status).json({ message: data.message });
            }
            else {
                return res.status(400).json({ message: error.message });
            }
        }
    }

}