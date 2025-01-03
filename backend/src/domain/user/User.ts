import Role from "./Role"

type UserChange = {
    name: boolean
    role: boolean
}

export type UserDTO = {
    name: string
    email: string
    role: Role
}

export default class User {
    private _hasChanged: UserChange = { name: false, role: false }

    constructor(
        private readonly _id: string,
        private _name: string,
        private readonly _email: string,
        private _role: Role
    ){ }

    public changeName(name: string): void {
        if (this._name === name) {
            this._hasChanged.name = false
        }

        this._name = name
        this._hasChanged.name = true
    }

    public changeRole(role: Role): void {
        if (this._role === role) {
            this._hasChanged.role = false
        }

        this._role = role
        this._hasChanged.role = true
    }

    public isAdmin(): boolean {
        return this._role.equals(Role.fromString("admin"))
    }

    get id(): string {  return this._id }

    get name(): string { return this._name }

    get email(): string { return this._email }

    get role(): Role { return this._role }

    get hasChanged(): UserChange { return this._hasChanged }
}