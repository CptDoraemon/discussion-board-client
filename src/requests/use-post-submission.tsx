import {useState} from "react";
import urls from "./urls";
import useGetAuthorizationHeader from "./use-get-authorization-header";
import useVerifyToken from "./use-verify-token";
import useRedirectToLogin from "../utils/use-redirect-to-login";

const usePostSubmission = () => {
    const accessHeader = useGetAuthorizationHeader();
    const validateToken = useVerifyToken();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const redirectToLogin = useRedirectToLogin();

    const submit = async (
        title: string,
        content: string,
        objectURLArray: string[]
    ) => {
        try {
            if (loading || submitted) return;

            // reset states
            setError(false);
            setErrorMessage(' ');
            setLoading(true);

            // redirect to login if token not valid
            const isTokenValid = await validateToken();
            if (!isTokenValid) {
                setLoading(false);
                redirectToLogin();
                return
            }

            //
            objectURLArray = removeUnusedObjectURL(content, objectURLArray);

            //
            const form = await getForm(title, content, objectURLArray);
            const res = await fetch(urls.createPost, {
                method: 'POST',
                headers: {
                    ...accessHeader
                },
                body: form
            });
            const json = await res.json();
            setLoading(false);
            if (json.status === 'success') {
                console.log(json);
                setSubmitted(true)
            } else {
                setErrorMessage(json.message);
                setError(true)
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
            setErrorMessage('Server is not available please try again later');
            setError(true)
        }
    };

    return [loading, error, errorMessage, submit, submitted] as [typeof loading, typeof error, typeof errorMessage, typeof submit, typeof submitted]
};

const removeUnusedObjectURL = (content: string, objectURLArray: string[]) => {
    // some images may be deleted while editing

    return objectURLArray.filter(url => content.indexOf(url) !== -1)
};

interface NamedBlob {
    blob: Blob,
    name: string
}

const getForm = (title: string, content: string, objectURLArray: string[]) => {
    return new Promise<FormData>((resolve, reject) => {
        const form = new FormData();
        form.append('title', title);
        form.append('content', content);

        const promiseArray = objectURLArray.map((url) => getBlobFromObjectURL(url));

        Promise.all<NamedBlob>(promiseArray)
            .then(blobs => {
                blobs.forEach((blob, i) => {
                    console.log(blob.name + '.jpg');
                    form.append(`file${i}`, blob.blob, blob.name + '.jpg')
                });
                resolve(form);
            })
    })
};

const getBlobFromObjectURL = (url: string) => {
    return new Promise<NamedBlob>((resolve, reject) => {
        fetch(url)
            .then(res => res.blob())
            .then(blob => resolve({
                blob,
                name: url
            }))
            .catch((e) => reject(e))
    })
};

export default usePostSubmission