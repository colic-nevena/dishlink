import IUserRepository from "../../domain/user/IUserRepository";
import GetUserById, { GetUserByIdRequest } from "./GetUserById";

export default class Queries {
    constructor(
        private readonly _userRepository: IUserRepository
    ) {}

    public getUser(request: GetUserByIdRequest) {
        return new GetUserById(request, this._userRepository)
    }
}