import { Request, Response } from "express";

export default class PublicController { 
    constructor() {}
    
    public ping(req: Request, res: Response) {
        res.send('pong');
    }
}