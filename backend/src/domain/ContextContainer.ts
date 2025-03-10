import ICookbookRepository from "../fake-api/repositories/CookbookRepository";
import IUserRepository from "../persistance/repositories/user/IUserRepository";
import CookbookContext from "./cookbook/CookbookContext";
import UserContext from "./user/UserContext";

export default class ContextContainer {
    private readonly _userContext: UserContext
    private readonly _cookbookContext: CookbookContext

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly cookbookRepository: ICookbookRepository,
    ) {
        this._userContext = new UserContext(userRepository)
        this._cookbookContext = new CookbookContext(cookbookRepository)
    }

    get userContext(): UserContext {
        return this._userContext
    }

    get cookbookContext(): CookbookContext {
        return this._cookbookContext
    }
}