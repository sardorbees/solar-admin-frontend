import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "../assets/css/UserProfile.css";
import { useLang } from "../translator/Translator";
import icon from '../assets/img/logo1/user.png'
import { FaTelegram } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import FloatingButtons from '../floatingbuttons/FloatingButtons';
import { FaCommentDots } from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const { lang } = useLang();

  useEffect(() => {
    const cachedProfile = localStorage.getItem("profile");
    if (cachedProfile) {
      setProfile(JSON.parse(cachedProfile));
      setForm(JSON.parse(cachedProfile));
    }
    API.get("api/accounts/profile/")
      .then((res) => {
        setProfile(res.data);
        setForm(res.data);
        localStorage.setItem("profile", JSON.stringify(res.data));
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (form.username) formData.append("username", form.username);
    if (form.first_name) formData.append("first_name", form.first_name);
    if (form.last_name) formData.append("last_name", form.last_name);
    if (form.phone_number) formData.append("phone_number", form.phone_number);
    if (form.image instanceof File) formData.append("image", form.image);

    try {
      await API.put("api/accounts/edit-profile/", formData);
      const updated = await API.get("api/accounts/profile/");
      setProfile(updated.data);
      setEditing(false);
      alert(lang === "uz" ? "✅ Profil yangilandi" : "✅ Профиль обновлён");
    } catch {
      alert(lang === "uz" ? "Xatolik!" : "Ошибка обновления");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/"); // перенаправляем на главную
  };

  if (!profile) return <p>Загрузка...</p>;

  return (
    <div>
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-header-box">
                <br /><br /><br />
                <h1 className="text-anime">
                  {lang === 'uz' ? "Profile" : "Профиль"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-container">
        <FloatingButtons />
        {/* Заголовок */}
        <section className="profile-header">
          <img
            src={icon}
            alt="Profile"
            className="profile-image"
          />
          <div className="profile-details">
            <h2 style={{ color: 'white' }}>{profile.first_name}</h2>
            <p>{profile.phone_number || "—"}</p>
          </div>
          <div className="social-icons">
            <a href="https://instagram.com/solarenerjiproject">
              <FaInstagram />
            </a>
            <a href="https://t.me/Enerjiprojectadmin">
              <FaTelegram />
            </a>
            <a href="/comment">
              <FaCommentDots />
            </a>
          </div>
          <button className="edit-btn" onClick={() => setEditing(!editing)}>
            {editing
              ? (lang === "uz" ? "Bekor qilish" : "Отмена")
              : (lang === "uz" ? "Tahrirlash" : "Редактировать")}
          </button>
        </section>

        {/* Информация */}
        <section className="profile-section">
          <div className="section-header">
            <h3>{lang === "uz" ? "Shaxsiy ma'lumotlar" : "Личная информация"}</h3>
            {editing && (
              <button className="edit-btn" onClick={handleSave}>
                💾 {lang === "uz" ? "Saqlash" : "Сохранить"}
              </button>
            )}
          </div>
          {editing ? (
            <form className="info-grid" onSubmit={handleSave}>
              <div>
                <strong>{lang === "uz" ? "Ism" : "Имя"}:</strong>{" "}
                <input
                  name="first_name"
                  value={form.first_name || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <strong>{lang === "uz" ? "Telefon" : "Телефон"}:</strong>{" "}
                <input
                  type="tel"
                  name="phone_number"
                  value={form.phone_number || ""}
                  onChange={(e) => {
                    // разрешаем только цифры и "+"
                    const value = e.target.value.replace(/[^+\d]/g, "");
                    setForm({ ...form, phone_number: value });
                  }}
                  pattern="^\+998\d{9}$"
                  required
                />
              </div>
              <button type="submit" className="edit-btn">
                {lang === "uz" ? "Saqlash" : "Сохранить"}
              </button>
            </form>
          ) : (
            <div className="info-grid">
              <div>
                <strong>{lang === "uz" ? "Ism" : "Имя"}:</strong>{" "}
                {profile.first_name || "—"}
              </div>
              <div>
                <strong>{lang === "uz" ? "Telefon" : "Телефон"}:</strong>{" "}
                {profile.phone_number || "—"}
              </div>
            </div>
          )}
        </section>
        <section className="profile-section">
          <div className="section-header">
            <h3>⚙️ {lang === "uz" ? "Sozlamalar" : "Настройки"}</h3>
          </div>
          <button className="edit-btn" onClick={() => navigate("/change-password")}>
            🔑 {lang === "uz" ? "Parolni o'zgartirish" : "Сменить пароль"}
          </button>
          <button className="edit-btn" onClick={handleLogout}>
            🚪 {lang === "uz" ? "Chiqish" : "Выйти"}
          </button>
        </section>
      </div>
    </div>
  );
};

export default Profile;