import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import logo from '../assets/img/logo/12.png';
import '../assets/css/Register.css';
import { Translator, useLang } from '../translator/Translator';
import FloatingButtons from '../floatingbuttons/FloatingButtons'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

export default function LoginPage() {
  const [form, setForm] = useState({});
  const { lang } = useLang();
  const navigate = useNavigate();
  const [showOld, setShowOld] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("api/accounts/login/", form);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      window.dispatchEvent(new Event("authChanged")); // 👈 добавь это
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Авторизуйтесь снова");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.dispatchEvent(new Event("authChanged"));
        navigate("/login");
      } else {
        alert(err.response?.data?.error || "Ошибка смены пароля");
      }
    }
  };

  return (
    <div>
      <FloatingButtons />
      <div class="page-header parallaxie">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="page-header-box">
                <br /><br /><br />
                <h1 class="text-anime">
                  <Translator tKey="rrrre" />
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <img src={logo} alt="" />
        <input name="username" type="name" placeholder={lang === 'uz' ? "Foydalanuvchi ismi" : "Имя пользователя"} onChange={handleChange} required />
        <div style={{ display: 'flex', alignItems: 'center', margin: '0 auto', textAlign: 'center', justifyContent: 'center', marginTop: '15px' }}>
          <input
            name="password" type={showOld ? 'text' : 'password'}
            required
            placeholder={lang === 'uz' ? "Parol" : "Пароль"} onChange={handleChange} />
          <button
            type="button"
            onClick={() => setShowOld(!showOld)}
            style={{ marginLeft: '5px', width: 'max-content', marginTop: '-15px' }}
            className='theme-togglee'
          >
            {showOld ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
        <button
          type="submit" class="btn-default" style={{ background: 'green' }}
        ><Translator tKey="bxod" /></button>
        <br /><br />
        <a href="/change-password" style={{ color: 'var(--text-color)' }}>
          <Translator tKey="passord" />
        </a>
        <br />
      </form>
    </div>
  );
}