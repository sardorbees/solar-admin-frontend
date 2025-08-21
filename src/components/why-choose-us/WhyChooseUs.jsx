import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLang } from '../translator/Translator';
import WOW from 'wowjs';
import 'animate.css'; // обязательный импорт

function WhyChooseUs() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const { lang } = useLang();

    useEffect(() => {
        new WOW.WOW({ live: false }).init(); // инициализация анимаций
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('https://django-admin-pro.onrender.com/api/our_me/cards/');
            setItems(response.data);
        } catch (err) {
            console.error('Ошибка загрузки:', err);
            setError('Не удалось загрузить данные.');
        }
    };

    useEffect(() => {
        fetchItems();
        const interval = setInterval(fetchItems, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="why-choose-us">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title">
                            <h3 className="wow fadeInUp">
                                {lang === 'uz' ? "Nega bizni tanlaysiz?" : "Почему выбирают нас?"}
                            </h3>
                            <h2 className="text-anime wow zoomIn">
                                {lang === 'uz'
                                    ? "Quyosh energiyasi yechimlarini taqdim etish"
                                    : "Предоставление решений в области солнечной энергетики"}
                            </h2>
                        </div>
                    </div>
                </div>

                {error && <p className="text-danger">{error}</p>}

                <div className="row">
                    {items.map((item, index) => (
                        <div className="col-lg-3 col-md-6" key={item.id}>
                            <div
                                className="why-choose-item wow fadeInUp"
                                data-wow-delay={`${0.25 * (index + 1)}s`}
                            >
                                <div className="why-choose-image">
                                    <img src={item.icon} alt="" />
                                </div>

                                <div className="why-choose-content">
                                    <div className="why-choose-icon">
                                        <img src={item.img} alt="" />
                                    </div>

                                    <h3>
                                        {lang === 'uz' ? item.title_uz : item.title_ru}
                                    </h3>
                                    <p>
                                        {lang === 'uz' ? item.desc_uz : item.desc_ru}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WhyChooseUs;