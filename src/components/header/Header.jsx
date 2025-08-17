import React, { useEffect, useState } from 'react';
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
import { Translator, useLang } from '../translator/Translator'; // именованный импорт

function Header() {
    const { lang, setLang } = useLang(); // контекст языка
    const [translations, setTranslations] = useState({});

    // Автообновление переводов каждую секунду
    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                const res = await fetch(`https://django-admin-pro.onrender.com/api/translations/?lang=${lang}`);
                const data = await res.json();
                setTranslations(data);
            } catch (err) {
                console.error('Ошибка при загрузке переводов', err);
            }
        };

        fetchTranslations(); // сразу
        const interval = setInterval(fetchTranslations, 1000); // каждую секунду

        return () => clearInterval(interval);
    }, [lang]);

    return (
        <header className="main-header">
            <div className="header-sticky">
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            <img src={logo} alt="Logo" className="logoa" />
                        </a>

                        <div className="collapse navbar-collapse main-menu">
                            <ul className="navbar-nav mr-auto" id="menu">
                                <li className="nav-item">
                                    <a className="nav-link" href="/catalog">
                                        {lang === 'uz' ? "Katalog" : "Каталог"}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/services">
                                        {lang === 'uz' ? "Xizmatlar" : "Услуги"}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/video-type">
                                        {lang === 'uz' ? "Loyihalar" : "Проекты"}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <li className="nav-iteme">
                            <a className="nav-link">
                                <Navbar />
                            </a>
                        </li>

                        <div className="navbar-toggle">
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