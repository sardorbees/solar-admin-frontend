import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Video from '../video/Video';
import { Translator, useLang } from '../translator/Translator';

function WhyChooseusLayout() {
    const { lang } = useLang();
    return (
        <div>
            <div class="why-chooseus-layout2">
                <div class="container-fluid">
                    <div class="row no-gap row-equal-height">
                        <div class="col-lg-6">

                            <div class="why-choose-us-img-box">
                                <div class="video-play-button">
                                </div>
                            </div>

                        </div>

                        <div class="col-lg-6">

                            <div class="why-choose-us-layout2-content">
                                <div class="section-title">
                                    <h3 className="wow fadeInUp">
                                        {lang === 'uz' ? "Nega bizni tanlaysiz?" : "Почему выбирают нас?"}
                                    </h3>
                                    <h2 className="text-anime">
                                        {lang === 'uz' ? "Quyosh energiyasi yechimlarini taqdim etish" : "Предоставление решений в области солнечной энергетики"}
                                    </h2>
                                </div>

                                <div class="why-choose-us-body wow fadeInUp" data-wow-delay="0.25s">
                                    <p>
                                        {lang === 'uz' ? "Har bir tizim bino ichida va uning perimetri tashqarisida o'rnatilishi mumkin. Shuning uchun kommunal tarmoqlar va kommunikatsiyalar tashqi va ichki bo'lishi mumkin." : "Каждая система может монтироваться внутри здания и вне его периметра. Поэтому инженерные сети и коммуникации бывают внешними и внутренними."}
                                    </p>
                                </div>

                                <div class="why-choose-us-layout2-features">
                                    <div class="why-features-item wow fadeInUp" data-wow-delay="0.5s">
                                        <div class="why-features-desc">
                                            <h3>
                                                {lang === 'uz' ? "Eng yaxshi elektr tariflari" : "Лучшие тарифы на электроэнергию"}
                                            </h3>
                                        </div>
                                    </div>

                                    <div class="why-features-item wow fadeInUp" data-wow-delay="0.75s">

                                        <div class="why-features-desc">
                                            <h3>
                                               {lang === 'uz' ? "Har doim toza energiya" : "Всегда чистая энергия"}
                                            </h3>
                                        </div>
                                    </div>

                                    <div class="why-features-item wow fadeInUp" data-wow-delay="1s">

                                        <div class="why-features-desc">
                                            <h3>
                                                {lang === 'uz' ? "Ishonchli tajriba" : "Надежный опыт"}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WhyChooseusLayout;