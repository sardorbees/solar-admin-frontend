import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/LaptopList.css";
import { Translator, useLang } from "../translator/Translator";
import WOW from "wowjs";
import "animate.css";

const LaptopList = () => {
    const [laptops, setLaptops] = useState([]);
    const [loading, setLoading] = useState(true);
    const { lang } = useLang();
    const [translations, setTranslations] = useState({});

    // Получаем список ноутбуков
    const fetchLaptops = async () => {
        try {
            const response = await axios.get(
                "https://django-admin-pro.onrender.com/api/category_all/laptops/"
            );
            setLaptops(response.data);
        } catch (err) {
            console.error("Ошибка при загрузке ноутбуков:", err);
        } finally {
            setLoading(false);
        }
    };

    // Получаем переводы интерфейса
    const fetchTranslations = async () => {
        try {
            const res = await axios.get(
                `https://django-admin-pro.onrender.com/api/translations/?lang=${lang}`
            );
            setTranslations(res.data);
        } catch (err) {
            console.error("Ошибка при загрузке переводов:", err);
        }
    };

    // WOW.js инициализация
    useEffect(() => {
        new WOW.WOW({ live: false }).init();
    }, []);

    // Автообновление списка ноутбуков
    useEffect(() => {
        fetchLaptops();
        const interval = setInterval(fetchLaptops, 5000);
        return () => clearInterval(interval);
    }, []);

    // Обновление переводов при смене языка
    useEffect(() => {
        fetchTranslations();
        const interval = setInterval(fetchTranslations, 5000);
        return () => clearInterval(interval);
    }, [lang]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>Загрузка...</div>
        );
    }

    return (
        <div>
            <h1
                style={{ textAlign: "center", marginTop: "35px" }}
                className="wow fadeInDown"
                data-wow-duration="1s"
            >
                {lang === "uz" ? "Ommabop kategoriya" : "Популярный Категория"}
            </h1>

            <div className="laptop-grid">
                {laptops.map((laptop, index) => {
                    const laptopName = laptop[`name_${lang}`] || laptop.name_ru;
                    const brandLabel =
                        translations["brand_label"] || (lang === "uz" ? "Brend" : "Бранд");

                    return (
                        <a
                            href={`/${laptop.slug}/`}
                            key={laptop.id}
                            className="laptop-card wow fadeInUp"
                            data-wow-delay={`${index * 0.1}s`}
                            data-wow-duration="0.8s"
                        >
                            <img
                                src={laptop.img}
                                alt={laptopName}
                                className="laptop-image"
                            />
                            <h3>
                                {brandLabel}: {laptopName}
                            </h3>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default LaptopList;