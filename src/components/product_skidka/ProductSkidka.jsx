import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from "../api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import '../assets/css/all.min.css';
import '../assets/css/animate.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/custom.css';
import '../assets/css/magnific-popup.css';
import '../assets/css/slicknav.min.css';
import '../assets/css/swiper-bundle.min.css';
import '../assets/css/product.css';


import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import search from '../assets/img/icon/search.png';
import Nav from '../nav/Nav';
import ProductTypeFilter from '../productypefilter/ProductTypeFilter';
import Brand from '../brand/Brand';
import Skidka from '../skidka/Skidka';

import { useNavigate, useLocation } from 'react-router-dom';
import { Translator, useLang } from '../translator/Translator';


const SolarPanelList = () => {
    const [powers, setPowers] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    const { lang } = useLang();

    const selectedPower = new URLSearchParams(location.search).get("power");

    const fetchPowers = async () => {
        try {
            const res = await axios.get("https://django-admin-pro.onrender.com/api/skidka_product/power/");
            setPowers(res.data);
        } catch (error) {
            console.error("Ошибка при загрузке мощностей:", error);
        }
    };

    useEffect(() => {
        fetchPowers();
        const interval = setInterval(fetchPowers, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleClick = (e, powerValue) => {
        e.preventDefault();
        const params = new URLSearchParams(location.search);

        if (powerValue) params.set("power", powerValue);
        else params.delete("power");

        navigate({ search: params.toString() });
    };

    const togglePower = (slug) => {
        setSelected(prev =>
            prev.includes(slug) ? prev.filter(item => item !== slug) : [...prev, slug]
        );
    };

    return (
        <div>
            <ul className="sf">
            </ul>
        </div>
    );
};

function SkidkaProduct() {
    const navigate = useNavigate();
    const location = useLocation();
    const { lang } = useLang();
    const [translations, setTranslations] = useState({});
    const [products, setProducts] = useState([]);
    const [rangeMin, setRangeMin] = useState(0);
    const [rangeMax, setRangeMax] = useState(7000000);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [filters, setFilters] = useState({
        color: '',
        rating: '',
        memory: '',
        search: '',
        sort: '',
    });

    const [selectedPower, setSelectedPower] = useState(() => {
        const params = new URLSearchParams(location.search);
        return params.get('power') || '';
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSelectedPower(params.get('power') || '');
    }, [location.search]);

    useEffect(() => {
        fetchProducts();
        const interval = setInterval(fetchProducts, 1000);
        return () => clearInterval(interval);
    }, [rangeMin, rangeMax, selectedBrands, filters, selectedPower, lang]);

    const fetchProducts = async () => {
        try {
            const queryObj = { ...filters, min_price: rangeMin, max_price: rangeMax };
            if (selectedPower) queryObj.power = selectedPower;
            if (selectedBrands.length > 0) queryObj.brands = selectedBrands.join(',');

            const query = new URLSearchParams(queryObj).toString();
            const res = await axios.get(`https://django-admin-pro.onrender.com/api/skidka_product/products/?${query}`);
            setProducts(res.data);
        } catch (err) {
            console.error('Ошибка загрузки товаров:', err);
        }
    };

    const handleBrandChange = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const handleFilterChange = (e) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addToCart = async (productId) => {
        try {
            await API.post("api/shop/cart/", { product_id: productId, quantity: 1 });
            toast.success(lang === 'uz' ? "✅ Mahsulot savatga qo'shildi!" : "✅ Товар добавлен в корзину!");
        } catch {
            toast.error(lang === 'uz' ? "❌ Xatolik" : "❌ Ошибка");
        }
    };

    const handlePowerChange = (powerValue) => {
        const params = new URLSearchParams(location.search);
        if (powerValue) params.set('power', powerValue);
        else params.delete('power');
        navigate({ search: params.toString() });
        setSelectedPower(powerValue || '');
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '35px' }}>
                {lang === 'uz' ? "Chegirma mahsulotlar" : "Скидка товаров"}
            </h1>
            <div className="containeraa">
                <SolarPanelList />
                <main className="main-content">
                    <div className="product-grid">
                        {products.length === 0 && <p></p>}
                        {products.map(p => (
                            <div key={p.id} className="product-card">
                                <div className="product_img">
                                    <a>
                                        <img src={p.image} alt={p.name} className="img-fluid w-100" />
                                    </a>
                                </div>
                                <div className="product-name">{lang === 'uz' ? p.name_uz : p.name_ru}</div>
                                <div className="product-name">
                                    <Translator tKey="brandd" translations={translations} />: {p.brand}
                                </div>
                                <div className="product-name">
                                    <Translator tKey="power" translations={translations} />: {p.power} w
                                </div>
                                <div className="product-desc">
                                    <Translator tKey="ssafds" translations={translations} />: <span style={{color: 'red'}}>{p.reviews} %</span>
                                </div>
                                <div className="product-price">
                                    <Translator tKey="prrr" translations={translations} />: {p.price}  <Translator tKey="somm" translations={translations} /><br />
                                </div>
                                <del><Translator tKey="old pp" translations={translations} />: {p.old_price && (
                                    <del>
                                        {p.old_price.toLocaleString()} <Translator tKey="somm" translations={translations} />
                                    </del>
                                )}</del>
                                <div className="flex gap-2 mt-2">
                                    <a href='tel:++998951481212'>
                                        <h1 className="buy-button">
                                            <Translator tKey="orders" translations={translations} />
                                        </h1>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default SkidkaProduct;
