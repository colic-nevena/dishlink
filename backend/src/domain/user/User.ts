type UserChange = {
    name: boolean
}

export type UserDTO = {
    name: string
    email: string
}

export default class User {
    private _hasChanged: UserChange = { name: false }

    constructor(
        private readonly _id: string,
        private _name: string,
        private readonly _email: string,
    ) { }

    public changeName(name: string): void {
        if (this._name === name) {
            this._hasChanged.name = false
        }

        this._name = name
        this._hasChanged.name = true
    }

    get id(): string { return this._id }

    get name(): string { return this._name }

    get email(): string { return this._email }

    get hasChanged(): UserChange { return this._hasChanged }
}