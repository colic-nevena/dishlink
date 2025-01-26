import IAuthService from "../service/auth/IAuthService"

export default class AuthController {
    constructor(
        private readonly _authService: IAuthService
    ) { }

    async register(req: any, res: any) {
        await this._authService.register(req.body.fullName, req.body.email, req.body.password)
        res.status(201).send()
    }

    async resendVerificationEmail(req: any, res: any) {
        await this._authService.resendVerificationEmail(req.body.email)
        res.status(201).send()
    }
}