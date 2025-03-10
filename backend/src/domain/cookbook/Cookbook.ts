export default class Cookbook {
    constructor(
        private readonly _id: string,
        private readonly _name: string,
        private readonly _createdBy: string,
        private readonly _createdAt: Date = new Date(),
    ) { }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get createdBy(): string {
        return this._createdBy
    }

    get createdAt(): Date {
        return this._createdAt
    }
}