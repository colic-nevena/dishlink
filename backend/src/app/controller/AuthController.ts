import IAuthService from "../service/auth/IAuthService"

export default class AuthController {
    constructor(
        private readonly _authService: IAuthService
    ) { }

    async login(req: any, res: any) {
        await this._authService.login(req.body.email)
        return res.status(200).send()
    }

    async register(req: any, res: any) {
        await this._authService.register(req.body.fullName, req.body.email, req.body.password)
        return res.status(201).send()
    }

    async resendVerificationEmail(req: any, res: any) {
        await this._authService.resendVerificationEmail(req.body.email)
        return res.status(201).send()
    }
}