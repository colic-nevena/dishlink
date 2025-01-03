import { randomUUID } from "crypto";

export default class UUID {
    static newUUID(): string {
        return randomUUID()
    }
}