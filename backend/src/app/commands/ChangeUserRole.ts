import ContextContainer from "../../domain/ContextContainer";
import Role from "../../domain/user/Role";
import Command from "./Command";

export type ChangeUserRoleRequest = {
    userId: string;
    newRole: string;
}

export default class ChangeUserRole implements Command {
    constructor(
        private readonly _request: ChangeUserRoleRequest,
        private readonly _context: ContextContainer
    ) {}

    async execute(): Promise<void> {
        const { userId, newRole } = this._request;

        const user = await this._context.userManager.getUser(userId);
        
        user.changeRole(Role.fromString(newRole));

        if (user.hasChanged.role) {
            await this._context.userManager.changeUserRole(userId, Role.fromString(newRole));
        }
    }
}