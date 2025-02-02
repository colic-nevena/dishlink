import path from "path"
import fs from "node:fs/promises"
import EmailTemplate, { IEmailTemplate } from "./EmailTemplate"
import { EmailVerificationTemplateData, BaseTemplateData } from "./EmailTemplateDataTypes"

export default class EmailTemplateProvider {

    constructor(
        private readonly _publicUrl: string
    ) { }

    async getEmailVerificationTemplate(data: EmailVerificationTemplateData): Promise<IEmailTemplate> {
        const template = await this.getTemplate("emailVerification", "DishLink Email Verification", data)
        return template
    }

    private completeData<T extends BaseTemplateData>(data: any): T {
        return { HTTP_PUBLIC_URL: this._publicUrl, ...data }
    }

    private async getTemplate(templateType: string, subject: string, templateData: any): Promise<IEmailTemplate> {
        const filePaths = this.getFilePaths(templateType)
        const textTemplate = await this.getTemplateAltText(filePaths.altText)
        const htmlTemplate = await this.getTemplateHTML(filePaths.html)

        return new EmailTemplate(
            subject,
            textTemplate,
            htmlTemplate,
            this.completeData(templateData)
        )
    }

    private getFilePaths(template: string) {
        return {
            altText: `templates/${template}/altText.txt`,
            html: `templates/${template}/html.html`,
        }
    }

    private async getTemplateAltText(fileName: string) {
        const dirPath = path.join(__dirname, fileName)
        return await fs.readFile(dirPath, { encoding: "utf8" })
    }

    private async getTemplateHTML(fileName: string) {
        const dirPath = path.join(__dirname, fileName)
        return await fs.readFile(dirPath, { encoding: "utf8" })
    }
}
