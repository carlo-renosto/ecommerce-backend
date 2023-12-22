
export class customError {
    static createError({name="Error", cause, message, errorCode=1}, option=1) {
        var err = {
            name: name,
            cause: cause,
            message: message,
            errorCode: errorCode
        }

        if(option == 1) {
            this.createErrorThrow(err);
        }
        else {
            return err;
        }
    };

    static createErrorThrow({name, cause, message, errorCode}) {
        const error = new Error(message, {cause});
        error.name = name;
        error.code = errorCode;
        
        throw error;
    }
};