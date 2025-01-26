import Config from "../../../app/Config"
import EmailService from "../../../app/service/email/EmailService"
import EmailTemplateProvider from "../../../app/service/email/EmailTemplateProvider"
import admin from "../../../firebase"
import IFirebaseAuthDataSource from "./IFirebaseAuthDataSource"

export class FirebaseAuthDataSourceError extends Error {
    constructor(message: string) {
        super(`[FirebaseAuthDataSource] => ${message}`)
    }
}

export default class FirebaseAuthDataSource implements IFirebaseAuthDataSource {
    constructor(
        private readonly _emailService: EmailService,
        private readonly _emailTemplateProvider: EmailTemplateProvider,
        private readonly _config: Config["logo"]
    ) { }

    async register(fullName: string, email: string, password: string): Promise<void> {
        let createdUserId: string | null = null

        try {
            const user = await admin.auth().createUser({
                email,
                password,
                displayName: fullName,
            })

            createdUserId = user.uid

            const verificationLink = await admin.auth().generateEmailVerificationLink(email)

            await this.sendVerificationEmail(email, verificationLink)
        }
        catch (error) {
            if (createdUserId) {
                try {
                    await admin.auth().deleteUser(createdUserId)
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
            this._emailService.sendTemplateEmail(email, template)
        }
        catch (error) {
            throw new FirebaseAuthDataSourceError(`Failed to send verification email: ${(error as Error).message}`)
        }
    }
}