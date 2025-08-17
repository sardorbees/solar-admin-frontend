import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLang } from "../translator/Translator";

const ProductTypeFilter = () => {
    const [productTypes, setProductTypes] = useState([]);
    const [selected, setSelected] = useState([]);
    const { lang } = useLang(); // текущий язык: 'ru' или 'uz'

    const fetchProductTypes = async () => {
        try {
            const res = await axios.get("https://django-admin-pro.onrender.com/api/shop_category/producttype/");
            setProductTypes(res.data);
        } catch (err) {
            console.error("Ошибка при загрузке категорий:", err);
        }
    };

    useEffect(() => {
        fetchProductTypes();
        const interval = setInterval(fetchProductTypes, 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleType = (slug) => {
        setSelected((prevSelected) =>
            prevSelected.includes(slug)
                ? prevSelected.filter((item) => item !== slug)
                : [...prevSelected, slug]
        );
    };

    return (
        <div>
            <div className="space-y-2">
                {productTypes.map((type) => (
                    <div key={type.slug} className="flex items-center">
                        <input
                            type="checkbox"
                            id={type.slug}
                            checked={selected.includes(type.slug)}
                            onChange={() => toggleType(type.slug)}
                            className="mr-2"
                        />
                        <a href={type.slug} className="ml-2">
                            {lang === "uz" ? type.name_uz : type.name_ru}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductTypeFilter;