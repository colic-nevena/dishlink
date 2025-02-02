export type LoginResponse = {
    accessToken: string
}

export default interface IAuthService {
    login(email: string): Promise<void>
    register(fullName: string, email: string, password: string): Promise<void>
    resendVerificationEmail(email: string): Promise<void>
}