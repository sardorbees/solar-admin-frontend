import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WhyChooseUs from '../why-choose-us/WhyChooseUs';
import '../assets/css/all.min.css';
import '../assets/css/animate.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/custom.css';
import '../assets/css/magnific-popup.css';
import '../assets/css/slicknav.min.css';
import '../assets/css/swiper-bundle.min.css';
import FloatingButtons from '../floatingbuttons/FloatingButtons';
import { Translator, useLang } from '../translator/Translator';

function Services() {
    const [services, setServices] = useState([]);
    const { lang } = useLang();

    useEffect(() => {
        // Функция загрузки данных
        const fetchServices = () => {
            axios.get('https://django-admin-pro.onrender.com/api/services_title/cards/')
                .then(res => {
                    setServices(res.data);
                })
                .catch(err => {
                    console.error('Ошибка при загрузке данных:', err);
                });
        };

        fetchServices(); // первая загрузка
        const interval = setInterval(fetchServices, 1000); // обновление каждую секунду

        return () => clearInterval(interval); // очистка
    }, []);

    return (
        <div>
            <div className="page-header parallaxie">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-header-box">
                                <br /><br /><br />
                                <h1 className="text-anime">
                                    {lang === 'uz' ? "Bizning xizmatlarimiz" : "Наш Услуги"}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FloatingButtons />
            <div className="page-services">
                <div className="container">
                    <div className="row">
                        {services.map((service) => (
                            <div key={service.id} className="col-lg-4 col-md-6">
                                <div className="service-item wow fadeInUp" data-wow-delay="0.25s">
                                    <a href="#" className="service-box-link"></a>

                                    <div className="service-image">
                                        <img src={service.icon_ru} alt={service.title} />
                                        <div className="service-icon">
                                            <img src={service.icon_uz} alt={service.title} />
                                        </div>
                                    </div>

                                    <div className="service-content">
                                        <h3>
                                            {lang === 'uz' ? `${service.title_ru}` : `${service.title_uz}`}
                                        </h3>
                                        <p>
                                            {lang === 'uz' ? `${service.desc_ru}` : `${service.desc_uz}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <WhyChooseUs />

            <div className="footer-ticker">
                <div className="scrolling-ticker">
                    <div className="scrolling-ticker-box">
                        <div className="scrolling-content">
                            <span>
                                <Translator tKey="fotter" />
                            </span>
                            <span>
                                <Translator tKey="fotter1" />
                            </span>
                            <span>
                                <Translator tKey="fotter2" />
                            </span>
                            <span>
                                <Translator tKey="fotter3" />
                            </span>
                            <span>
                                <Translator tKey="fotter4" />
                            </span>
                        </div>
                        <div className="scrolling-content">
                            <span>
                                <Translator tKey="fotter" />
                            </span>
                            <span>
                                <Translator tKey="fotter1" />
                            </span>
                            <span>
                                <Translator tKey="fotter2" />
                            </span>
                            <span>
                                <Translator tKey="fotter3" />
                            </span>
                            <span>
                                <Translator tKey="fotter4" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;