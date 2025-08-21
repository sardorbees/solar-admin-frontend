// FloatingMenu.jsx
import React, { useState } from "react";
import { FaInstagram, FaTelegramPlane, FaTimes, FaCommentDots } from "react-icons/fa";
import { useLang } from "../translator/Translator";
import ruFlag from '../assets/img/icon/russia.png';
import uzFlag from '../assets/img/icon/uzbekistan.png';

const FloatingButtons = () => {
    const [open, setOpen] = useState(false);
    const { lang, setLang } = useLang();

    return (
        <div style={styles.container}>
            {/* Social buttons */}
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

            {/* Main toggle button */}
            <button
                style={{ ...styles.button, backgroundColor: "#F44336" }}
                onClick={() => setOpen(!open)}
            >
                {open ? <FaTimes style={styles.icon} /> : <FaCommentDots style={styles.icon} />}
            </button>

            {/* Language Selector */}
            <div style={styles.languageSelector}>
                <button
                    style={{ ...styles.langButton, border: lang === 'uz' ? '2px solid #F44336' : '2px solid transparent' }}
                    onClick={() => setLang('uz')}
                >
                    RU
                </button>
                <button
                    style={{ ...styles.langButton, border: lang === 'ru' ? '2px solid #F44336' : '2px solid transparent' }}
                    onClick={() => setLang('ru')}
                >
                    UZ
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: "fixed",
        bottom: "30px",
        right: "20px",
        display: "flex",
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
        marginTop: "15px",
        cursor: "pointer",
        color: "#fff",
        fontSize: "22px",
        textDecoration: "none"
    },
    icon: {
        fontSize: "24px"
    },
    languageSelector: {
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        marginTop: "15px",
    },
    langButton: {
        backgroundColor: "#fff",
        borderRadius: "50%",
        padding: "6px",
        width: "44px",
        height: "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "border 0.3s",
    },
    flag: {
        width: "24px",
        height: "24px",
        borderRadius: "50%",
    }
};

export default FloatingButtons;