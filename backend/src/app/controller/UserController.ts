import { Request, Response } from "express";
import CommandBook from "../commands/CommandBook";
import QueryBook from "../queries/QueryBook";

export default class UserController {
    constructor(private readonly _commandBook: CommandBook, private readonly _queryBook: QueryBook) { }

    public getUser(req: Request, res: Response) {
        res.send('hello');
    }
}