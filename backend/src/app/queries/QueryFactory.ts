import IUserRepository from "../../fake-api/repositories/UserRepository";
import GetUserById, { GetUserByIdRequest } from "./GetUserById";

export default class QueryFactory {
    constructor(
        private readonly _userRepository: IUserRepository
    ) { }

    public getGetUserByIdQuery(request: GetUserByIdRequest): GetUserById {
        return new GetUserById(request, this._userRepository);
    }
}
