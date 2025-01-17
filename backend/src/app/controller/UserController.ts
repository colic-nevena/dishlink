import { Request, Response } from "express";

export default class UserController {
    constructor(private readonly _commands: CommandFactory, private readonly _queries: QueryFactory) { }

    public getUser(req: Request, res: Response) {
        res.send('hello');
    }
}