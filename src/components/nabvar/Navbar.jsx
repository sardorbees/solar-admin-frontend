import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { Translator, useLang } from "../translator/Translator";
import logo from "../assets/img/logo/12.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import "../assets/css/navbar.css";
import { FaUser } from "react-icons/fa";
import icon from '../assets/img/logo1/add.gif'

export default function AuthModal() {
    const [user, setUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const { lang } = useLang();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
        phone_number: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchUser = () => {
            const token = localStorage.getItem("access");
            if (!token) return setUser(null);
            API.get("api/accounts/profile/")
                .then((res) => setUser(res.data))
                .catch(() => setUser(null));
        };

        fetchUser();

        window.addEventListener("authChanged", fetchUser);

        return () => {
            window.removeEventListener("authChanged", fetchUser);
        };
    }, []);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("api/accounts/login/", {
                username: form.username,
                password: form.password,
            });

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            window.dispatchEvent(new Event("authChanged"));

            setModalOpen(false);
            navigate("/");
        } catch (err) {
            alert("❌ " + (err.response?.data?.error || "Xatolik"));
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", form.username);
        formData.append("password", form.password);
        formData.append("phone_number", form.phone_number);

        try {
            await API.post("api/accounts/register/", formData);
            alert("✅ Ro‘yxatdan o‘tish muvaffaqiyatli");
            setShowLogin(true);
        } catch (err) {
            alert("❌ " + (err.response?.data?.error || "Xatolik ro‘yxatdan o‘tishda"));
        }
    };

    return (
        <>
            <nav style={{ marginTop: "0px" }}>
                <div className="fffa">
                    {user ? (
                        <Link
                            to="/profile"
                            style={{ display: "flex", alignItems: "center", gap: "8px" }}
                        >
                            {user.image && (
                                <img
                                    src={user.image}
                                    alt="avatar"
                                    width="35"
                                    height="35"
                                    style={{ borderRadius: "50%", objectFit: "cover" }}
                                />
                            )}
                            <span style={{ color: "black", fontSize: "22px" }}>
                                <Translator tKey={user.first_name || user.username} />
                            </span>
                        </Link>
                    ) : (
                        <>
                            {/* <Link
                                to="#"
                                className="nav-link animated-register"
                                onClick={() => {
                                    setShowLogin(false);
                                    setModalOpen(true);
                                }}
                            >
                                {lang === "uz" ? "Roʻyxatdan oʻtish" : "Зарегистрироваться"}
                            </Link>
                            |{" "} */}
                            <div className="fiu">
                                <img src={icon} alt="" className="gfdg" width={30}/>
                                <Link
                                    to="#"
                                    className="nav-link animated-link"
                                    onClick={() => {
                                        setShowLogin(true);
                                        setModalOpen(true);
                                    }}
                                >
                                    {lang === "uz" ? "Tizimga kirish" : "Войти"}
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </nav>

            {modalOpen && (
                <div className="auth-modal">
                    <div className="modal-contents">
                        <button className="close-button" onClick={() => setModalOpen(false)}>
                            ×
                        </button>
                        <img src={logo} alt="logo" className="modal-logo" />
                        <h2 className="modal-title">
                            {showLogin
                                ? lang === "uz"
                                    ? "Kirish"
                                    : "Вход"
                                : lang === "uz"
                                    ? "Roʻyxatdan oʻtish"
                                    : "Регистрация"}
                        </h2>

                        <form onSubmit={showLogin ? handleLogin : handleRegister}>
                            <input
                                name="username"
                                type="name"
                                placeholder={lang === "uz" ? "Foydalanuvchi nomi" : "Имя пользователя"}
                                value={form.username}
                                onChange={handleChange}
                                required
                            />

                            <div className="password-container">
                                <label style={{
                                    position: 'absolute',
                                    top: '-15px',
                                    left: '10px',
                                    backgroundColor: 'white',
                                    padding: '0 5px',
                                    fontSize: '14px',
                                    color: '#888'
                                }}>
                                    {lang === "uz" ? "Parol" : "Пароль"}
                                </label>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder={lang === "uz" ? "Sizning parolingiz" : "Ваш Пароль"}
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="theme-togglee"
                                >
                                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>

                            {!showLogin && (
                                <div style={{ position: 'relative', marginBottom: '20px' }}>
                                    <label style={{
                                        position: 'absolute',
                                         top: '-15px',
                                        left: '10px',
                                        backgroundColor: 'white',
                                        padding: '0 5px',
                                        fontSize: '14px',
                                        color: '#888'
                                    }}>
                                        Telefon
                                    </label>
                                    <input
                                        name="phone_number"
                                        type="text"
                                        placeholder='+998'
                                        value={form.phone_number}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            fontSize: '16px',
                                            border: '1px solid #ccc',
                                            borderRadius: '12px',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            )}

                            <button type="submit" className="auth-button">
                                {showLogin
                                    ? lang === "uz"
                                        ? "Kirish"
                                        : "Вход"
                                    : lang === "uz"
                                        ? "Roʻyxatdan oʻtish"
                                        : "Регистрация"}
                            </button>

                            <p className="switch-auth">
                                {showLogin ? (
                                    <span onClick={() => setShowLogin(false)}>
                                        {lang === "uz" ? "Ro‘yxatdan o‘tish" : "Регистрация"}
                                    </span>
                                ) : (
                                    <span onClick={() => setShowLogin(true)}>
                                        {lang === "uz" ? "Tizimga kirish" : "Войти"}
                                    </span>
                                )}
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}