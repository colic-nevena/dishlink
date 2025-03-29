import User from "../../domain/user/User"

export type UserDTO = {
    id: string
    name: string
    email: string
    friends: string[]
}

export interface IUserDBDatasource {
    getUser(userId: string): Promise<UserDTO>
    getUserByName(name: string): Promise<UserDTO>
    getUserByEmail(email: string): Promise<UserDTO>
    getUserProfile(userId: string): Promise<UserDTO>
    getFriendsFor(userId: string): Promise<UserDTO[]>

    save(user: User): Promise<void>
    delete(userId: string): Promise<void>
}

export default class UserDBDatasource implements IUserDBDatasource {
    async getUser(userId: string): Promise<UserDTO> {
        try {
            return {
                id: userId,
                name: "Test User",
                email: "test@example.com",
                friends: ["2", "3"]
            }
        } catch (error) {
            throw new Error(`[get] - ${(error as Error).message}`)
        }
    }

    async getUserByName(name: string): Promise<UserDTO> {
        try {
            return {
                id: "123abc",
                name,
                email: "test@example.com",
                friends: []
            }
        } catch (error) {
            throw new Error(`[getByName] - ${(error as Error).message}`)
        }
    }

    async getUserByEmail(email: string): Promise<UserDTO> {
        try {
            return {
                id: "generated-id",
                name: "User From Email",
                email,
                friends: []
            }
        } catch (error) {
            throw new Error(`[getByEmail] - ${(error as Error).message}`)
        }
    }

    async getUserProfile(userId: string): Promise<UserDTO> {
        try {
            return {
                id: userId,
                name: "John Doe",
                email: "john.doe@example.com",
                friends: ["2", "3"]
            }
        } catch (error) {
            throw new Error(`[getProfile] - ${(error as Error).message}`)
        }
    }

    async getFriendsFor(userId: string): Promise<UserDTO[]> {
        try {
            return [
                {
                    id: "2",
                    name: "Jane Smith",
                    email: "jane.smith@example.com",
                    friends: [userId]
                },
                {
                    id: "3",
                    name: "Bob Johnson",
                    email: "bob.johnson@example.com",
                    friends: [userId]
                }
            ]
        } catch (error) {
            throw new Error(`[getFriends] - ${(error as Error).message}`)
        }
    }

    async save(user: User): Promise<void> {
        try {
            console.log("Saving user to DB...", user)
        } catch (error) {
            throw new Error(`[save] - ${(error as Error).message}`)
        }
    }

    async delete(userId: string): Promise<void> {
        try {
            console.log("User deleted:", userId)
        } catch (error) {
            throw new Error(`[delete] - ${(error as Error).message}`)
        }
    }
}