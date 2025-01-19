import { Validator } from "jsonschema";
import { Request, Response, NextFunction } from "express";

const validator = new Validator();

export default function validateBody(schema: object) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const validationResult = validator.validate(req.body, schema);

        if (!validationResult.valid) {
            res.status(400).json({
                message: "Validation failed",
                errors: validationResult.errors.map((error) => error.stack),
            });
            return;
        }

        next();
    };
};
