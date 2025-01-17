import User, { UserDTO } from "../../../domain/user/User"

// IMPORTANT: Repository can combine multiple different datasources if needed

export default interface IUserRepository {
    find(id: string): Promise<User>
    findByEmail(email: string): Promise<User>

    save(user: UserDTO): Promise<void>
    delete(id: string): Promise<void>
}