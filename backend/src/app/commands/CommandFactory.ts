import ContextContainer from "../../domain/ContextContainer";
import ChangeUserRole, { ChangeUserRoleRequest } from "./ChangeUserRole";

export default class CommandFactory {
    constructor(
        private readonly _context: ContextContainer
    ) { }

    public getChangeUserRoleCommand(request: ChangeUserRoleRequest): ChangeUserRole {
        return new ChangeUserRole(request, this._context);
    }
}
