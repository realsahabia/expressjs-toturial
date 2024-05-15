export const createUserValidationSchema = {
    name: {
        isLength:{
            options: {
                min: 3,
                max: 32
            },
            errorMessage: "username must be at least 5 to 32 characters"
        },
        notEmpty: {
            errorMessage: "name must not be empty"
        },
        isString: {
            errorMessage: "name must be a string"
        }
    },
    age: {
        isNumeric: {
            errorMessage: "must be a number"
        },
        notEmpty: {
            errorMessage: "must not be empty"
        }
    }
}