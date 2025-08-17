import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from "../api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Translator, useLang } from '../translator/Translator';
import FloatingButtons from '../floatingbuttons/FloatingButtons'
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

const SolarPanelList = () => {
    const [powers, setPowers] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    const [translations, setTranslations] = useState({});

    const selectedPower = new URLSearchParams(location.search).get("power");

    const fetchPowers = async () => {
        try {
            const res = await axios.get("https://django-admin-pro.onrender.com/api/hz_solar/power/");
            setPowers(res.data);
        } catch (error) {
            console.error("Ошибка при загрузке мощностей:", error);
        }
    };

    useEffect(() => {
        fetchPowers(); // Загрузить сразу при монтировании

        const interval = setInterval(() => {
            fetchPowers();
        }, 1000); // Обновлять каждую секунду

        return () => clearInterval(interval); // Очистить интервал при размонтировании
    }, []);

    const handleClick = (e, powerValue) => {
        e.preventDefault();
        const params = new URLSearchParams(location.search);

        if (powerValue) {
            params.set("power", powerValue);
        } else {
            params.delete("power");
        }

        navigate({ search: params.toString() });
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
            <FloatingButtons />
            <h3>
                <Translator tKey="qpower" translations={translations} />
            </h3>
            <ul className="sf">
                {powers.map((power) => (
                    <li key={power.slug} className="sgdfh">
                        <input
                            type="checkbox"
                            id={power.slug}
                            checked={selected.includes(power.slug)}
                            onChange={() => togglePower(power.slug)}
                            className="mr-2"
                        />
                        <a
                            href={`?power=${power.slug}`}
                            onClick={(e) => handleClick(e, power.slug)}
                            className="ml-2"
                        >
                            {power.name} w
                        </a>
                    </li>
                ))}
                <li className="sgdfh">
                    <a
                        href="/"
                        onClick={(e) => handleClick(e, null)}
                        className="ml-2"
                    >
                        <Translator tKey="qpowerer" translations={translations} />
                    </a>
                </li>
            </ul>
        </div>
    );
};

