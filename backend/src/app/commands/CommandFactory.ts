import ContextContainer from "../../domain/ContextContainer";
export default class CommandFactory {
    constructor(
        private readonly _context: ContextContainer
    ) { }

}
