import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SolarPanelList = () => {
    const [panels, setPanels] = useState([]);
    const [power, setPower] = useState(() => {
        // При загрузке страницы читаем параметр power из URL
        const params = new URLSearchParams(window.location.search);
        return params.get('power');
    });

    useEffect(() => {
        let url = 'https://django-admin-pro.onrender.com/api/shop_category/solar-panels/';
        if (power) {
            url += `?power=${power}`;
        }

        axios.get(url).then(res => {
            setPanels(res.data);
        });
    }, [power]);

    // Обработчик клика на ссылку
    const handleClick = (e, selectedPower) => {
        e.preventDefault();
        setPower(selectedPower);

        // Обновляем URL в браузере без перезагрузки страницы
        const newUrl = selectedPower ? `?power=${selectedPower}` : window.location.pathname;
        window.history.pushState(null, '', newUrl);
    };

    return (
        <div>
            <h3>МОЩНОСТЬ</h3>
            <ul>
                <li>
                    <a href="?power=500" onClick={(e) => handleClick(e, '500')}>
                        500 Ватт
                    </a>
                </li>
                <li>
                    <a href="?power=600" onClick={(e) => handleClick(e, '600')}>
                        6000 Ватт
                    </a>
                </li>
                <li>
                    <a href="/" onClick={(e) => handleClick(e, null)}>
                        Все мощности
                    </a>
                </li>
            </ul>

            <div>
                {panels.length === 0 && <p>Товаров не найдено</p>}
            </div>
        </div>
    );
};

export default SolarPanelList;
