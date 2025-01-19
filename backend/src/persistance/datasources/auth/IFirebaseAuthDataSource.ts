export type LoginDTO = {
    customToken: string
}

export default interface IFirebaseAuthDataSource {
    register(fullName: string, email: string, password: string): Promise<void>
}