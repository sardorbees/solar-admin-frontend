import React, { useEffect, useState } from "react";
import axios from "axios";

const Nav = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("https://django-admin-pro.onrender.com/api/category/categories/")
            .then((res) => {
                console.log("Категории:", res.data);
                // адаптируй это под свою структуру
                if (Array.isArray(res.data)) {
                    setCategories(res.data);
                } else if (Array.isArray(res.data.data)) {
                    setCategories(res.data.data);
                } else {
                    console.error("Неверный формат данных:", res.data);
                    setCategories([]);
                }
            })
            .catch((err) => {
                console.error("Ошибка при загрузке категорий:", err);
            });
    }, []);

    return (
        <nav>
            {Array.isArray(categories) && categories.map((cat) => (
                <div key={cat.slug}>{cat.name}</div>
            ))}
        </nav>
    );
};

export default Nav;