import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { ApiRouter } from "../Api";
import AuthController from "../../controller/AuthController";

export default class AuthRouter implements ApiRouter {
    public readonly path = "/auth"

    constructor(private readonly _controller: AuthController) {}
    
    get router(): Router {
        return Router()
            .post('/login', asyncHandler(async (req, res) => this._controller.login(req, res)))
            .post('/logout', asyncHandler(async (req, res) => this._controller.logout(req, res)))
    }
}