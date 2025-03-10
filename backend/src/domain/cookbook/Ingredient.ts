export default class Ingredient {
    constructor(
        private readonly _name: string,
        private readonly _quantity: string,
    ) { }

    get name(): string { return this._name }

    get quantity(): string { return this._quantity }
}