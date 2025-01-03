export default class AuthController {
    constructor() {}

    async login(req: any, res: any) {
        res.send('loginnnnn')
    }

    async logout(req: any, res: any) {
        res.send('logoutttttt')
    }
}