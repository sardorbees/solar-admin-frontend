import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Translator, useLang } from '../translator/Translator';

function OurProcessLayout() {
    const [steps, setSteps] = useState([]);
    const [error, setError] = useState(null);
    const [translations, setTranslations] = useState({});
    const { lang } = useLang();

    const fetchSteps = async () => {
        try {
            const response = await axios.get('https://django-admin-pro.onrender.com/api/prosses/api/process-steps/');
            setSteps(response.data);
        } catch (err) {
            console.error('Ошибка загрузки:', err);
            setError(lang === 'uz' ? 'Jarayon yuklanmadi.' : 'Не удалось загрузить процесс.');
        }
    };

    useEffect(() => {
        fetchSteps();
        const interval = setInterval(fetchSteps, 1000); // автообновление каждую секунду
        return () => clearInterval(interval);
    }, [lang]);

    return (
        <div className="our-process-layout2">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title">
                            <h3 className="wow fadeInUp">
                                <Translator tKey="our_projectsse" translations={translations} />
                            </h3>
                        </div>
                    </div>
                </div>

                {error && <p className="text-danger">{error}</p>}

                <div className="row">
                    {steps.map((step, index) => {
                        const stepTitle = step[`title_${lang}`] || step.title_ru || '';
                        const stepMiniDesc = step[`mini_description_${lang}`] || step.mini_description_ru || '';
                        const stepDesc = step[`description_${lang}`] || step.description_ru || '';

                        return (
                            <div className="col-lg-4" key={step.id}>
                                <div className="process-item2 wow fadeInUp" data-wow-delay={`${0.25 * (index + 1)}s`}>
                                    <div className="process-step">
                                        {lang === 'uz' ? `${step.description}` : `${step.description}`}
                                    </div>

                                    <div className="process-content">
                                        <h3>
                                            {lang === 'uz' ? `${step.mini_description_ru}` : `${step.mini_description_uz}`}
                                        </h3>
                                        <p>
                                            {lang === 'uz' ? `${step.title_ru}` : `${step.title_uz}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default OurProcessLayout;
