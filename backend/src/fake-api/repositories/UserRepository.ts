import User from "../../domain/user/User"
import { IUserDBDatasource, UserDTO } from "../datasources/UserDBDatasource"

export default interface IUserRepository {
    getUser(userId: string): Promise<User>
    getUserByName(name: string): Promise<User>
    getUserByEmail(email: string): Promise<User>
    getUserProfile(userId: string): Promise<User>
    getFriendsFor(userId: string): Promise<User[]>

    save(user: User): Promise<void>
    delete(userId: string): Promise<void>
}

class UserRepositoryError extends Error {
    constructor(message: string) {
        super(`[UserRepository] Error: ${message}`)
    }
}

export default class UserRepository implements IUserRepository {
    constructor(private readonly _userDBDatasource: IUserDBDatasource) { }

    async getUser(userId: string): Promise<User> {
        try {
            const dto = await this._userDBDatasource.getUser(userId)
            return this.mapToUser(dto)
        } catch (error) {
            throw new UserRepositoryError(`[get] - ${(error as Error).message}`)
        }
    }

    async getUserByName(name: string): Promise<User> {
        try {
            const dto = await this._userDBDatasource.getUserByName(name)
            return this.mapToUser(dto)
        } catch (error) {
            throw new UserRepositoryError(`[getByName] - ${(error as Error).message}`)
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        try {
            const dto = await this._userDBDatasource.getUserByEmail(email)
            return this.mapToUser(dto)
        } catch (error) {
            throw new UserRepositoryError(`[getByEmail] - ${(error as Error).message}`)
        }
    }

    async getUserProfile(userId: string): Promise<User> {
        try {
            const dto = await this._userDBDatasource.getUserProfile(userId)
            return this.mapToUser(dto)
        } catch (error) {
            throw new UserRepositoryError(`[getProfile] - ${(error as Error).message}`)
        }
    }

    async getFriendsFor(userId: string): Promise<User[]> {
        try {
            const dtos = await this._userDBDatasource.getFriendsFor(userId)
            return dtos.map(this.mapToUser)
        } catch (error) {
            throw new UserRepositoryError(`[getFriends] - ${(error as Error).message}`)
        }
    }

    async save(user: User): Promise<void> {
        try {
            await this._userDBDatasource.save(user)
            // TODO: await this._usersDSFirebase.save(user)
        } catch (error) {
            throw new UserRepositoryError(`[save] - ${(error as Error).message}`)
        }
    }

    async delete(userId: string): Promise<void> {
        try {
            await this._userDBDatasource.delete(userId)
        } catch (error) {
            throw new UserRepositoryError(`[delete] - ${(error as Error).message}`)
        }
    }

    private mapToUser = (dto: UserDTO): User => {
        return new User(dto.id, dto.name, dto.email, dto.friends)
    }
}