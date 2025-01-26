import nodemailer, { Transporter } from "nodemailer";
import { IEmailTemplate } from "./EmailTemplate";

class EmailServiceError extends Error {
    constructor(message: string) {
        super(`[EmailService] - Error - ${message}`)
    }
}

export default class EmailService {
    private readonly _transporter: Transporter

    constructor() {
        this._transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        })
    }

    async sendEmail(to: string, subject: string, text: string) {
        try {
            await this._transporter.sendMail({
                from: `"DishLink" <${process.env.EMAIL_USER}>`,
                to,
                subject,
                text
            });
        } catch (error) {
            throw new EmailServiceError(`[sendEmail] - ${(error as Error).message}`);
        }
    }

    async sendTemplateEmail(to: string, template: IEmailTemplate) {
        try {
            await this._transporter.sendMail({
                from: `"DishLink" <${process.env.EMAIL_USER}>`,
                to,
                subject: template.subject,
                text: template.text,
                html: template.html
            });
        } catch (error) {
            throw new EmailServiceError(`[sendTemplateEmail] - ${(error as Error).message}`);
        }
    }
}