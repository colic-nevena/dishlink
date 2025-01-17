import IUserRepository from "../persistance/repositories/user/IUserRepository";
import UserContext from "./user/UserContext";

export default class ContextContainer {
    private readonly _userContext: UserContext

    constructor(
        private readonly userRepository: IUserRepository,
    ) {
        this._userContext = new UserContext(userRepository)
    }

    get userContext(): UserContext {
        return this._userContext
    }
}