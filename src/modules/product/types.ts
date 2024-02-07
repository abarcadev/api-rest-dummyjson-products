type GetAllProductsParams = {
    limit: number;
    skip : number;
};

type GetAllProductsResponse = {
    products: GetByIdProductResponse[];
    total   : number;
    skip    : number;
    limit   : number;
};

type GetByIdProductResponse = {
    id                : number;
    title             : string;
    description       : string;
    price             : number;
    discountPercentage: number;
    rating            : number;
    stock             : number;
    brand             : string;
    category          : string;
    thumbnail         : string;
    images            : string[];
};

type SaveProductBody = {
    title      : string;
    description: string;
    price      : number;
    stock      : number;   
};

type InsertProductResponse = SaveProductBody & {
    id: number;
};