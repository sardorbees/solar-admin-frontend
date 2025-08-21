import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../assets/css/filter.css'
import { Translator, useLang } from '../translator/Translator';

const PriceFilter = ({ translations }) => {
    const [rangeMin, setRangeMin] = useState(0);
    const [rangeMax, setRangeMax] = useState(7000000);
    const { lang } = useLang();

    return (
        <div className="filter-group">
            <h3 className="filter-title">
                {lang === 'uz' ? "Narx (so`m)" : "Цена (сум)"}
            </h3>

            <Slider
                range
                min={0}
                max={7000000}
                step={50000}
                value={[rangeMin, rangeMax]}
                onChange={(value) => {
                    setRangeMin(value[0]);
                    setRangeMax(value[1]);
                }}
                trackStyle={[{ backgroundColor: '#28a745', height: 6 }]}
                handleStyle={[
                    { borderColor: '#28a745', backgroundColor: '#fff', height: 20, width: 20, marginTop: -7 },
                    { borderColor: '#28a745', backgroundColor: '#fff', height: 20, width: 20, marginTop: -7 }
                ]}
                railStyle={{ backgroundColor: '#ccc', height: 6 }}
            />

            <div className="price-values">
                <span>{rangeMin.toLocaleString()} сўм</span>
                <span>{rangeMax.toLocaleString()} сўм</span>
            </div>
        </div>
    );
};

export default PriceFilter;
