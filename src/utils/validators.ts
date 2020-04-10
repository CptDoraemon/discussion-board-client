type Validator = (value: string) => {isValid: boolean, message: string}

const emailValidator: Validator = (value) => {
    let isValid = false;
    let message = 'Invalid Email format';

    if (value.indexOf('@') === -1) {

    } else if (value.indexOf('.') === -1) {

    } else if (value.length === 0) {
        message = 'Email cannot be empty';
    } else {
        isValid = true;
        message = '';
    }

    return {
        isValid,
        message
    }
};

const passwordValidator: Validator = (value) => {
    let isValid = false;
    let message = '';

    if (value.length === 0) {
        message = 'Email cannot be empty';
    } else {
        isValid = true;
        message = '';
    }

    return {
        isValid,
        message
    }
};

export {
    emailValidator,
    passwordValidator
}