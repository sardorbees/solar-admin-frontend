import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from "../api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/ot.css'
import '../assets/css/price.css'
import 'rc-slider/assets/index.css';
import '../assets/css/akk.css'
import '../assets/css/price.css';
import Loading from '../loading/Loading'
import { SiEbox } from "react-icons/si";
import { CiBoxList } from "react-icons/ci";
import '../assets/css/all.min.css';
import '../assets/css/animate.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/custom.css';
import '../assets/css/magnific-popup.css';
import '../assets/css/slicknav.min.css';
import '../assets/css/swiper-bundle.min.css';
import '../assets/css/product.css';
import FloatingButtons from '../floatingbuttons/FloatingButtons';
import { Translator, useLang } from '../translator/Translator';
import Calculator from '../calculator/Calculator';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import search from '../assets/img/icon/search.png';
import Nav from '../nav/Nav';
import ProductTypeFilter from '../productypefilter/ProductTypeFilter';
import Brand from '../brand/Brand';
import Skidka from '../skidka/Skidka';

import { useNavigate, useLocation } from 'react-router-dom';

const SolarPanelList = () => {
    const [translations, setTranslations] = useState({});
    const [powers, setPowers] = useState([]);
    const location = useLocation();
    const { lang } = useLang();
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);

    const selectedPower = new URLSearchParams(location.search).get("power");

    const fetchPowers = async () => {
        try {
            const res = await axios.get("https://django-admin-pro.onrender.com/api/akkumlyatory/power/");
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

    <Loading />

    return (
        <div>
            <h3>
                {lang === 'uz' ? "Quvvat" : "Мощность"}:
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
                        {lang === 'uz' ? "Barcha quvvat" : "Все мощности"}:
                    </a>
                </li>
            </ul>
        </div>
    );
};

function Ctabilizatory() {
    const navigate = useNavigate();
    const location = useLocation();
    const { lang } = useLang();
    const [translations, setTranslations] = useState({});
    const [products, setProducts] = useState([]);
    const [rangeMin, setRangeMin] = useState(0);
    const [rangeMax, setRangeMax] = useState(7000000);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const closeModal = () => setSelectedProduct(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);


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

            const res = await axios.get(`https://django-admin-pro.onrender.com/api/ctabilizatory/products/?${query}`);
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


    const fetchTranslations = async () => {
        try {
            const res = await axios.get(`https://django-admin-pro.onrender.com/api/translations/?lang=${lang}`);
            setTranslations(res.data);
        } catch (err) {
            console.error("Ошибка при загрузке переводов:", err);
        }
    };
    useEffect(() => {
        fetchTranslations();
    }, []);

    useEffect(() => {
        fetchTranslations();
    }, [lang]);

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

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        fetch(`https://django-admin-pro.onrender.com/api/ctabilizatory/api/products-page/?page=${page}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.results);
                setTotalPages(Math.ceil(data.count / 10)); // 10 - page size в DRF
            });
    }, [page]);

    const [producted, setProducte] = useState([]);
    const [ordering, setOrdering] = useState('price');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `http://django-admin-pro.onrender.com/api/ctabilizatory/products-list/?ordering=${ordering}`
                );
                if (!response.ok) throw new Error("Ошибка при загрузке товаров");
                const data = await response.json();
                setProducte(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts(); // первый вызов сразу

        const interval = setInterval(fetchProducts, 1000); // каждые 1 сек

        return () => clearInterval(interval); // очистка при размонтировании
    }, [ordering]);

    const SORT_OPTIONS = [
        { label: 'По цене', value: 'price', label_uz: 'Narx' },
        { label: 'По рейтингу', value: '-rating', label_uz: 'Reyting bo‘yicha' },
        { label: 'Мощность', value: '-power', label_uz: 'Quvvat' },
    ];

    useEffect(() => {
        fetchProducts();
        const interval = setInterval(fetchProducts, 1000);

        return () => clearInterval(interval);
    }, [ordering]);

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
                                    {lang === 'uz' ? "Stabilizatorlar" : "Стабилизаторы"}
                                </h1>
                                <a href="/catalog" style={{ color: 'white' }}>
                                    {lang === 'uz' ? "Katalogga o'ting" : "Перейти на Католог"}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Nav />
            <FloatingButtons />
            <div className="containeraa">
                <aside className="sidebar">
                    <div className="filter-group">
                        <h3>
                            {lang === 'uz' ? "Narx (so`m)" : "Цена (сум)"}
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
                            {lang === 'uz' ? "Tovarlar turi" : "Тип товаров"}
                        </h3>
                        <ProductTypeFilter />
                    </div>
                    <div className="filter-group">
                        <h3>
                            {lang === 'uz' ? "Chegirma" : "Скидка"}
                        </h3>
                        <Skidka />
                    </div>
                    <div className="filter-group">
                        <h3>
                            {lang === 'uz' ? "Brend" : "Бренд"}
                        </h3>
                        <Brand selectedBrands={selectedBrands} onBrandChange={handleBrandChange} />
                        <br />
                        <label htmlFor="rating" className="mr-2">
                            {lang === 'uz' ? "Reyting" : "Рейтинг"}:
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
                        <div className="dgg">
                            <a href="/contact">{lang === 'uz' ? "Normativ hujjatlar" : "Нормативные документы"}</a>
                            <a style={{ height: '48px' }}><Calculator /></a>
                        </div>
                        {SORT_OPTIONS.map(({ label, value, label_uz }) => (
                            <button
                                key={value}
                                onClick={() => setOrdering(value)}
                                className={`sort-button ${ordering === value ? 'active' : ''}`}
                            >
                                {lang === 'uz' ? label_uz : label}
                            </button>
                        ))}
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`view-toggle-button ${viewMode === 'grid' ? 'active' : ''}`}
                            style={{ fontSize: '30px' }}
                        >
                            <SiEbox />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`view-toggle-button ${viewMode === 'list' ? 'active' : ''}`}
                            style={{ fontSize: '35px' }}
                        >
                            <CiBoxList />
                        </button>
                    </div>


                    {producted.length === 0 && <p>Товары не найдены.</p>}

                    {viewMode === 'grid' ? (
                        <div className="product-grid">
                            {producted.length === 0 && <p>Товары не найдены.</p>}
                            {producted.map((p) => (
                                <div
                                    key={p.id}
                                    className="product-card"
                                    onClick={() => setSelectedProduct(p)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="product-image">
                                        <img src={p.image} alt={p.name_ru} className="img-fluid w-100" />
                                    </div>
                                    <div className="product-info">
                                        <h3>{lang === "uz" ? p.name_uz : p.name_ru}</h3>
                                        <h3 style={{ paddingTop: "5px", fontSize: "20px" }}>
                                            {lang === "uz" ? "Brand" : "Бранд"}: {p.brand}
                                        </h3>
                                        <h3 style={{ paddingTop: "5px", fontSize: "20px" }}>
                                            {lang === "uz" ? "Quvvat" : "Мощность"}: {p.power} w
                                        </h3>
                                        <h3 style={{ paddingTop: "5px", fontSize: "20px" }}>
                                            {lang === "uz" ? "Tavsif" : "Описание"}:{" "}
                                            {lang === "uz" ? p.description_uz : p.description_ru}
                                        </h3>
                                        <div className="rating">
                                            <span style={{ fontSize: "20px" }}>
                                                {lang === "uz" ? "Reyting" : "Рейтинг"}
                                            </span>{" "}
                                            ⭐ <span style={{ fontSize: "20px" }}>{p.rating}</span>
                                        </div>
                                        <div className="prices">
                                            <span className="old-price" style={{ fontSize: "25px" }}>
                                                {p.old_price.toLocaleString()}{" "}
                                                <Translator tKey="сум" translations={translations} />{" "}
                                            </span>
                                            <span className="new-price" style={{ fontSize: "25px", color: "green" }}>
                                                {p.price.toLocaleString()} сум
                                            </span>
                                        </div>
                                        <hr />
                                        <div className="bottom-row">
                                            <button className="compensation">
                                                {lang === "uz" ? "Buyurtma berish uchun" : "Под Заказ"}
                                            </button>
                                            <a href="tel:++998951481212" className="arrow">
                                                ➜
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {selectedProduct && (
                                <div
                                    className="modal-overlay"
                                    onClick={closeModal}
                                    style={{
                                        position: "fixed",
                                        inset: 0,
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        zIndex: 1000,
                                    }}
                                >
                                    <div
                                        className="modal-content"
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            backgroundColor: "#fff",
                                            borderRadius: 16,
                                            maxWidth: 700,
                                            width: "90%",
                                            padding: 24,
                                            display: "flex",
                                            gap: 20,
                                            fontFamily: "Arial, sans-serif",
                                        }}
                                    >
                                        {/* Левый блок - изображение */}
                                        <div style={{ flexBasis: 250 }}>
                                            <img
                                                src={selectedProduct.image}
                                                alt={selectedProduct.name_ru}
                                                className='img-baks'
                                            />
                                        </div>

                                        {/* Правый блок - информация */}
                                        <div style={{ flexGrow: 1 }}>
                                            <h2>{lang === "uz" ? selectedProduct.name_uz : selectedProduct.name_ru}</h2>
                                            <p><b>{lang === "uz" ? "Brand" : "Бранд"}:</b> {selectedProduct.brand}</p>
                                            <p><b>{lang === "uz" ? "Quvvat" : "Мощность"}:</b> {selectedProduct.power} w</p>
                                            <p><b>{lang === "uz" ? "Tavsif" : "Описание"}:</b> {lang === "uz" ? selectedProduct.description_uz : selectedProduct.description_ru}</p>
                                            <p><b>{lang === "uz" ? "Reyting" : "Рейтинг"}:</b> ⭐ {selectedProduct.rating}</p>
                                            <p style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
                                                {selectedProduct.price.toLocaleString()} сум
                                            </p>

                                            <button className='compensation'>
                                                {lang === "uz" ? "Buyurtma berish uchun" : "Под Заказ"}
                                            </button>

                                            <button
                                                onClick={closeModal}
                                                style={{
                                                    marginTop: 20,
                                                    backgroundColor: "transparent",
                                                    border: "none",
                                                    color: "#999",
                                                    cursor: "pointer",
                                                    fontSize: 18,
                                                }}
                                            >
                                                ✕ {lang === "uz" ? "Yopish" : "Закрыть"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="product-list">
                            {products.map((p) => (
                                <div key={p.id} className="product-list-item">
                                    <div style={{ flexShrink: 0, width: 150 }}>
                                        <img src={p.image} alt={p.name} style={{ width: '150px', height: 'auto', objectFit: 'contain' }} />
                                    </div>
                                    <div style={{ flexGrow: 1, }} className='diuhdg'>
                                        <h4 style={{ fontSize: '20px' }} className='titlesss'>{lang === 'uz' ? p.name_uz : p.name_ru}</h4>
                                        <div className="gf">
                                            <p>
                                                <strong>{lang === "uz" ? "Brand" : "Бранд"}:</strong> {p.brand}<br />
                                                <strong> {lang === "uz" ? "Quvvat" : "Мощность"}:</strong> {p.power} w<br />
                                                <strong>{lang === "uz" ? "Tavsif" : "Описание"}:</strong> {lang === 'uz' ? p.description_ru : p.description_uz}
                                            </p>
                                        </div>
                                        <div className="gdf">
                                            <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                                                {lang === "uz" ? "Narx" : "Цена"}: {p.price} {lang === "uz" ? "Сум" : "So`m"}
                                                {p.old_price && (
                                                    <del style={{ marginLeft: 10 }}>
                                                        {lang === "uz" ? "Eski narx" : "Старая цена"}: {p.price}  {lang === "uz" ? "Сум" : "So`m"}
                                                    </del>
                                                )}
                                            </p>
                                            <div className="oigjdgf">
                                                <a href='tel:++998951481212' className="buy-button" style={{ display: 'inline-block', marginTop: 10, padding: '6px 12px', backgroundColor: '#28a745', color: '#fff', borderRadius: '4px', textDecoration: 'none', marginTop: '-15px' }}>
                                                    {lang === "uz" ? "Buyurtma berish uchun" : "Под Заказ"}
                                                </a>
                                                <a href="tel:++998951481212" class="arrow"><span style={{ position: 'relative', left: '5px' }}>➜</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {selectedProduct && (
                                <div
                                    className="modal-overlay"
                                    onClick={closeModal}
                                    style={{
                                        position: "fixed",
                                        inset: 0,
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        zIndex: 1000,
                                    }}
                                >
                                    <div
                                        className="modal-content"
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            backgroundColor: "#fff",
                                            borderRadius: 16,
                                            maxWidth: 700,
                                            width: "90%",
                                            padding: 24,
                                            display: "flex",
                                            gap: 20,
                                            fontFamily: "Arial, sans-serif",
                                        }}
                                    >
                                        {/* Левый блок - изображение */}
                                        <div>
                                            <img
                                                src={selectedProduct.image}
                                                alt={selectedProduct.name_ru}
                                            />
                                        </div>

                                        {/* Правый блок - информация */}
                                        <div style={{ flexGrow: 1 }}>
                                            <h2>{lang === "uz" ? selectedProduct.name_uz : selectedProduct.name_ru}</h2>
                                            <p><b>{lang === "uz" ? "Brand" : "Бранд"}:</b> {selectedProduct.brand}</p>
                                            <p><b>{lang === "uz" ? "Quvvat" : "Мощность"}:</b> {selectedProduct.power} w</p>
                                            <p><b>{lang === "uz" ? "Tavsif" : "Описание"}:</b> {lang === "uz" ? selectedProduct.description_uz : selectedProduct.description_ru}</p>
                                            <p><b>{lang === "uz" ? "Reyting" : "Рейтинг"}:</b> ⭐ {selectedProduct.rating}</p>
                                            <p style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
                                                {selectedProduct.price.toLocaleString()} сум
                                            </p>

                                            <button className='compensation'>
                                                {lang === "uz" ? "Buyurtma berish uchun" : "Под Заказ"}
                                            </button>

                                            <button
                                                onClick={closeModal}
                                                style={{
                                                    marginTop: 20,
                                                    backgroundColor: "transparent",
                                                    border: "none",
                                                    color: "#999",
                                                    cursor: "pointer",
                                                    fontSize: 18,
                                                    display: "block",
                                                }}
                                            >
                                                ✕ {lang === "uz" ? "Yopish" : "Закрыть"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {totalPages > 1 && (
                        <div style={{ marginTop: 20 }}>
                            <button onClick={() => setPage(page - 1)} disabled={page === 1}>‹</button>
                            <button style={{ border: '1px solid gold', background: 'white', margin: '0 5px' }}>{page}</button>
                            <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>›</button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Ctabilizatory;