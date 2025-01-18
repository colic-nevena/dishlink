import { Router } from "express"
import asyncHandler from 'express-async-handler';
import { ApiRouter } from "../Api"
import { authMiddleware } from "../middleware/authMiddleware";
import UserController from "../../controller/UserController";

export default class UserRouter implements ApiRouter {
    public readonly path = "/api/data"

    constructor(private readonly _controller: UserController) { }

    get router(): Router {
        return Router()
            .use(authMiddleware)

            .get("/", asyncHandler(async (req, res) => this._controller.getUser(req, res)))
    }
}