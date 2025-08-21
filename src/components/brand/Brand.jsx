import React, { useEffect, useState } from "react";
import axios from "axios";
import { Translator, useLang } from '../translator/Translator';
import '../assets/css/filter.css'

const BrandList = () => {
    const [brands, setBrands] = useState([]);
    const [sortType, setSortType] = useState('');
    const [selected, setSelected] = useState([]);
    const [translations, setTranslations] = useState({});


    const fetchBrands = async () => {
        try {
            let url = "https://django-admin-pro.onrender.com/api/shop_category/brand/";
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
        <div className="brand-filter-box">
            <div className="space-y-2">
                {brands.map((brand) => (
                    <div key={brand.slug} className="flsss11">
                        <input
                            type="checkbox"
                            id={brand.slug}
                            checked={selected.includes(brand.slug)}
                            onChange={() => togglePower(brand.slug)}
                        />
                        <a href={`/${brand.slug}`} className="ml-2" style={{ color: '#28a745' }}>
                            {brand.name}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrandList;