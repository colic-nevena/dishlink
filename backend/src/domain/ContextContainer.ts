import IUserRepository from "./user/IUserRepository";
import UserManager from "./user/UserContext";

export default class ContextContainer {
    private readonly _userManager: UserManager

    constructor(
        private readonly userRepository: IUserRepository,
    ) {
        this._userManager = new UserManager(userRepository)
    }

    get userManager(): UserManager {
        return this._userManager
    }
}