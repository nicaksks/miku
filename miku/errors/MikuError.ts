interface CustomError {
    readonly code: number;
    readonly type: Errors | string;
    readonly message: string;
    readonly errors?: Errors | string | any
}

interface Errors {
    _errors: Array<{
        code: string,
        message: string
    }>
}

export default class MikuError extends Error implements CustomError {

    readonly code: number;
    readonly type: Errors | string;
    readonly errors?: any;

    public constructor({ code, type, message, errors = null }: CustomError) {
        super()
        this.code = code
        this.type = type
        this.message = message
        this.errors = errors
    }
}