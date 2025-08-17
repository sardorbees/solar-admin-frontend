import React, { useState } from 'react';
import axios from 'axios';
import { Translator, useLang } from '../translator/Translator';

function ContactForm() {
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        address: '',
        description: '',
    });
    const { lang } = useLang();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        const isTextOnly = /^[а-яА-Яa-zA-Z\s]*$/;

        if (name === 'full_name' || name === 'description' || name === 'address') {
            if (isTextOnly.test(value) || value === '') {
                setFormData({ ...formData, [name]: value });
            }
        } else if (name === 'phone') {
            if (/^\d*$/.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setError('');

        try {
            const response = await axios.post(
                'https://django-admin-pro.onrender.com/api/applicationapplicationapplications/',
                formData
            );

            if (response.status === 201) {
                setSuccess(true);
                setFormData({ full_name: '', phone: '', address: '', description: '' });
            }
        } catch (err) {
            if (err.response?.status === 429) {
                setError('⛔ Вы уже отправили заявку. Подождите пару минут перед следующей попыткой.');
            } else {
                setError('⚠️ Ошибка при отправке формы. Попробуйте позже.');
            }
        }
    };

    return (
        <div className="contact-form-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="contact-us-box">
                            <div className="contact-us-form">
                                {success && <p className="text-success mb-3">✅ Заявка успешно отправлена! Мы свяжемся с вами в течение 15 минут.</p>}
                                {error && <p className="text-danger mb-3">{error}</p>}

                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="row">
                                        <div className="form-group col-md-6 mb-4">
                                            <input
                                                type="text"
                                                name="full_name"
                                                placeholder={lang === 'uz' ? "Ism" : "Имя"}
                                                value={formData.full_name}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            />
                                        </div>

                                        <div className="form-group col-md-6 mb-4">
                                            <input
                                                type="text"
                                                name="address"
                                                placeholder={lang === 'uz' ? "Familiya" : "Фамилия"}
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            />
                                        </div>

                                        <div className="form-group col-md-6 mb-4">
                                            <input
                                                type="text"
                                                name="phone"
                                                placeholder={lang === 'uz' ? "Telefon raqami" : "Телефон номер"}
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            />
                                        </div>

                                        <div className="form-group col-md-6 mb-4">
                                            <textarea
                                                name="description"
                                                placeholder={lang === 'uz' ? "Sizning savollaringiz" : "Ваши вопросы"}
                                                value={formData.description}
                                                onChange={handleChange}
                                                className="form-control"
                                                rows="2"
                                                required
                                            />
                                            <input type="hidden" name="recaptcha_token" id="recaptchaToken" />
                                        </div>

                                        <div className="col-md-12">
                                            <button type="submit" className="btn-default">
                                                {lang === 'uz' ? "Yuborish" : "Отправить"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;