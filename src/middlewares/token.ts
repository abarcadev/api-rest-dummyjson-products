import { 
    NextFunction, 
    Request, 
    Response 
} from "express";

export const tokenMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header('Authorization');
    
        if (!token)
            throw new Error('Invalid token');
            // throw 'Invalid token';          
    
        global.token = token;
        global.log = 'LOGGED';
            
        next();
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        } 
        // else {
        //     res.status(401).json({ message: error });
        // }
    }
}