
export class customError {
    static createError({name="Error", cause, message, errorCode=1}) {
        const error = new Error(message, {cause});
        error.name = name;
        error.code = errorCode;
        
        console.log(error);
        throw error;
    };
};