import Ingredient from "./Ingredient"

export default class Recipe {
    constructor(
        private readonly _id: string,
        private readonly _title: string,
        private readonly _createdBy: string,
        private readonly _cookbookId: string,
        private readonly _ingredients: Ingredient[],
        private readonly _steps: string[],
        private readonly _createdAt: Date = new Date(),
        private readonly _image?: string,
        private readonly _portions?: number,
        private readonly _preparationTime?: string,
        private readonly _specialNote?: string
    ) { }

    get id(): string { return this._id }

    get title(): string { return this._title }

    get createdBy(): string { return this._createdBy }

    get cookbookId(): string { return this._cookbookId }

    get ingredients(): Ingredient[] { return this._ingredients }

    get steps(): string[] { return this._steps }

    get createdAt(): Date { return this._createdAt }

    get image(): string | undefined { return this._image }

    get portions(): number | undefined { return this._portions }

    get preparationTime(): string | undefined { return this._preparationTime }

    get specialNote(): string | undefined { return this._specialNote }
}