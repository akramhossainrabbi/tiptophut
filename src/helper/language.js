import { useEffect, useState } from "react";
import { baseURL } from "./helper";

export const useLanguage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const res = await fetch(
                    `${baseURL}/version2/init/languages`
                );
                const json = await res.json();
                setLanguages(json.data?.languages || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLanguages();
    }, []);

    return { languages };
};

export const useLanguageSelect = () => {
    const getLocalStorageLanguage = localStorage.getItem("language");
    const parsedLanguage = getLocalStorageLanguage || null;
    return { parsedLanguage, getLocalStorageLanguage };
}