function HzSolar() {
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

    // Синхронизация selectedPower с URL
    const [selectedPower, setSelectedPower] = useState(() => {
        const params = new URLSearchParams(location.search);
        return params.get('power') || '';
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const powerParam = params.get('power') || '';
        setSelectedPower(powerParam);
    }, [location.search]);

    useEffect(() => {
        fetchProducts();

        const interval = setInterval(() => {
            fetchProducts();
        }, 1000);

        return () => clearInterval(interval);
    }, [rangeMin, rangeMax, selectedBrands, filters, selectedPower]);

    const fetchProducts = async () => {
        try {
            const queryObj = {
                ...filters,
                min_price: rangeMin,
                max_price: rangeMax,
            };
            if (selectedPower) {
                queryObj.power = selectedPower;
            }
            if (selectedBrands.length > 0) {
                queryObj.brands = selectedBrands.join(',');
            }

            const query = new URLSearchParams(queryObj).toString();

            const res = await axios.get(`https://django-admin-pro.onrender.com/api/hz_solar/products/?${query}`);
            setProducts(res.data);
        } catch (err) {
            console.error('Ошибка загрузки товаров:', err);
        }
    };

    const handleBrandChange = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const handleFilterChange = (e) => {
        setFilters(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const addToCart = async (productId) => {
        try {
            await API.post("api/shop/cart/", {
                product_id: productId,
                quantity: 1
            });
            toast.success("✅ Товар добавлен в корзину!");
        } catch {
            toast.error("❌ Ошибка при добавлении в корзину");
        }
    };

    // Обновляем selectedPower и URL при выборе мощности
    const handlePowerChange = (powerValue) => {
        const params = new URLSearchParams(location.search);

        if (powerValue) {
            params.set('power', powerValue);
        } else {
            params.delete('power');
        }

        navigate({ search: params.toString() });
        setSelectedPower(powerValue || '');
    };

    const addToWishlist = async (productId) => {
        try {
            await API.post('api/shop/wishlist/', {
                product_id: productId
            });
            toast.success("❤️ Добавлено в избранное!");
        } catch {
            toast.error("❌ Ошибка при добавлении в избранное");
        }
    };

    const handleSortClick = (sortValue) => {
        let sortParam = '';

        if (sortValue === 'price') sortParam = 'price_asc';
        else if (sortValue === 'rating') sortParam = 'rating_desc';
        else if (sortValue === 'new') sortParam = 'new';
        else if (sortValue === 'popularity') sortParam = 'popularity';

        setFilters(prev => ({
            ...prev,
            sort: sortParam
        }));
    };

    return (
        <div>
            <ToastContainer />
            <div className="page-header parallaxie">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-header-box">
                                <br /><br />
                                <h1 className="text-anime">
                                    <Translator tKey="HzSolar" />
                                </h1>
                                <a href="/catalog" style={{ color: 'white' }}>
                                    <Translator tKey="catolos" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Nav />
            <div className="containeraa">
                <aside className="sidebar">
                    <div className="filter-group">
                        <h3>
                            <Translator tKey="price" translations={translations} />
                        </h3>
                        <Slider
                            range
                            min={0}
                            max={7000000}
                            value={[rangeMin, rangeMax]}
                            step={50000}
                            onChange={(value) => {
                                setRangeMin(value[0]);
                                setRangeMax(value[1]);
                            }}
                            trackStyle={[{ backgroundColor: '#28a745', height: 6 }]}
                            handleStyle={[
                                { borderColor: '#28a745', height: 20, width: 20, marginTop: -7 },
                                { borderColor: '#28a745', height: 20, width: 20, marginTop: -7 }
                            ]}
                            railStyle={{ height: 6 }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: 10,
                                fontWeight: 'bold',
                                fontSize: 16,
                                color: '#333'
                            }}
                        >
                            <span>{rangeMin.toLocaleString()} сўм</span>
                            <span>{rangeMax.toLocaleString()} сўм</span>
                        </div>
                    </div>
                    <div className="filter-group">
                        <h3>
                            <Translator tKey="tip" translations={translations} />
                        </h3>
                        <ProductTypeFilter />
                    </div>
                    <div className="filter-group">
                        <h3>
                            <Translator tKey="skidka" translations={translations} />
                        </h3>
                        <Skidka />
                    </div>
                    <div className="filter-group">
                        <h3>
                            <Translator tKey="brand" translations={translations} />
                        </h3>
                        <Brand selectedBrands={selectedBrands} onBrandChange={handleBrandChange} />
                        <br />
                        <label htmlFor="rating" className="mr-2">
                            <Translator tKey="rating" translations={translations} />:
                        </label>
                        <input
                            name="rating"
                            type="number"
                            placeholder="5-10"
                            className="form-control mb-2"
                            onChange={handleFilterChange}
                        />
                        <SolarPanelList selectedPower={selectedPower} onPowerChange={handlePowerChange} />
                    </div>
                </aside>

                <main className="main-content">
                    <div className="sort-options mb-3">
                        <div className='sort-options button' style={{ background: '#f9f9f9', border: '1px solid #ccc', borderRadius: '20px', width: '180px', padding: '8px 14px', height: '56px', paddingLeft: '15px' }}>
                            <Translator tKey="ss" translations={translations} />
                        </div>
                        <div className="sort-options button" style={{ background: '#f9f9f9', border: '1px solid #ccc', borderRadius: '20px', width: '180px', padding: '8px 14px', paddingLeft: '15px' }}>
                            <Translator tKey="a" translations={translations} />
                        </div>
                        <div className="sort-options button" style={{ background: '#f9f9f9', border: '1px solid #ccc', borderRadius: '20px', width: '180px', padding: '8px 14px', paddingLeft: '15px' }}>
                            <Translator tKey="go" translations={translations} />
                        </div>

                        <div className='iuuis'>
                            <input
                                name="search"
                                placeholder="Поиск товара"
                                className="form-controfl mb-2"
                                onChange={handleFilterChange}
                            />
                            <img src={search} alt="search" className='iccc' />
                        </div>
                    </div>

                    <div className="product-grid">
                        {products.length === 0 && <p>Товары не найдены.</p>}
                        {products.map((p) => (
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
                                    <Translator tKey="desaa" translations={translations} />: {lang === 'uz' ? p.name_uz : p.name_ru}
                                </div>
                                <div className="product-price">
                                    <Translator tKey="prrr" translations={translations} />: {p.price}  <Translator tKey="сум" translations={translations} /><br />
                                </div>
                                <del><Translator tKey="old pp" translations={translations} />: {p.old_price && (
                                    <del>
                                        {p.old_price.toLocaleString()} <Translator tKey="сум" translations={translations} />
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

export default HzSolar;