interface CustomError {
    readonly code: number;
    readonly type: string;
    readonly message: string;
    readonly error_details?: string | Array<string> | null
}

export default class MikuError extends Error implements CustomError {

    readonly code: number;
    readonly type: string;
    readonly error_details?: string | Array<string> | null;

    public constructor({ code, type, message, error_details = null }: CustomError) {
        super()
        this.code = code
        this.type = type
        this.message = message
        this.error_details = error_details
    }
}