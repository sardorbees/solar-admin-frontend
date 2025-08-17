import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FloatingButtons from '../floatingbuttons/FloatingButtons';
import { Translator, useLang } from '../translator/Translator';
const API_URL = 'https://django-admin-pro.onrender.com/api/comment/comments/';
const USER_ME_URL = 'https://django-admin-pro.onrender.com/api/accounts/profile/'; // эндпоинт текущего пользователя

const Comment = () => {
    const [currentUserId, setCurrentUserId] = useState(null);
    const [comments, setComments] = useState([]);
    const [form, setForm] = useState({
        id: null,
        name: '',
        text: '',
        rating: 1,
        avatar: null,
    });

    const { lang, setLang } = useLang(); // контекст языка
    const [translations, setTranslations] = useState({});



    const isAuthenticated = Boolean(localStorage.getItem('access'));

    const fetchComments = async () => {
        try {
            const res = await axios.get(API_URL);
            setComments(res.data);
        } catch (err) {
            console.error('Ошибка при загрузке отзывов:', err);
        }
    };

    const fetchUserName = async () => {
        if (!isAuthenticated) return;
        try {
            const res = await axios.get(USER_ME_URL, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
            });
            setForm((prev) => ({ ...prev, name: res.data.username }));
            setCurrentUserId(res.data.id);  // предположим, что API возвращает поле id
        } catch (err) {
            console.error('Ошибка при получении имени пользователя:', err);
        }
    };

    useEffect(() => {
        fetchComments();
        fetchUserName();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'avatar') {
            setForm((prev) => ({ ...prev, avatar: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            alert('Вы должны зарегистрироваться, прежде чем оставлять комментарий.');
            return;
        }

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('text', form.text);
        formData.append('rating', form.rating);
        if (form.avatar) formData.append('avatar', form.avatar);

        try {
            const headers = {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('access')}`
            };

            if (form.id) {
                await axios.put(`${API_URL}${form.id}/`, formData, { headers });
            } else {
                await axios.post(API_URL, formData, { headers });
            }
            setForm({ id: null, name: form.name, text: '', rating: 1, avatar: null });
            fetchComments();
        } catch (err) {
            console.error('Ошибка при отправке:', err);
        }
    };

    const handleEdit = (comment) => {
        setForm({ ...comment, avatar: null });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Удалить комментарий?')) {
            try {
                await axios.delete(`${API_URL}${id}/`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
                });
                fetchComments();
            } catch (err) {
                console.error('Ошибка при удалении:', err);
            }
        }
    };

    return (
        <div>
            <div className="page-header parallaxie">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-header-box">
                                <br /><br /><br />
                                <h1 className="text-anime">
                                    {lang === 'uz' ? "Fikrlar" : "Комментария"}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FloatingButtons />
            {!isAuthenticated ? (
                <div className="p-4 bg-yellow-100 text-center rounded">
                    <p>
                        {lang === 'uz' ? "Fikr qoldirish uchun, iltimos" : "Чтобы оставить комментарий, пожалуйста"},{" "}
                        <a href="/register" className="text-blue-600 underline" style={{ color: 'var(--accent-color)' }}>
                            {lang === 'uz' ? "Roʻyxatdan oʻtish" : "Зарегистрируйтесь"}
                        </a>{" "}
                        {lang === 'uz' ? "yoki" : "или"}{" "}
                        <a href="/login" className="text-blue-600 underline" style={{ color: 'var(--accent-color)' }}>
                            {lang === 'uz' ? "Tizimga kiring" : "Войдите в Систему"}
                        </a>.
                    </p>
                </div>
            ) : (
                <div className="page-services">
                    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded space-y-4">
                        <h2 style={{ textAlign: 'center' }}>
                            {form.id
                                ? (lang === "uz" ? "Tahrirlash" : "Редактировать")
                                : (lang === "uz" ? "Fikr qoldirish" : "Оставить отзыв")}
                        </h2>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            readOnly
                            className="form-control"
                            placeholder={lang === "uz" ? "Ismingiz" : "Ваше имя"}
                        />
                        <br />

                        <textarea
                            name="text"
                            value={form.text}
                            onChange={handleChange}
                            required
                            placeholder={lang === "uz" ? "Sizning fikringiz" : "Ваш отзыв"}
                            className="form-control"
                        />
                        <br />

                        <div className="flex gap-3 items-center">
                            <label>{lang === "uz" ? "Baho" : "Оценка"}:</label>
                            {[1, 2, 3, 4, 5].map((r) => (
                                <label key={r}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={r}
                                        checked={+form.rating === r}
                                        onChange={handleChange}
                                    />{" "}
                                    {r}
                                </label>
                            ))}
                        </div>
                        <br />

                        <input
                            type="file"
                            name="avatar"
                            onChange={handleChange}
                            accept="image/*"
                        />
                        <br />

                        <button type="submit" className="btn-default">
                            {form.id
                                ? (lang === "uz" ? "Saqlash" : "Сохранить")
                                : (lang === "uz" ? "Yuborish" : "Отправить")}
                        </button>
                        <br />
                    </form>
                </div>
            )}
            <div className="page-testimonial mt-5">
                <div className="container">
                    <h2 className="text-xl font-bold">
                        {lang === "uz" ? "Fikrlar" : "Отзывы"}
                    </h2>
                    <div className="row">
                        {comments.map((comment) => (
                            <div key={comment.id} className="col-lg-4 col-md-6">
                                <div className="testimonial-item wow fadeInUp">
                                    <div className="client-author-image">
                                        {comment.avatar && (
                                            <img
                                                src={comment.avatar}
                                                alt="avatar"
                                                style={{ width: "180px", borderRadius: "50%", height: "139px" }}
                                            />
                                        )}
                                    </div>
                                    <div className="client-testimonial-rating">
                                        <span className="text-yellow-500">★{comment.rating}</span>
                                    </div>
                                    <div className="client-author-content">
                                        <h3>{comment.name}</h3>
                                        <p>{comment.text}</p>
                                        {comment.admin_reply && (
                                            <div className="mt-2 bg-blue-50 border-l-4 border-blue-400 p-2 text-sm">
                                                <strong>
                                                    {lang === "uz"
                                                        ? "Administrator javobi:"
                                                        : "Ответ администратора:"}
                                                </strong>
                                                <br />
                                                {comment.admin_reply}
                                            </div>
                                        )}
                                    </div>
                                    {isAuthenticated && (
                                        <div className="mt-2">
                                            <button
                                                onClick={() => handleEdit(comment)}
                                                className="btn btn-sm btn-warning mr-2"
                                            >
                                                {lang === "uz" ? "Tahrirlash" : "Редактировать"}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(comment.id)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                {lang === "uz" ? "O‘chirish" : "Удалить"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <br />
        </div>
    );
};

export default Comment;