import {useState} from "react";

export type LoginStatus = {
    isLogin: boolean,
    username: string
}

export const defaultLoginStatus: LoginStatus = {
    isLogin: false,
    username: ''
};


const useLoginStatus = () => {
    const [loginStatus, setLoginStatus] = useState<LoginStatus>(defaultLoginStatus);

    const updateLoginStatus = (newStatus: LoginStatus) => {
        setLoginStatus(newStatus)
    };

    return [loginStatus, updateLoginStatus] as [LoginStatus, (newStatus: LoginStatus) => void]
};

export default useLoginStatus