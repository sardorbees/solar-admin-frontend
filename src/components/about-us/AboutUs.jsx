import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo/12.png'
import Marquee from "react-fast-marquee";
import { Translator, useLang } from '../translator/Translator';
import '../assets/css/all.min.css'
import '../assets/css/animate.css'
import '../assets/css/bootstrap.min.css'
import '../assets/css/custom.css'
import '../assets/css/magnific-popup.css'
import '../assets/css/slicknav.min.css'
import '../assets/css/swiper-bundle.min.css'
import banner from '../assets/img/banner/1.jpg'
import banner1 from '../assets/img/banner/2.jpg'

function AboutUs() {
    const [brands, setBrands] = useState([]);
    const [sortType, setSortType] = useState('');
    const [translations, setTranslations] = useState({});
    const [selected, setSelected] = useState([]);
    const { lang } = useLang();

    const [services, setServices] = useState([]);

    useEffect(() => {
        // Функция загрузки данных
        const fetchServices = () => {
            axios.get('https://django-admin-pro.onrender.com/api/img_about/laptops/')
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

    const fetchBrands = async () => {
        try {
            let url = "https://django-admin-pro.onrender.com/api/category/categories/";
            if (sortType) {
                url += `?sort=${sortType}`;
            }

            const res = await axios.get(url);
            setBrands(res.data);
        } catch (err) {
            console.error("Ошибка при загрузке брендов:", err);
        }
    };

    useEffect(() => {
        fetchBrands(); // первичная загрузка

        const interval = setInterval(() => {
            fetchBrands(); // автообновление каждую секунду
        }, 1000);

        return () => clearInterval(interval); // очистка при размонтировании
    }, [sortType]);

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    };

    const togglePower = (slug) => {
        setSelected((prevSelected) =>
            prevSelected.includes(slug)
                ? prevSelected.filter((item) => item !== slug)
                : [...prevSelected, slug]
        );
    };
    return (
        <div>
            <div class="about-us">
                <div class="container">
                    <div class="row align-items-center">
                        {services.map((service) => (
                            <div class="col-lg-6" key={service.id}>
                                <div class="about-image">
                                    <div className="about-img-1">
                                        <img src={service.icon} alt="" />
                                    </div>
                                    <div className="about-img-2">
                                        <img src={service.img} alt="" />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div class="col-lg-6">
                            <div class="section-title">
                                <h3 class="wow fadeInUp" style={{ fontSize: '14px' }}>
                                    {lang === 'uz' ? "Kompaniya haqida" : "О комнании"}
                                </h3>
                                <h2 class="text-anime">
                                    {lang === 'uz' ? "Yashil energiya quyosh energiyasi haqida" : "О зеленой энергии солнечной энергии"}
                                </h2>
                            </div>
                            <div className="about-content wow fadeInUp" data-wow-delay="0.25s">
                                <ul>
                                    {brands.map((brand) => (
                                        <li key={brand.id}>
                                            {lang === "uz" ? brand.category_name_uz : brand.category_name_ru}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AboutUs;