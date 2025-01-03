import Env from './Env';

type HttpConfig = {
    host: string
    port: number
}

export default class Config {
    private readonly _http: HttpConfig

    constructor(private readonly _env: Env) {
        this._http = this.createHttp()
    }

    get http(): HttpConfig {
        return this._http
    }

    private createHttp(): HttpConfig {
        return {
            host: this._env.getString('HTTP_PUBLIC_URL'),
            port: this._env.getInteger('HTTP_PORT'),
        }
    }
}