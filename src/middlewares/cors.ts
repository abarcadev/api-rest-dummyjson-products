import cors from 'cors';
import { URLS_WHITE_LIST } from '../globals/environment';

export const corsMiddleware = () => cors({
    origin: (origin: any, callback: any) => {
        if (URLS_WHITE_LIST.indexOf(origin) !== -1 || !origin) // !origin when front and back have same host and port
            callback(null, true);
        else
            callback(new Error('Not allowed by CORS'))
    }
});