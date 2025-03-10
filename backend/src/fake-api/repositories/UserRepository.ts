import User from "../../domain/user/User"

export interface IUserRepository {
    getUserByName(name: string): Promise<User>
    getProfile(userId: string): Promise<User>
    getFriends(userId: string): Promise<User[]>
    find(userId: string): Promise<User>
    findByEmail(email: string): Promise<User>
    save(user: User): Promise<void>
    delete(userId: string): Promise<void>
}

export default class UserRepository implements IUserRepository {
    async getUserByName(name: string): Promise<User> {
        return new User("1", name, `${name}@example.com`)
    }

    async getProfile(userId: string): Promise<User> {
        return new User(userId, "John Doe", "john.doe@example.com")
    }

    async getFriends(userId: string): Promise<User[]> {
        return [
            new User("2", "Jane Smith", "jane.smith@example.com"),
            new User("3", "Bob Johnson", "bob.johnson@example.com")
        ]
    }

    async find(userId: string): Promise<User> {
        return new User(userId, "Test User", "test@example.com")
    }

    async findByEmail(email: string): Promise<User> {
        return new User("generated-id", "User From Email", email)
    }

    async save(user: User): Promise<void> {
        console.log("User saved", user)
    }

    async delete(userId: string): Promise<void> {
        console.log("User deleted:", userId)
    }
}