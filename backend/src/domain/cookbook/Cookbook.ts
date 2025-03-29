type CookbookChange = {
    name: boolean
}

export default class Cookbook {
    private _hasChanged: CookbookChange = { name: false }

    constructor(
        private readonly _id: string,
        private _name: string,
        private readonly _createdBy: string,
        private readonly _createdAt: Date = new Date(),
    ) { }

    changeName(newName: string) {
        if (this._name === newName) return

        this._name = newName
        this._hasChanged.name = true
    }

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

    get hasChanged(): CookbookChange {
        return this._hasChanged
    }
}