import ContextContainer from "../../domain/ContextContainer";
import ChangeUserRole, { ChangeUserRoleRequest } from "./ChangeUserRole";

export default class Commands {
    constructor(
        private readonly _context: ContextContainer
    ) { }

    public changeUserRole(request: ChangeUserRoleRequest) {
        return new ChangeUserRole(request, this._context)
    }
}