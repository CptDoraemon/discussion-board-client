import {useState} from "react";
import urls from "./urls";
import useFetchWithTokenVerification from "./use-fetch-with-token-verification";

const usePostSubmission = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const fetchWithTokenVerification = useFetchWithTokenVerification();

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

            //
            objectURLArray = removeUnusedObjectURL(content, objectURLArray);

            //
            const form = await getForm(title, content, objectURLArray);
            const res = await fetchWithTokenVerification(true, urls.createPost, {
                method: 'POST',
                body: form
            });
            const json = await res.json();
            setLoading(false);
            if (json.status === 'success') {
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

        const promiseArray = objectURLArray.map((url) => getBlobFromObjectURL(url));

        Promise.all<NamedBlob>(promiseArray)
            .then(blobs => {
                blobs.forEach((blob, i) => {
                    // blob name has format of:
                    // blob:http://localhost:3000/f4d49560-de4e-420b-bcdf-64bfa833a555
                    // use the pathname as the filename (eg: f4d49560-de4e-420b-bcdf-64bfa833a555)
                    // replace the url in content with the new filename
                    const urlComponents = blob.name.split('/');
                    let filename = urlComponents[urlComponents.length - 1].length === 0 ?
                        urlComponents[urlComponents.length - 2] :
                        urlComponents[urlComponents.length - 1];

                    content = content.replace(blob.name, filename);
                    // file ext is .jpg because it was loaded with js, drawn in canvas ans exported as jpg
                    form.append(`file${i}`, blob.blob, blob.name + '.jpg')
                });
                form.append('content', content);
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