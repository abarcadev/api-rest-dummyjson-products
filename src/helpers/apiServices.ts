import axios from "axios";
import { URL_DUMMY_JSON } from "../globals/environment";
import { Login, User } from "../modules/login/types";
import { 
    APIPayloadParams, 
    APIPayloadSave, 
    APIResponse 
} from "./apiTypes";
import { LOGIN } from "../globals/urlEndpoints";

export default class APIServices {
 
    static async login(payload: Login): Promise<User> {
        const { data } = await axios.post<User>(
            `${ URL_DUMMY_JSON }/${ LOGIN }`,
            payload
        );

        return data;
    }

    static async getAll<R>(payload: APIPayloadParams): Promise<R> {
        const {
            endpoint,
            token,
            query
        } = payload;

        const { data } = await axios.get<R>(
            `${ URL_DUMMY_JSON }/${ endpoint }`,
            {
                headers: { Authorization: token },
                params: { ...query }
            }
        );

        return data;
    }

    static async getById<R>(payload: APIPayloadParams): Promise<R> {
        const {
            endpoint, 
            token,
            id
        } = payload;

        const { data } = await axios.get<R>(
            `${ URL_DUMMY_JSON }/${ endpoint }/${ id }`,
            {
                headers: { Authorization: token }
            }
        );
        
        return data;
    }

    static async insert<B, R>(payload: APIPayloadSave<B>): Promise<APIResponse<R>> {
        const {
            endpoint,
            token,
            body
        } = payload;

        const { status, data } = await axios.post<R>(
            `${ URL_DUMMY_JSON }/${ endpoint }`,
            body,
            {
                headers: { Authorization: token }
            }
        );

        return {
            status,
            data
        };
    }

    static async update<B, R>(payload: APIPayloadSave<B>): Promise<APIResponse<R>> {
        const {
            endpoint,
            token,
            id,
            body
        } = payload;

        const { status, data } = await axios.patch<R>(
            `${ URL_DUMMY_JSON }/${ endpoint }/${ id }`,
            body,
            {
                headers: { Authorization: token }
            }
        );
        
        return {
            status,
            data
        };
    }

    static async delete(payload: APIPayloadParams): Promise<number> {
        const {
            endpoint,
            token,
            id
        } = payload;

        const { status } = await axios.delete(
            `${ URL_DUMMY_JSON }/${ endpoint }/${ id }`,
            {
                headers: { Authorization: token }
            }
        );

        return status;
    }

}