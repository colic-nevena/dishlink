import UUID from "../../app/helper/Uuid";
import IUserRepository from "../../persistance/repositories/user/IUserRepository";
import User, { UserDTO } from "./User";

class UserContextError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export default class UserContext {
    constructor(private readonly _userRepository: IUserRepository) { }

    async createUser(userDto: UserDTO): Promise<void> {
        try {
            const user = new User(UUID.newUUID(), userDto.name, userDto.email)
            await this._userRepository.save(user)
        } catch (error) {
            throw new UserContextError("[createUser]" + (error as Error).message)
        }
    }

    async getUser(id: string): Promise<User> {
        try {
            return await this._userRepository.find(id)
        } catch (error) {
            throw new UserContextError("[getUser]" + (error as Error).message)
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        try {
            return await this._userRepository.findByEmail(email)
        } catch (error) {
            throw new UserContextError("[getUserByEmail]" + (error as Error).message)
        }
    }
}