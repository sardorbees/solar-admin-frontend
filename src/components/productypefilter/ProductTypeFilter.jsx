import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLang } from "../translator/Translator";
import '../assets/css/ProductTypeFilter.css'

const ProductTypeFilter = () => {
    const [productTypes, setProductTypes] = useState([]);
    const [selected, setSelected] = useState([]);
    const { lang } = useLang(); // 'ru' или 'uz'
    const [checked, setChecked] = useState(false);

    // Стартовый словарь переводов
    const [translations, setTranslations] = useState({
        "solnechnye-paneli": {
            ru: "Солнечные панели",
            uz: "Quyosh panellari",
        },
        "invertory": {
            ru: "Инверторы",
            uz: "Invertorlar",
        },
        "ctabilizatory": {
            ru: "Стабилизаторы",
            uz: "Stabilizatorlar",
        },
        "akkumlyatory": {
            ru: "Аккумуляторы",
            uz: "Akkumulyatorlar",
        },
        "colnechnyj-osvesheniya": {
            ru: "Солнечное освещение",
            uz: "Quyosh yoritgichlari",
        },
        "dizel-generatory": {
            ru: "Дизель генераторы",
            uz: "Dizel generatorlar",
        },
        "zaryadnyj-stancii": {
            ru: "Зарядные станции",
            uz: "Zaryad stansiyalari",
        },
        "vetrovaya-elektrostancii": {
            ru: "Ветровая электростанция",
            uz: "Shamol elektr stansiyalari",
        },
        "individualnyj-teplovoj-punkt": {
            ru: "Индивидуальный тепловой пункт",
            uz: "Individual issiqlik punkti",
        },
    });

    const fetchProductTypes = async () => {
        try {
            const res = await axios.get(
                "https://django-admin-pro.onrender.com/api/shop_category/producttype/"
            );
            const fetchedTypes = res.data;

            // 👇 Автоматически добавляем новые slug-и в translations
            setTranslations((prevTranslations) => {
                const updated = { ...prevTranslations };

                fetchedTypes.forEach((type) => {
                    if (!updated[type.slug]) {
                        updated[type.slug] = {
                            ru: type.name,
                            uz: type.name,
                        };
                    }
                });

                return updated;
            });

            setProductTypes(fetchedTypes);
        } catch (err) {
            console.error("Ошибка при загрузке категорий:", err);
        }
    };

    useEffect(() => {
        fetchProductTypes();

        const interval = setInterval(() => {
            fetchProductTypes();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const toggleType = (slug) => {
        setSelected((prevSelected) =>
            prevSelected.includes(slug)
                ? prevSelected.filter((item) => item !== slug)
                : [...prevSelected, slug]
        );
    };

    const getTranslatedName = (type) => {
        const translation = translations[type.slug];
        if (translation) {
            return translation[lang] || type.name;
        }
        return type.name;
    };

    return (
        <div>
            <div className="filter-box">
                <div className="space-y-2">
                    {productTypes.map((type) => (
                        <div key={type.slug} className="filter-item">
                            <input
                                type="checkbox"
                                id={`type-${type.slug}`}
                                checked={selected.includes(type.slug)}
                                onChange={() => toggleType(type.slug)}
                            />
                            <label htmlFor={`type-${type.slug}`} style={{ paddingTop: '5px', cursor: 'pointer' }}>
                                <a href={type.slug}>{getTranslatedName(type)}</a>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ProductTypeFilter;