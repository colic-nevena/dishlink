export const loginSchema = {
    type: "object",
    required: ["email"],
    properties: {
        email: { type: "string", format: "email" }
    }
}

export const registerSchema = {
    type: "object",
    required: ["fullName", "email", "password"],
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6 },
        fullName: {
            type: "string",
            minLength: 2,
            maxLength: 50,
            pattern: "^[a-zA-Z]+(?: [a-zA-Z]+)*$",
            description: "Full name must contain only letters and single spaces."
        }
    }
}
