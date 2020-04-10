import React, {ChangeEvent, useEffect, useState} from "react";

type ChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

const useInputField = (
    defaultValue: string,
    validator: (value: string) => {isValid: boolean, message: string}
) => {
    const [value, setValue] = useState(defaultValue);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validate = () => {
        const validatorResult = validator(value);
        setError(!validatorResult.isValid);
        setErrorMessage(validatorResult.message);

        return validatorResult.isValid
    };

    const changeHandler: ChangeHandler = (e) => {
        if (error) setError(false);
        setValue(e.target.value)
    };

    return [value, changeHandler, error, errorMessage, validate] as [string, ChangeHandler, boolean, string, () => boolean]
};

export default useInputField