import Config from "./Config"
import AuthController from "./controller/AuthController"
import Api, { ApiRouter } from "./http/Api"
import AuthRouter from "./http/routers/AuthRouter"
import HttpServer from "./http/HttpServer"
import PublicRouter from "./http/routers/PublicRouter"
import PublicController from "./controller/PublicController"
import UserController from "./controller/UserController"
import UserRouter from "./http/routers/UserRouter"
import ContextContainer from "../domain/ContextContainer"
import IUserRepository from "../persistance/repositories/user/IUserRepository"
import CommandFactory from "./commands/CommandFactory"
import QueryFactory from "./queries/QueryFactory"

export default class App {
    private _httpServer!: HttpServer

    private readonly _userRepository: IUserRepository

    private readonly _context: ContextContainer

    private readonly _commandFactory: CommandFactory
    private readonly _queryFactory: QueryFactory

    constructor(private readonly _config: Config) {
        this._createHttpServer()

        this._userRepository = {} as IUserRepository // TODO

        this._context = new ContextContainer(this._userRepository)

        this._commandFactory = new CommandFactory(this._context)
        this._queryFactory = new QueryFactory(this._userRepository) // TODO: or even better, a repo factory
    }

    start() {
        this._httpServer.start(this._config.http.port)
    }

    private _createHttpServer() {
        const routers: ApiRouter[] = [
            new PublicRouter(new PublicController()),
            new AuthRouter(new AuthController()),
            new UserRouter(new UserController(this._commandFactory, this._queryFactory))
        ]

        this._httpServer = new HttpServer(new Api(routers))
    }
}