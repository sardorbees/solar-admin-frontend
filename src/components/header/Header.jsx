import React, { useEffect, useState } from 'react';
import WOW from 'wowjs';
import 'animate.css';

import logo from '../assets/img/logo/12.png';
import '../assets/css/all.min.css';
import '../assets/css/animate.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/custom.css';
import '../assets/css/magnific-popup.css';
import '../assets/css/slicknav.min.css';
import '../assets/css/swiper-bundle.min.css';

import Navbar from '../nabvar/Navbar';
import Burger from '../burger/Burger';
import { useLang } from '../translator/Translator';

function Header() {
    const { lang } = useLang();
    const [translations, setTranslations] = useState({});

    useEffect(() => {
        new WOW.WOW({ live: false }).init();

        const fetchTranslations = async () => {
            try {
                const res = await fetch(`https://django-admin-pro.onrender.com/api/translations/?lang=${lang}`);
                const data = await res.json();
                setTranslations(data);
            } catch (err) {
                console.error('Ошибка при загрузке переводов', err);
            }
        };

        fetchTranslations();
        const interval = setInterval(fetchTranslations, 1000);

        return () => clearInterval(interval);
    }, [lang]);

    return (
        <header className="main-header">
            <div className="header-sticky">
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        {/* Логотип с анимацией */}
                        <a
                            className="navbar-brand wow fadeInDown"
                            href="/"
                            data-wow-duration="1s"
                            data-wow-delay="0.2s"
                        >
                            <img src={logo} alt="Logo" className="logoa" />
                        </a>

                        <div className="collapse navbar-collapse main-menu">
                            <ul className="navbar-nav mr-auto" id="menu">
                                <li
                                    className="nav-item wow fadeInRight"
                                    data-wow-delay="0.4s"
                                >
                                    <a className="nav-link" href="/catalog">
                                        {lang === 'uz' ? "Katalog" : "Каталог"}
                                    </a>
                                </li>
                                <li
                                    className="nav-item wow fadeInRight"
                                    data-wow-delay="0.6s"
                                >
                                    <a className="nav-link" href="/services">
                                        {lang === 'uz' ? "Xizmatlar" : "Услуги"}
                                    </a>
                                </li>
                                <li
                                    className="nav-item wow fadeInRight"
                                    data-wow-delay="0.8s"
                                >
                                    <a className="nav-link" href="/video-type">
                                        {lang === 'uz' ? "Loyihalar" : "Проекты"}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Navbar с анимацией */}
                        <li
                            className="nav-iteme wow fadeInLeft"
                            data-wow-delay="1s"
                        >
                            <a className="nav-link">
                                <Navbar />
                            </a>
                        </li>

                        {/* Burger с анимацией */}
                        <div
                            className="navbar-toggle wow fadeInLeft"
                            data-wow-delay="1.2s"
                        >
                            <Burger />
                        </div>
                    </div>
                </nav>

                <div className="responsive-menu"></div>
            </div>
        </header>
    );
}

export default Header;