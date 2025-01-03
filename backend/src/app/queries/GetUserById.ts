import IUserRepository from "../../domain/user/IUserRepository";
import Query from "./Query";

export type GetUserByIdRequest = {
    id: string
}

export type GetUserByIdResponse = {
    id: string
    name: string
    email: string
}

export default class GetUserById implements Query<GetUserByIdResponse>{
    constructor(
        private readonly _request: GetUserByIdRequest,
        private readonly _userRepo: IUserRepository
    ) {}

    async execute(): Promise<GetUserByIdResponse> {
        const user = await this._userRepo.find(this._request.id)

        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}