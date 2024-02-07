type APIPayloadParams = {
    endpoint : string;
    token    : string;
    id      ?: number;
    query   ?: any;
};

type APIPayloadSave<T> = {
    endpoint : string;
    token    : string;
    id      ?: number;
    body     : T; 
};

type APIResponse<T> = {
    status: number;
    data  : T;
};

export {
    APIPayloadParams,
    APIPayloadSave,
    APIResponse
};