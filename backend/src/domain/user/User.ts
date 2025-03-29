type UserChange = {
    name: boolean
}

export type UserDTO = {
    name: string
    email: string
}

export default class User {
    private _hasChanged: UserChange = { name: false }
    private _friends: Set<string> = new Set()

    constructor(
        private readonly _id: string,
        private _name: string,
        private readonly _email: string,
        friends: string[] = []
    ) {
        this._friends = new Set(friends)
    }

    public changeName(name: string): void {
        if (this._name === name) return

        this._name = name
        this._hasChanged.name = true
    }

    public addFriend(friendId: string): void {
        if (friendId === this._id) throw new Error("Cannot add self as friend.")
        this._friends.add(friendId)
    }

    public removeFriend(friendId: string): void {
        this._friends.delete(friendId)
    }

    public hasFriend(friendId: string): boolean {
        return this._friends.has(friendId)
    }

    get id(): string { return this._id }

    get name(): string { return this._name }

    get email(): string { return this._email }

    get hasChanged(): UserChange { return this._hasChanged }

    get friends(): string[] { return [...this._friends] }
}