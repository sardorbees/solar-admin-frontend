import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/LaptopList.css";
import { Translator, useLang } from "../translator/Translator";

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

    // Автообновление списка ноутбуков
    useEffect(() => {
        fetchLaptops();
        const interval = setInterval(fetchLaptops, 5000); // обновляем каждые 5 секунд
        return () => clearInterval(interval);
    }, []);

    // Автообновление переводов при смене языка
    useEffect(() => {
        fetchTranslations();
        const interval = setInterval(fetchTranslations, 5000); // обновляем каждые 5 секунд
        return () => clearInterval(interval);
    }, [lang]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>Загрузка...</div>
        );
    }

    return (
        <div>
            <h1 className="gfdgd">
                {lang === 'uz' ? "Ommabop kategoriya" : "Популярный Категория"}
            </h1>

            <div className="laptop-grid">
                {laptops.map((laptop) => {
                    // Название на текущем языке
                    const laptopName = laptop[`name_${lang}`] || laptop.name_ru;

                    // Префикс "Brand" / "Бранд" / "Brend"
                    const brandLabel =
                        translations["brand_label"] || (lang === "uz" ? "Brend" : "Бранд");

                    return (
                        <a
                            href={`/${laptop.slug}/`}
                            key={laptop.id}
                            className="laptop-card"
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
