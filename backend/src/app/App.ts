import ContextContainer from "../domain/ContextContainer"
import { ICookbookRepository } from "../fake-api/repositories/CookbookRepository"
import { IRecipeRepository } from "../fake-api/repositories/RecipeRepository"
import IUserRepository from "../fake-api/repositories/UserRepository"
import FirebaseAuthDataSource from "../persistance/datasources/auth/FirebaseAuthDataSource"
import CommandFactory from "./commands/CommandFactory"
import Config from "./Config"
import AuthController from "./controller/AuthController"
import PublicController from "./controller/PublicController"
import UserController from "./controller/UserController"
import Api, { ApiRouter } from "./http/Api"
import HttpServer from "./http/HttpServer"
import AuthRouter from "./http/routers/AuthRouter"
import PublicRouter from "./http/routers/PublicRouter"
import UserRouter from "./http/routers/UserRouter"
import QueryFactory from "./queries/QueryFactory"
import AuthService from "./service/auth/AuthService"
import EmailService from "./service/email/EmailService"
import EmailTemplateProvider from "./service/email/EmailTemplateProvider"

export default class App {
    private _httpServer!: HttpServer

    private readonly _userRepository: IUserRepository
    private readonly _cookbookRepository: ICookbookRepository
    private readonly _recipeRepository: IRecipeRepository

    private readonly _context: ContextContainer

    private readonly _commandFactory: CommandFactory
    private readonly _queryFactory: QueryFactory

    constructor(private readonly _config: Config) {
        this._createHttpServer()

        this._userRepository = {} as IUserRepository // TODO
        this._cookbookRepository = {} as ICookbookRepository // TODO
        this._recipeRepository = {} as IRecipeRepository // TODO

        this._context = new ContextContainer(this._userRepository, this._cookbookRepository, this._recipeRepository)

        this._commandFactory = new CommandFactory(this._context)
        this._queryFactory = new QueryFactory(this._userRepository) // TODO: or even better, a repo factory
    }

    start() {
        this._httpServer.start(this._config.http.port)
    }

    private _createHttpServer() {
        const routers: ApiRouter[] = [
            new PublicRouter(new PublicController()),
            new AuthRouter(new AuthController(new AuthService(new FirebaseAuthDataSource(
                new EmailService(),
                new EmailTemplateProvider(`${this._config.http.host}:${this._config.http.port}`),
                this._config.logo,
            ))
            )),
            new UserRouter(new UserController(this._commandFactory, this._queryFactory))
        ]

        this._httpServer = new HttpServer(new Api(routers))
    }
}