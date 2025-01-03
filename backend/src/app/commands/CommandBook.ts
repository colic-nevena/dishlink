import Command from "./Command";
import Commands from './Commands';

interface CommandSelector {
    (commands: Commands): Command
}

export class CommandBookError extends Error {
    constructor(message: string) {
        super(`[CommandBook] Error - ${message}`);
    }
}

export default class CommandBook {
    constructor(private readonly _commands: Commands) {}

    async execute(selectCommand: CommandSelector) {
        try {
            const command = selectCommand(this._commands)
            await command.execute()
        } catch (error) {
            throw new CommandBookError(`[execute] - ${(error as Error).message}`)
        }
    }    
}