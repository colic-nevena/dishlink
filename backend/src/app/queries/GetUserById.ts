import IUserRepository from "../../fake-api/repositories/UserRepository";
import Query from "./Query";

export type GetUserByIdRequest = {
    id: string
}

export type GetUserByIdResponse = {
    id: string
    name: string
    email: string
}

export default class GetUserById implements Query<GetUserByIdResponse> {
    constructor(
        private readonly _request: GetUserByIdRequest,
        private readonly _userRepo: IUserRepository
    ) { }

    async execute(): Promise<GetUserByIdResponse> {
        const user = await this._userRepo.getUser(this._request.id)

        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}