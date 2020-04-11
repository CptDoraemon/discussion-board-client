import {useEffect, useState} from "react";
import urls from "./urls";

const useGetPostList = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchPostList()
    }, []);

    const fetchPostList = (
    ) => {
        // reset states
        setError(false);

        // start fetching
        setLoading(true);
        fetch(urls.getPostList, {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json'
            // }
        })
            .then((res) => res.json())
            .then(json => {
                setLoading(false);
                console.log(json);

                if (json.status === 'success') {
                    console.log(json.data)
                } else {
                    console.log(json);
                    setError(true);
                }
            })
            .catch(e => {
                setLoading(false);
                console.log(e);
                setError(true);
            });
    };

    return [loading, error] as [typeof loading, typeof error]

};

export default useGetPostList