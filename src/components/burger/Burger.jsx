import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../assets/css/Burger.css';
import burger from '../assets/img/icon/burger-menu.png';
import icon from '../assets/img/logo/12.png';

import telegram from '../assets/img/icon/telegram.png';
import instagram from '../assets/img/icon/instagram.png';

import { useLang } from '../translator/Translator'; // твой контекст языка
import axios from 'axios';

function Burger() {
    const [show, setShow] = useState(false);
    const { lang, setLang } = useLang(); // контекст языка
    const [translations, setTranslations] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Загружаем переводы из API при смене языка
    useEffect(() => {
        axios
            .get(`http://django-admin-pro.onrender.com/api/translations/?lang=${lang}`)
            .then((res) => setTranslations(res.data))
            .catch((err) => console.error("Ошибка загрузки переводов", err));
    }, [lang]);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <img src={burger} alt="" width={30} />
            </Button>

            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="end"
                className="custom-offcanvas"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <img src={icon} alt="" className="ffhgf" />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="navbar-nav mr-auto" id="menu">
                        <hr />
                        <li className="nav-item">
                            <a className="nav-link" href="/catalog">
                                {lang === 'uz' ? "Katalog" : "Каталог"}
                            </a>
                        </li>
                        <hr />
                        <li className="nav-item">
                            <a className="nav-link" href="/services">
                                {lang === 'uz' ? "Xizmatlar" : "Услуги"}
                            </a>
                        </li>
                        <hr />
                        <li className="nav-item">
                            <a className="nav-link" href="/video-type">
                                {lang === 'uz' ? "Loyihalar" : "Проекты"}
                            </a>
                        </li>
                        <hr />
                        <li className="nav-item">
                            <a className="nav-link" href="/comment">
                                {lang === 'uz' ? "Fikrlar" : "Комментария"}
                            </a>
                        </li>
                        <hr />
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Burger;