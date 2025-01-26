import Env from './Env';

type HttpConfig = {
    host: string
    port: number
}

type LogoConfig = {
    url: string
}

export default class Config {
    private readonly _http: HttpConfig
    private readonly _logo: LogoConfig

    constructor(private readonly _env: Env) {
        this._http = this.createHttp()
        this._logo = this.createLogo()
    }

    get http(): HttpConfig {
        return this._http
    }

    get logo(): LogoConfig {
        return this._logo
    }

    private createLogo(): LogoConfig {
        return {
            url: this._env.getString('LOGO_URL')
        }
    }

    private createHttp(): HttpConfig {
        return {
            host: this._env.getString('HTTP_PUBLIC_URL'),
            port: this._env.getInteger('HTTP_PORT'),
        }
    }
}