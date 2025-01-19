import admin from "../../../firebase"
import IFirebaseAuthDataSource, { LoginDTO } from "./IFirebaseAuthDataSource";

export class FirebaseAuthDataSourceError extends Error {
    constructor(message: string) {
        super(`[FirebaseAuthDataSource] => ${message}`);
    }
}

export default class FirebaseAuthDataSource implements IFirebaseAuthDataSource {
    constructor() { }

    async register(fullName: string, email: string, password: string): Promise<void> {
        try {
            const userRecord = await admin.auth().createUser({
                email,
                password,
                displayName: fullName,
            });

            console.log("\nSuccessfully created new user:", userRecord)
        } catch (error) {
            throw new FirebaseAuthDataSourceError((error as Error).message);
        }
    }
}