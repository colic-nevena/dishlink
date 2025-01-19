import { Router } from "express"
import asyncHandler from 'express-async-handler';
import { ApiRouter } from "../Api"
import UserController from "../../controller/UserController";
import authenticateToken from "../middleware/authenticateToken";

export default class UserRouter implements ApiRouter {
    public readonly path = "/api/user"

    constructor(private readonly _controller: UserController) { }

    get router(): Router {
        return Router()
            .get(
                "/verify-token",
                authenticateToken,
                asyncHandler(async (req, res) => this._controller.getUser(req, res))
            );
    }
}