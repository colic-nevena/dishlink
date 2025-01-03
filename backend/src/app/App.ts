import Config from "./Config"
import AuthController from "./controller/AuthController"
import Api, { ApiRouter } from "./http/Api"
import AuthRouter from "./http/routers/AuthRouter"
import HttpServer from "./http/HttpServer"
import PublicRouter from "./http/routers/PublicRouter"
import PublicController from "./controller/PublicController"
import UserController from "./controller/UserController"
import UserRouter from "./http/routers/UserRouter"
import CommandBook from "./commands/CommandBook"
import Commands from "./commands/Commands"
import ContextContainer from "../domain/ContextContainer"
import IUserRepository from "../domain/user/IUserRepository"
import QueryBook from "./queries/QueryBook"
import Queries from "./queries/Queries"
import IMeasuringPointRepository from "../domain/measuring/IMeasuringPointRepository"

export default class App {
    private _httpServer!: HttpServer

    private readonly _userRepository: IUserRepository
    private readonly _mpRepository: IMeasuringPointRepository

    private readonly _context: ContextContainer

    private readonly _commandBook: CommandBook
    private readonly _queryBook: QueryBook

    constructor(private readonly _config: Config) {
        this._createHttpServer()

        this._userRepository = {} as IUserRepository // TODO
        this._mpRepository = {} as IMeasuringPointRepository // TODO

        this._context = new ContextContainer(this._userRepository, this._mpRepository)

        this._commandBook = new CommandBook(new Commands(this._context))
        this._queryBook = new QueryBook(new Queries(this._userRepository))
    }

    start() {
        this._httpServer.start(this._config.http.port)
    }

    private _createHttpServer() {
        const routers: ApiRouter[] =
            [
                new PublicRouter(new PublicController()),
                new AuthRouter(new AuthController()),
                new UserRouter(new UserController(this._commandBook, this._queryBook))
            ]

        this._httpServer = new HttpServer(new Api(routers))
    }
}