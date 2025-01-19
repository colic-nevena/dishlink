import IAuthService from "../service/IAuthService"

export default class AuthController {
    constructor(
        private readonly _authService: IAuthService
    ) { }

    async register(req: any, res: any) {
        await this._authService.register(req.body.fullName, req.body.email, req.body.password)
        res.send()
    }
}