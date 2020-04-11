import React, {ChangeEvent, useEffect, useState} from "react";
import {Validator} from "./validators";

type ChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

const useInputField = (
    defaultValue: string,
    validator: Validator
) => {
    const [value, setValue] = useState(defaultValue);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validate = (reference?: string) => {
        const validatorResult = reference ? validator(value, reference) : validator(value);
        setError(!validatorResult.isValid);
        setErrorMessage(validatorResult.message);

        return validatorResult.isValid as boolean
    };

    const changeHandler: ChangeHandler = (e) => {
        if (error) setError(false);
        setValue(e.target.value)
    };

    return [value, changeHandler, error, errorMessage, validate] as [string, ChangeHandler, boolean, string, typeof validate]
};

export default useInputField