import User, { UserDTO } from "./User"

export default interface IUserRepository {
    save(user: UserDTO): Promise<void>
    find(id: string): Promise<User>
    findByEmail(email: string): Promise<User>
    delete(id: string): Promise<void>
}