import React, { useState, useEffect } from 'react';

const SORT_OPTIONS = [
    { label: 'По цене', value: 'price' },
    { label: 'По рейтингу', value: '-rating' }, // сортировка по убыванию рейтинга
    { label: 'Мощность', value: '-power' },    // сортировка по убыванию мощности
];

export default function ProductSort() {
    const [products, setProducts] = useState([]);
    const [ordering, setOrdering] = useState('price'); // по умолчанию сортируем по цене

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://django-admin-pro.onrender.com/api/shop_category/products-list/?ordering=${ordering}`);
                if (!response.ok) throw new Error('Ошибка при загрузке товаров');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [ordering]);

    return (
        <div>
            <div style={{ marginBottom: 20 }}>
                {SORT_OPTIONS.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => setOrdering(value)}
                        style={{
                            fontWeight: ordering === value ? 'bold' : 'normal',
                            marginRight: 10,
                            padding: '8px 12px',
                            cursor: 'pointer',
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <ul>
                {products.length ? (
                    products.map(product => (
                        <li key={product.id}>
                            <strong>{product.name}</strong> — Цена: {product.price} — Рейтинг: {product.rating} — Мощность: {product.power}
                        </li>
                    ))
                ) : (
                    <li>Нет товаров для отображения</li>
                )}
            </ul>
        </div>
    );
}