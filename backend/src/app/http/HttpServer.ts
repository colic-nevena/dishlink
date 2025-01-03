import express, { Request, Response, NextFunction } from "express";
import cors from 'cors';
import morgan from "morgan";
import Api from "./Api";

export class HttpRequestError extends Error {
  constructor(private readonly msg: string) {
    super(msg)
  }
}

export default class HttpServer {
  constructor(private readonly _api: Api) {}

  public start(port: number) {
    const app = express()

    app
      .use(cors())
      .use(express.json())
      .use(morgan((tokens, req, res) => {
          return [,
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, "content-length"),
            "-",
            tokens["response-time"](req, res),
            "ms",
          ].join(" ");
        })
      )

    this._api.routers.forEach(({ path, router }) => {
      app.use(path, router)
    })
    
    app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
      const { errorCode, message, status } = this._api.handleError(err);
      res.status(status).json({ message, errorCode });
    })

    app.listen(port, () => {
      console.log(`Server listening on port: ${port}`)
    })      
  }
}