import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import logo from '../assets/img/logo/12.png';
import '../assets/css/Register.css';
import { Translator, useLang } from '../translator/Translator';
import FloatingButtons from '../floatingbuttons/FloatingButtons';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const { lang } = useLang();
  const navigate = useNavigate();
  const [showOld, setShowOld] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("api/accounts/login/", {
        username: form.username,
        password: form.password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      window.dispatchEvent(new Event("authChanged"));

      navigate("/"); // 👈 после входа лучше вести на главную или профиль
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Авторизуйтесь снова");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.dispatchEvent(new Event("authChanged"));
        navigate("/login");
      } else {
        alert(err.response?.data?.error || "Ошибка входа");
      }
    }
  };

  return (
    <div>
      <FloatingButtons />
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-header-box">
                <br /><br /><br />
                <h1 className="text-anime">
                  {lang === 'uz' ? "Tizimga kirish" : "Вход"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <img src={logo} alt="logo" />

        {/* Username */}
        <input
          name="username"
          type="name"
          placeholder={lang === 'uz' ? "Foydalanuvchi ismi" : "Имя пользователя"}
          value={form.username}
          onChange={handleChange}
          required
        />
        {/* Password */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}>
          <input
            name="password"
            type={showOld ? "text" : "password"}
            placeholder={lang === 'uz' ? "Parol" : "Пароль"}
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowOld(!showOld)}
            style={{ marginLeft: '5px', width: 'max-content', marginTop: '-15px' }}
            className="theme-togglee"
          >
            {showOld ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        <button
          type="submit"
          className="btn-default"
          style={{ background: 'green' }}
        >
          {lang === 'uz' ? "Tizimga kirish" : "Войти"}
        </button>

        <br /><br />
        <a href="/change-password" style={{ color: 'var(--text-color)' }}>
          {lang === 'uz' ? "Parolni unutdingizmi?" : "Забыль Пароль?"}
        </a>
        <br />
      </form>
    </div>
  );
}