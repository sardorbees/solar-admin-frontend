import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WhyChooseUs from '../why-choose-us/WhyChooseUs';
import { Translator, useLang } from '../translator/Translator';
import '../assets/css/all.min.css';
import '../assets/css/animate.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/custom.css';
import '../assets/css/magnific-popup.css';
import '../assets/css/slicknav.min.css';
import '../assets/css/swiper-bundle.min.css';

function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const { lang, setLang } = useLang(); // контекст языка
    const [translations, setTranslations] = useState({});


    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const res = await axios.get('https://django-admin-pro.onrender.com/api/our_project/cards/');
                setServices(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                const res = await axios.get(`https://django-admin-pro.onrender.com/api/translations/?lang=${lang}`);
                setTranslations(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTranslations();
    }, [lang]);

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '35px' }}>
                {lang === 'uz' ? "Bizning Ishlarimiz" : "Нашы Работы"}
            </h1>

            <div className="page-services">
                <div className="container">
                    <div className="row">
                        {services.map((service) => (
                            <div key={service.id} className="col-lg-4 col-md-6">
                                <div className="service-item wow fadeInUp">
                                    <div className="service-image">
                                        <img src={service.icon} alt={service.title} />
                                        <div className="service-icon">
                                            <img src={service.img} alt={service.title} />
                                        </div>
                                    </div>
                                    <div className="service-content">
                                        <h3>
                                            {lang === 'uz' ? service.title_uz : service.title_ru}
                                        </h3>
                                        <p>
                                            {lang === 'uz' ? service.desc_uz : service.desc_ru}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))} 
                    </div>
                </div>
            </div>

            <WhyChooseUs />
        </div>
    );
}

export default Services;
