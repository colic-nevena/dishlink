import { Router } from "express";
import PublicController from "../../controller/PublicController";
import { ApiRouter } from "../Api";

export default class PublicRouter implements ApiRouter {
    public readonly path = "/public"

    constructor(private readonly _controller: PublicController) {}

    get router(): Router {
        return Router()
            .get('/ping', (req, res) => this._controller.ping(req, res))
    }
    
}