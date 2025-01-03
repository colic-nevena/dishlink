import Queries from "./Queries";
import Query from "./Query";

interface QuerySelector {
    (queries: Queries): Query<any>;
}

export class QueryBookError extends Error {
    constructor(message: string) {
        super(`[QueryBook] Error - ${message}`);
    }
}

export default class QueryBook {
    constructor(private _queries: Queries) {}

    async execute<T>(selectQuery: QuerySelector): Promise<T> {
        try {
            const query = selectQuery(this._queries)
            return await query.execute()
        } catch (error) {
            throw new QueryBookError(`[execute] - ${(error as Error).message}`)
        }
    }
}