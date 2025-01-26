export type LoginResponse = {
    accessToken: string
}

export default interface IAuthService {
    register(fullName: string, email: string, password: string): Promise<void>
    resendVerificationEmail(email: string): Promise<void>
}