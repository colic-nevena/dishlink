export class EnvUndefinedError extends Error {
    constructor(envKey: string) {
        super(`[Env] - Error - Environment variable "${envKey}" is not defined.`)
    }
}

export class EnvInvalidError extends Error {
    constructor(envKey: string, varType: string, errorVarType: string) {
        super(`[Env] - Error - Value for environment variable "${envKey}" is not valid. It should be of type ${varType} but instead it got ${errorVarType}.`)
    }
}

export default class Env {
    constructor(private readonly _env: NodeJS.ProcessEnv) {}

    getString(key: string): string {
        const value = this._validate(key)
        return value.toString()
    }

    getInteger(key: string): number {
        const value = this._validate(key)

        const parsed = parseInt(value)
        if (isNaN(parsed)) throw new EnvInvalidError(key, "integer", typeof value)

        return parsed
    }

    getFloat(key: string): number {
        const value = this._validate(key)
        const parsed = parseFloat(value)
        if (isNaN(parsed)) throw new EnvInvalidError(key, "decimal number", typeof value)

        return parsed
    }

    private _validate(key: string) {
        const value = this._env[key]
        if (value === undefined) throw new EnvUndefinedError(key)

        return value
    }
}