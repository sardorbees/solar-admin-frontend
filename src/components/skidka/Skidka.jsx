import React, { useEffect, useState } from "react";
import axios from "axios";

const Skidka = () => {
    const [brands, setBrands] = useState([]);
    const [sortType, setSortType] = useState('');
    const [selected, setSelected] = useState([]);

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
            <div className="space-y-2">
                {brands.map((brand) => (
                    <div key={brand.slug} className="flsss11">
                        <input
                            type="checkbox"
                            id={brand.slug}
                            checked={selected.includes(brand.slug)}
                            onChange={() => togglePower(brand.slug)}
                            className="mr-2"
                        />
                        <a
                            href={brand.slug}
                            className="ml-2"
                        >
                            {brand.category_name} — {brand.description}
                        </a>
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skidka;