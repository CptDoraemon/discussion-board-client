import {useEffect, useState} from "react";
import urls from "./urls";

const useGetTagList = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<string[][] | null>(null);

    useEffect(() => {
        getTagList()
    }, []);

    const getTagList = async (
    ) => {
        try {
            if (loading) return;

            // reset states
            setError(false);

            // start fetching
            setLoading(true);
            const res = await fetch(urls.tagList);
            const json = await res.json();
            setLoading(false);

            if (json.status === 'success') {
                setData(json.data)
            } else {
                console.log(json);
                setError(true);
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
            setError(true);
        }
    };

    return [loading, error, data] as [typeof loading, typeof error, typeof data]

};

export default useGetTagList