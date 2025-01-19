import { Request, Response } from "express";
import CommandFactory from "../commands/CommandFactory";
import QueryFactory from "../queries/QueryFactory";

export default class UserController {
    constructor(private readonly _commands: CommandFactory, private readonly _queries: QueryFactory) { }

    public getUser(req: Request, res: Response) {
        res.send('hello, radii ti taj token ej!');
    }
}