// FloatingMenu.jsx
import React, { useState } from "react";
import { FaInstagram, FaTelegramPlane, FaTimes, FaCommentDots } from "react-icons/fa";
import { useLang } from "../translator/Translator";
import ru from '../assets/img/icon/russia.png';
import uz from '../assets/img/icon/uzbekistan.png';
import "../assets/css/FloatingButtons.css";

const FloatingButtons = () => {
    const [open, setOpen] = useState(false);
    const { lang, setLang } = useLang();

    return (
        <div className="floating-container">
            {/* Кнопки соцсетей */}
            <div className={`floating-menu ${open ? "open" : ""}`}>
                <a
                    href="https://www.instagram.com/enerjiproject?igsh=bmozcmUxNGMyMHRp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="floating-btn instagram"
                >
                    <FaInstagram />
                </a>

                <a
                    href="https://t.me/Enerjiprojectadmin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="floating-btn telegram"
                >
                    <FaTelegramPlane />
                </a>
            </div>

            {/* Главная кнопка */}
            <button
                className="floating-btn main"
                onClick={() => setOpen(!open)}
            >
                {open ? <FaTimes /> : <FaCommentDots />}
            </button>

            {/* Переключатель языка */}
            <ul className="language-selector">
                <li>
                    <button
                        className={lang === 'ru' ? 'active' : ''}
                        onClick={() => setLang('ru')}
                    >
                        Ru
                    </button>
                </li>
                <li>
                    <button
                        className={lang === 'uz' ? 'active' : ''}
                        onClick={() => setLang('uz')}
                    >
                        Uz
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default FloatingButtons;
