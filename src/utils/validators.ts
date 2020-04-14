export type Validator = (value: string, reference?: string) => {isValid: boolean, message: string}

const usernameValidator: Validator = (value) => {
    let isValid = true;
    let message = '';

    if (value.length >= 30) {
        isValid = true;
        message = 'Username length must be less than 30 characters';
    } else if (value.length === 0) {
        isValid = true;
        message = 'Username cannot be empty';
    }

    return {
        isValid,
        message
    }
};

const emailValidator: Validator = (value) => {
    let isValid = true;
    let message = '';

    if (value.indexOf('@') === -1) {
        isValid = false;
        message = 'Invalid Email format'
    } else if (value.indexOf('.') === -1) {
        isValid = false;
        message = 'Invalid Email format'
    } else if (value.length === 0) {
        isValid = false;
        message = 'Email cannot be empty';
    } else if (value.length >= 60) {
        isValid = false;
        message = 'Email too long';
    }

    return {
        isValid,
        message
    }
};

const passwordValidator: Validator = (value) => {
    let isValid = true;
    let message = '';

    if (value.length === 0) {
        isValid = false;
        message = 'Email cannot be empty';
    }

    return {
        isValid,
        message
    }
};

const confirmPasswordValidator: Validator = (value, reference) => {
    let isValid = true;
    let message = '';

    if (value !== reference) {
        message = 'Not same as the password';
        isValid = false;
    }

    return {
        isValid,
        message
    }
};

const postTitleValidator: Validator = (value) => {
    let isValid = true;
    let message = '';

    if (value.length === 0) {
        message = 'Title cannot be empty';
        isValid = false;
    }

    return {
        isValid,
        message
    }
};

const commentValidator: Validator = (value) => {
    let isValid = true;
    let message = '';

    if (value.length === 0) {
        message = 'Comment cannot be empty';
        isValid = false;
    } else if (value.length < 5) {
        message = 'Comment needs to be at least 5 characters';
        isValid = false;
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
    execValidators,
    postTitleValidator,
    commentValidator
}