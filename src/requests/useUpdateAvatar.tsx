import {useState} from "react";
import urls from "./urls";
import useReload from "../utils/use-reload";
import useGetAuthorizationHeader from "./useGetAuthorizationHeader";

const useUpdateAvatar = () => {
    const accessHeader = useGetAuthorizationHeader();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const reload = useReload();

    const upload = (
        file: File | Blob
    ) => {
        return new Promise((resolve, reject) => {
            if (loading) {
                reject();
                return
            }

            // reset states
            setError(false);
            setErrorMessage('');

            // start fetching
            setLoading(true);
            const form = new FormData();
            form.append('image', file, "avatar.jpg");

            fetch(urls.updateAvatar, {
                method: 'POST',
                headers: {
                    ...accessHeader
                },
                body: form
            })
                .then((res) => res.json())
                .then(json => {
                    setLoading(false);
                    console.log(json);

                    if (json.status === 'success') {
                        resolve(true);
                        return
                    } else {
                        setError(true);
                        if (json.status === 'error') {
                            setErrorMessage(json.message)
                        } else {
                            setErrorMessage('Server unavailable, please try again later.')
                        }
                        reject();
                    }
                })
                .catch(e => {
                    setLoading(false);

                    setError(true);
                    setErrorMessage('Server unavailable, please try again later.');
                    reject();
                });
        });
    };

    return [loading, error, errorMessage, upload] as [boolean, boolean, string, typeof upload]

};

export default useUpdateAvatar