import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import logo from '../assets/img/logo/12.png';
import '../assets/css/Register.css';
import { Translator, useLang } from '../translator/Translator';
import FloatingButtons from '../floatingbuttons/FloatingButtons';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    phone_number: ""
  });
  const navigate = useNavigate();
  const [showOld, setShowOld] = useState(false);
  const { lang } = useLang();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("password", form.password);
    formData.append("phone_number", form.phone_number);

    try {
      await API.post("api/accounts/register/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Регистрация прошла успешно");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("❌ Ошибка регистрации");
    }
  };

  return (
    <>
      <FloatingButtons />
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-header-box">
                <br /><br /><br />
                <h1 className="text-anime">
                  {lang === 'uz' ? "Roʻyxatdan oʻtish" : "Зарегистрироваться"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
        <img src={logo} alt="logo" />

        {/* Username */}
        <input
          name="username"
          type="name"
          placeholder={lang === 'uz' ? "Foydalanuvchi nomi" : "Имя пользователя"}
          value={form.username}
          onChange={handleChange}
          required
        />

        {/* Password */}
        <div className="password-container">
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
            className="theme-togglee"
            aria-label="Показать или скрыть пароль"
          >
            {showOld ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        {/* Phone Number */}
        <input
          name="phone_number"
          type="tel"
          placeholder={lang === 'uz' ? "Telefon" : "Телефон"}
          value={form.phone_number}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {lang === 'uz' ? "Roʻyxatdan oʻtish" : "Зарегистрироваться"}
        </button>
      </form>
    </>
  );
}