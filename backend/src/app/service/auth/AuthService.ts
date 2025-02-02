
import IFirebaseAuthDataSource from "../../../persistance/datasources/auth/IFirebaseAuthDataSource"
import IAuthService, { LoginResponse } from "./IAuthService"

export class AuthServiceError extends Error {
    constructor(message: string) {
        super(`[AuthService] => ${message}`)
    }
}

export default class AuthService implements IAuthService {
    constructor(
        private readonly _firebaseAuthDatasource: IFirebaseAuthDataSource
    ) { }

    async login(email: string): Promise<void> {
        try {
            return await this._firebaseAuthDatasource.login(email)
        } catch (error) {
            throw new AuthServiceError((error as Error).message)
        }
    }

    async register(fullName: string, email: string, password: string): Promise<void> {
        try {
            return await this._firebaseAuthDatasource.register(fullName, email, password)
        } catch (error) {
            throw new AuthServiceError((error as Error).message)
        }
    }

    async resendVerificationEmail(email: string): Promise<void> {
        try {
            return await this._firebaseAuthDatasource.resendVerificationEmail(email)
        } catch (error) {
            throw new AuthServiceError((error as Error).message)
        }
    }
}