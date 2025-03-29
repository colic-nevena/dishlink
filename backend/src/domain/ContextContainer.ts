import { ICookbookRepository } from "../fake-api/repositories/CookbookRepository"
import { IRecipeRepository } from "../fake-api/repositories/RecipeRepository"
import IUserRepository from "../fake-api/repositories/UserRepository"
import CookbookContext from "./cookbook/CookbookContext"
import UserContext from "./user/UserContext"

export default class ContextContainer {
    private readonly _userContext: UserContext
    private readonly _cookbookContext: CookbookContext

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly cookbookRepository: ICookbookRepository,
        private readonly recipeRepository: IRecipeRepository
    ) {
        this._userContext = new UserContext(userRepository)
        this._cookbookContext = new CookbookContext(cookbookRepository, recipeRepository)
    }

    get userContext(): UserContext {
        return this._userContext
    }

    get cookbookContext(): CookbookContext {
        return this._cookbookContext
    }
}