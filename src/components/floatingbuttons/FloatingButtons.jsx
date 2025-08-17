// FloatingMenu.jsx
import React, { useState } from "react";
import { FaInstagram, FaTelegramPlane, FaTimes, FaCommentDots } from "react-icons/fa";
import { Translator, useLang } from "../translator/Translator";
import ru from '../assets/img/icon/russia.png'
import uz from '../assets/img/icon/uzbekistan.png'

const FloatingButtons = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const { lang, setLang } = useLang();

    return (
        <div style={styles.container}>
            {/* Кнопки меню */}
            <div style={{ ...styles.menu, transform: open ? "translateY(0)" : "translateY(20px)", opacity: open ? 1 : 0 }}>
                <a href="https://www.instagram.com/enerjiproject?igsh=bmozcmUxNGMyMHRp" style={{ ...styles.button, backgroundColor: "#FF3338" }}>
                    <FaInstagram style={styles.icon} />
                </a>
            </div>

            <div style={{ ...styles.menu, transform: open ? "translateY(0)" : "translateY(20px)", opacity: open ? 1 : 0 }}>
                <a href="https://t.me/Enerjiprojectadmin" target="_blank" rel="noopener noreferrer" style={{ ...styles.button, backgroundColor: "#2196F3" }}>
                    <FaTelegramPlane style={styles.icon} />
                </a>
            </div>

            {/* Основная кнопка */}
            <button
                style={{ ...styles.button, backgroundColor: "#F44336" }}
                onClick={() => setOpen(!open)}
            >
                {open ? <FaTimes style={styles.icon} /> : <FaCommentDots style={styles.icon} />}
            </button>
            <br /><br />

            <ul className="language-selector">
                <li>
                    <button
                        className={lang === 'ru' ? 'active' : ''}
                        onClick={() => setLang('ru')}
                    >
                        <img src={ru} alt="ru" width={40} />
                        {lang === 'ru' && <span className="checkmark">✔</span>}
                    </button>
                </li>
                <li>
                    <button
                        className={lang === 'uz' ? 'active' : ''}
                        onClick={() => setLang('uz')}
                    >
                        <img src={uz} alt="uz" width={40} />
                        {lang === 'uz' && <span className="checkmark">✔</span>}
                    </button>
                </li>
            </ul>
        </div>
    );
};

const styles = {
    container: {
        position: "fixed",
        bottom: "30px",
        right: "20px",
        flexDirection: "column-reverse",
        alignItems: "center",
        gap: "12px",
        zIndex: 9999
    },
    menu: {
        transition: "all 0.3s ease",
    },
    button: {
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
        border: "none",
        top: '18px',
        bottom: '15px',
        marginTop: '15px',
        position: 'relative',
        cursor: "pointer",
        color: "#fff",
        fontSize: "22px",
        textDecoration: "none"
    },
    icon: {
        fontSize: "24px"
    }
};

export default FloatingButtons;
