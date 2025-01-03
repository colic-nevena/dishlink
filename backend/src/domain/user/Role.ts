export class UnsupportedRoleError extends Error {
    constructor(role: string) {
        super(`[Role] - Error - Provided role is not supported. Role: "${role}"`)
    }
}

export default class Role {
    private static readonly AVAILABLE_ROLES = ["admin", "viewer"]

    private constructor(private readonly _name: string) { }

    static fromString(roleString: string): Role {
        if (!this.AVAILABLE_ROLES.includes(roleString.toLocaleLowerCase()))
            throw new UnsupportedRoleError(roleString)

        return new Role(roleString)
    }

    static admin(): Role {
        return new Role(this.AVAILABLE_ROLES[0])
    }
    
    static viewer(): Role {
        return new Role(this.AVAILABLE_ROLES[1])
    }

    equals(role: Role): boolean {
        return this._name === role._name
    }

    toString() {
        return this._name
    }
}