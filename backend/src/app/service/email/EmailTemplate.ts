import { BaseTemplateData } from "./EmailTemplateDataTypes";


export interface IEmailTemplate {
    subject: string;
    text: string;
    html: string;
}

export default class EmailTemplate<TemplateData extends BaseTemplateData> implements IEmailTemplate {

    private readonly _subject: string
    private readonly _textTemplate: string
    private readonly _htmlTemplate: string
    private readonly _fillerData: TemplateData

    constructor(
        subject: string,
        textTemplate: string,
        htmlTemplate: string,
        templateData: TemplateData
    ) {
        this._subject = subject
        this._fillerData = templateData
        this._textTemplate = this.replacePlaceholders(textTemplate)
        this._htmlTemplate = this.replacePlaceholders(htmlTemplate)
    }

    private replacePlaceholders(template: string): string {
        return Object.keys(this._fillerData).reduce((acc, key) => {
            const placeholder = `{{${key}}}`;
            return acc.replace(new RegExp(placeholder, 'g'), (this._fillerData as any)[key]);
        }, template);
    }

    get subject(): string {
        return this._subject;
    }

    get text(): string {
        return this._textTemplate;
    }

    get html(): string {
        return this._htmlTemplate;
    }
}