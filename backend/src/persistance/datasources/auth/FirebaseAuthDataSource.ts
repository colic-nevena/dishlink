import Config from "../../../app/Config"
import EmailService from "../../../app/service/email/EmailService"
import EmailTemplateProvider from "../../../app/service/email/EmailTemplateProvider"
import admin from "../../../firebase"
import knex from "../../knex"
import IFirebaseAuthDataSource from "./IFirebaseAuthDataSource"

export class FirebaseAuthDataSourceError extends Error {
    constructor(message: string) {
        super(`[FirebaseAuthDataSource] => ${message}`)
    }
}

export default class FirebaseAuthDataSource implements IFirebaseAuthDataSource {
    private readonly _table = "users"

    constructor(
        private readonly _emailService: EmailService,
        private readonly _emailTemplateProvider: EmailTemplateProvider,
        private readonly _config: Config["logo"]
    ) { }

    async login(email: string): Promise<void> {
        try {
            const user = await knex(this._table).where({ email }).first()
            if (!user) {
                const firebaseUser = await admin.auth().getUserByEmail(email)

                await knex(this._table).insert({
                    id: firebaseUser.uid,
                    full_name: firebaseUser.displayName,
                    email,
                    created_at: new Date()
                });
            }
        } catch (error) {
            throw new FirebaseAuthDataSourceError((error as Error).message)
        }
    }

    async register(fullName: string, email: string, password: string): Promise<void> {
        let createdUserId: string | null = null

        try {
            const user = await admin.auth().createUser({
                email,
                password,
                displayName: fullName,
            })

            createdUserId = user.uid

            if (createdUserId) {
                const verificationLink = await admin.auth().generateEmailVerificationLink(email)
                await this.sendVerificationEmail(email, verificationLink)

                await knex(this._table).insert({
                    id: createdUserId,
                    full_name: fullName,
                    email: email,
                    created_at: new Date(),
                });
            }
        }
        catch (error) {
            if (createdUserId) {
                try {
                    await admin.auth().deleteUser(createdUserId)
                    await knex(this._table).where({ id: createdUserId }).delete()
                } catch (deleteError) {
                    console.error("Failed to delete user after email failure:", (deleteError as Error).message)
                }
            }

            throw new FirebaseAuthDataSourceError((error as Error).message)
        }
    }

    async resendVerificationEmail(email: string): Promise<void> {
        try {
            const verificationLink = await admin.auth().generateEmailVerificationLink(email)
            await this.sendVerificationEmail(email, verificationLink)
        } catch (error) {
            throw new FirebaseAuthDataSourceError(`Failed to resend verification email: ${(error as Error).message}`)
        }
    }

    private async sendVerificationEmail(email: string, link: string): Promise<void> {
        try {
            const template = await this._emailTemplateProvider.getEmailVerificationTemplate({ EMAIL: email, VERIFICATION_URL: link, LOGO_URL: this._config.url })
            await this._emailService.sendTemplateEmail(email, template)
        }
        catch (error) {
            throw new FirebaseAuthDataSourceError(`Failed to send verification email: ${(error as Error).message}`)
        }
    }
}