import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/CompanyCard.css';
import { Translator, useLang } from '../translator/Translator';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const CompanyCard = () => {
    const [company, setCompany] = useState(null);
    const { lang } = useLang();

    useEffect(() => {
        const fetchCompany = () => {
            axios.get('https://django-admin-pro.onrender.com/api/partners/api/companies/')
                .then(res => setCompany(res.data[0]))
                .catch(err => console.error(err));
        };

        fetchCompany(); // начальный вызов

        const interval = setInterval(fetchCompany, 1000); // обновление каждую секунду

        return () => clearInterval(interval); // очистка при размонтировании
    }, []);

    if (!company) return <p>Загрузка...</p>;

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '35px' }}>
                {lang === 'uz' ? "Bizning hamkorlarimiz" : "Нашы Партнеры"}
            </h1>
            <div className="card">
                <div className="card-header">
                    <img src={company.image || 'https://via.placeholder.com/40'} alt="logo" />
                    <div>
                        <p className="card-title">{lang === 'uz' ? company.name_uz : company.name_ru}</p>
                        <div className="card-rating">
                            <FaStar className="star" /> {company.rating} {lang === 'uz' ? "Sharhlar" : "Oтзывов"}
                        </div>
                    </div>
                </div>

                <div className="card-divider"></div>

                <div className="card-info">
                    <div className="card-info-item">
                        <FaPhone /> {company.phone_number}
                    </div>
                    <div className="card-info-item">
                        <FaEnvelope /> {company.email}
                    </div>
                    <div className="card-info-item">
                        <FaMapMarkerAlt /> {lang === 'uz' ? company.address_uz : company.address_ru}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyCard;