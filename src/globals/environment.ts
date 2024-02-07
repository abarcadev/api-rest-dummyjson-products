import dotenv from 'dotenv';

dotenv.config();

const HOST            = process.env.HOST || "localhost";
const PORT            = Number(process.env.PORT) || 3000;
const URL_DUMMY_JSON  = process.env.URL_DUMMY_JSON;
const URLS_WHITE_LIST = process.env.URLS_WHITE_LIST?.split(',') || [`${ HOST }:${ PORT }` ];

export {
    HOST,
    PORT,
    URL_DUMMY_JSON,
    URLS_WHITE_LIST
};