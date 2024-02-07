import express, { Request, Response } from "express";
import { HOST, PORT } from "./globals/environment";
import { corsMiddleware } from "./middlewares/cors";
import { registerRoutes } from "./modules/routes";

export default class Server {
    
    private _app : express.Application;
    private _host: string;
    private _port: number;

    constructor() {
        this._app  = express();
        this._host = HOST;
        this._port = PORT;
        this.middlewares();
        this.routes();
        this.routeNotFound();
    }

    private middlewares(): void {
        this._app.disable('x-powered-by');
        this._app.use(corsMiddleware());
        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: true }));
    }
    
    private routes(): void {
        registerRoutes(this._app);
    }

    private routeNotFound(): void {
        this._app.use((req: Request, res: Response) => {
            res.status(404).json({ message: 'Not found' })
        });
    }

    start(): void {
        this._app.listen(this._port, this._host, () => {
            process.env.TZ = 'America/Guayaquil';
            console.log(`Server running at http://${ this._host }:${ this._port }`);
        })
    }

}