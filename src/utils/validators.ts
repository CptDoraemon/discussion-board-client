export type Validator = (value: string, reference?: string) => {isValid: boolean, message: string}

const usernameValidator: Validator = (value) => {
    let isValid = false;
    let message = 'Invalid username';

    if (value.length >= 30) {
        message = 'Username length must be less than 30 characters';
    } else if (value.length === 0) {
        message = 'Username cannot be empty';
    } else {
        isValid = true;
        message = '';
    }

    return {
        isValid,
        message
    }
};

const emailValidator: Validator = (value) => {
    let isValid = false;
    let message = 'Invalid Email format';

    if (value.indexOf('@') === -1) {

    } else if (value.indexOf('.') === -1) {

    } else if (value.length === 0) {
        message = 'Email cannot be empty';
    } else if (value.length >= 60) {
        message = 'Email too long';
    }else {
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

const confirmPasswordValidator: Validator = (value, reference) => {
    let isValid = false;
    let message = 'Not same as the password';

    if (value === reference) {
        message = '';
        isValid = true;
    }
    return {
        isValid,
        message
    }
};

const execValidators = (validators: (()=>boolean)[]) => {
    const validationResults = validators.map(_ => _());
    for (let i=0; i<validationResults.length; i++) {
        if (!validationResults[i]) {
            return false
        }
    }

    return true
};

export {
    usernameValidator,
    emailValidator,
    passwordValidator,
    confirmPasswordValidator,
    execValidators
}