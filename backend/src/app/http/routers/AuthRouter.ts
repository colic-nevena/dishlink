import { Router } from "express"
import asyncHandler from 'express-async-handler'
import { ApiRouter } from "../Api"
import AuthController from "../../controller/AuthController"
import validateRequestBody from "../middleware/validateRequestBody"
import { loginSchema, registerSchema } from "../schemas/authSchema"

export default class AuthRouter implements ApiRouter {
    public readonly path = "/auth"

    constructor(private readonly _controller: AuthController) { }

    get router(): Router {
        return Router()
            .post(
                '/login',
                validateRequestBody(loginSchema),
                asyncHandler(async (req, res) => this._controller.login(req, res))
            )

            .post(
                '/register',
                validateRequestBody(registerSchema),
                asyncHandler(async (req, res) => this._controller.register(req, res))
            )

            .post(
                '/resend-verification-email',
                asyncHandler(async (req, res) => this._controller.resendVerificationEmail(req, res))
            )
    }
}