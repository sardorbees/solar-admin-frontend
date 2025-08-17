import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Video from '../video/Video';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import iconright from '../assets/img/icon-one/icon-right-2.svg'
import moyka from '../assets/img/icon-one/moyka.jpg'
import moykapanel from '../assets/img/icon-one/moyka-panel.jpg'
import moykapanel1 from '../assets/img/icon-one/moyka-panel.jpg'

function ServicesLayout() {
    return (
        <div>
            <div class="services-layout2">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="section-title">
                                <h3 class="wow fadeInUp">Наши услуги</h3>
                                <h2 class="text-anime">Лучшее предложение по возобновляемой энергии</h2>
                            </div>
                        </div>
                    </div>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        <SwiperSlide>
                            <div class="swiper-slide">
                                <div class="services-layout2-slide">
                                    <img src={moyka} alt="" />

                                    <div class="service-content">
                                        <div class="service-info">
                                            <h3>Комплектующие</h3>
                                            <p>Установка солнечного освещения и солнечных панелей "под ключ</p>
                                        </div>

                                        <div class="icon-box">
                                            <a href="https://t.me/Enerjiprojectadmin">
                                                <img src={iconright} alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>

                            <div class="swiper-slide">
                                <div class="services-layout2-slide">
                                    <img src={moykapanel} alt="" />

                                    <div class="service-content">
                                        <div class="service-info">
                                            <h3>Комплектующие</h3>
                                            <p>Профессиональная мойка солнечных панелей</p>
                                        </div>

                                        <div class="icon-box">
                                            <a href="https://t.me/Enerjiprojectadmin">
                                                <img src={iconright} alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>

                            <div class="swiper-slide">
                                <div class="services-layout2-slide">
                                    <img src={moykapanel1} alt="" />

                                    <div class="service-content">
                                        <div class="service-info">
                                            <h3>Комплектующие</h3>
                                            <p>Профессиональная мойка солнечных панелей</p>
                                        </div>

                                        <div class="icon-box">
                                            <a href="https://t.me/Enerjiprojectadmin">
                                                <img src={iconright} alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
export default ServicesLayout;