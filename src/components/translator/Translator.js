import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
    const [lang, setLang] = useState("ru");
    const [translations, setTranslations] = useState({});

    useEffect(() => {
        axios
            .get(`https://django-admin-pro.onrender.com/api/translations/?lang=${lang}`)
            .then((res) => setTranslations(res.data))
            .catch(() => setTranslations({}));
    }, [lang]);

    return (
        <TranslationContext.Provider value={{ lang, setLang, translations }}>
            {children}
        </TranslationContext.Provider>
    );
}

export function useLang() {
    return useContext(TranslationContext);
}

export function Translator({ tKey }) {
    const { translations } = useLang();
    return <>{translations[tKey] || tKey}</>;
}
