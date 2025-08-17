import React, { useEffect, useState } from "react";
import axios from "axios";
import call from "../assets/img/icon/call.png";
import data from "../assets/img/icon/data.png";
import CustomModal from "../modal/Modal";
import { Translator, useLang } from "../translator/Translator";
import '../assets/css/LanguageSelector.css' // <-- именованный импорт

function Topbar() {
    const [user, setUser] = useState(null);
    const { lang, setLang } = useLang(); // контекст языка

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            axios
                .get("https://django-admin-pro.onrender.com/api/accounts/profile/", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => setUser(res.data))
                .catch(() => setUser(null));
        }
    }, []);

    return (
        <div className="topbar wow fadeInUp">
            <div className="container">
                <div className="row">
                    {/* Левая часть */}
                    <div className="col-md-8">
                        <div className="topbar-contact-info">
                            <ul>
                                <li>
                                    <a href="tel:+998951481212">
                                        <img src={call} alt="" width={20} /> +998 95 148 12 12
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+998953451212">
                                        <img src={call} alt="" width={20} /> +998 95 345 12 12
                                    </a>
                                </li>
                                <li className="header-buttone call-button">
                                    <CustomModal />
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Правая часть */}
                    <div className="col-md-4">
                        <div className="header-social-links">
                            <a href="tel:+998951481212" className="header-button call-button">
                                <img src={call} alt="" width={20} />
                                <span className="button-text">
                                    {lang === 'uz' ? "QO'NG'IROQ" : "ПOЗВОНИТЬ"}
                                </span>
                            </a>

                            <a href="/contact" className="header-buttonn order-button">
                                <img src={data} alt="" width={20} />
                                <span className="button-text">
                                    {lang === 'uz' ? "MUROJAAT YUBORING" : "ОФОРМИТЬ ЗАЯВКУ"}
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;