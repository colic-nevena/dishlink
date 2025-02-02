export type LoginDTO = {
    customToken: string
}

export default interface IFirebaseAuthDataSource {
    login(email: string): Promise<void>
    register(fullName: string, email: string, password: string): Promise<void>
    resendVerificationEmail(email: string): Promise<void>
}