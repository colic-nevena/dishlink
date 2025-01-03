import { Router } from "express"
import { HttpRequestError } from "./HttpServer";

export type ErrorResponse = {
    message: string;
    errorCode: string;
    status: number;
};
  
export interface ApiRouter {
    path: string
    router: Router
}

export default class Api {
    constructor(private readonly _routers: ApiRouter[]) {}

    get routers(): ApiRouter[] {
        return this._routers
    }

    public handleError(error: Error): ErrorResponse {
        let status = error instanceof HttpRequestError ? 400 : 500
        return { message: error.message, errorCode: error.name, status }
    }
}