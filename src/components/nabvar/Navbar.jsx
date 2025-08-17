import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { Translator, useLang } from "../translator/Translator"; // импорт Translator и контекста языка

export default function Navbar() {
    const [user, setUser] = useState(null);
    const { lang, setLang } = useLang(); // текущий язык и функция смены языка

    useEffect(() => {
        const fetchUser = () => {
            const token = localStorage.getItem("access");
            if (!token) return setUser(null);
            API.get("api/accounts/profile/")
                .then((res) => setUser(res.data))
                .catch(() => setUser(null));
        };

        fetchUser(); // первый вызов сразу

        const interval = setInterval(fetchUser, 1000); // автообновление каждую секунду

        window.addEventListener("authChanged", fetchUser);

        return () => {
            clearInterval(interval); // очистка интервала при размонтировании
            window.removeEventListener("authChanged", fetchUser);
        };
    }, []);

    return (
        <nav style={{ marginTop: "0px" }}>
            <div className="fffa">
                {user ? (
                    <Link to="/profile" style={{ display: "flex", alignItems: "center", gap: '8px' }}>
                        {user.image && (
                            <img
                                src={user.image}
                                alt="avatar"
                                width="35"
                                height="35"
                                style={{ borderRadius: "50%", objectFit: "cover" }}
                            />
                        )}
                        <span style={{ color: 'black', fontSize: '22px' }}><Translator tKey={user.first_name || user.username} /></span>
                    </Link>
                ) : (
                    <>
                        <Link to="/register" className="nav-link">{lang === 'uz' ? "Roʻyxatdan oʻtish" : "Зарегистрироваться"}</Link> |{" "}
                        <Link to="/login" className="nav-link">{lang === 'uz' ? "Tizimga kirish" : "Войти"}</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
