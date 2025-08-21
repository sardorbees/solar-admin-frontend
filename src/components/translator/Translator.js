import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
    const [lang, setLangState] = useState("ru");
    const [translations, setTranslations] = useState({});

    // Сохраняем язык в localStorage при изменении
    const setLang = (newLang) => {
        localStorage.setItem("appLang", newLang);
        setLangState(newLang);
    };

    // Загружаем язык из localStorage при инициализации
    useEffect(() => {
        const savedLang = localStorage.getItem("appLang");
        if (savedLang) {
            setLangState(savedLang);
        }
    }, []);

    // Загружаем переводы при изменении языка
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