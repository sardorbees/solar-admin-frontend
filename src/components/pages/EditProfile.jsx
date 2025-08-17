import React, { useEffect, useState } from "react";
import API from "../api"; // импорт axios instance с авторизацией
import { Translator, useLang } from '../translator/Translator';
import FloatingButtons from '../floatingbuttons/FloatingButtons';

export default function EditProfile() {
    const { lang } = useLang();
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        phone_number: ""
    });

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Загрузка текущего профиля
    useEffect(() => {
        API.get("api/accounts/edit-profile/")
            .then((res) => {
                setForm({
                    first_name: res.data.first_name || "",
                    last_name: res.data.last_name || "",
                    phone_number: res.data.phone_number || ""
                });
                setLoading(false);
            })
            .catch((err) => {
                setError({ detail: "Ошибка загрузки профиля" });
                setLoading(false);
            });
    }, []);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put("api/accounts/edit-profile/", form);
            setSuccess(true);
            setError(null);
        } catch (err) {
            setSuccess(false);
            setError(err.response?.data || { detail: "Ошибка при сохранении" });
        }
    };

    if (loading) return <p>Загрузка...</p>;

    return (
        <div style={{ maxWidth: "400px", margin: "auto" }}>
            <h2>
                <Translator tKey="edit" />
            </h2>
            {success && <p style={{ color: "green" }}>Профиль успешно обновлён ✅</p>}
            {error && (
                <div style={{ color: "red" }}>
                    {Object.entries(error).map(([key, msg]) => (
                        <div key={key}>
                            <strong>{key}:</strong> {Array.isArray(msg) ? msg.join(" ") : msg}
                        </div>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label>Имя:</label><br />
                <input
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="Введите имя"
                /><br /><br />

                <label>Фамилия:</label><br />
                <input
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="Введите фамилию"
                /><br /><br />

                <label>Телефон:</label><br />
                <input
                    name="phone_number"
                    value={form.phone_number}
                    onChange={handleChange}
                    placeholder="+998..."
                /><br /><br />

                <button type="submit">Изменить и сохранить</button>
                <br /><br />
                <FloatingButtons />
            </form>
        </div>
    );
}