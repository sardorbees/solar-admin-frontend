import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Video from '../video/Video';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import img from '../assets/img/icon-one/quyosh1.jpg'
import img1 from '../assets/img/icon-one/quyosh3.webp'
import img2 from '../assets/img/icon-one/quyosh4.jpg'
import img3 from '../assets/img/icon-one/quyosh5.webp'

function OurProjectsLayout() {
    const swiper = useSwiper();
    return (
        <div>
            <div class="our-projects-layout2">
                <div class="container-fluid">
                    <div class="row no-gap">
                        <div class="col-md-12">
                            <div class="section-title">
                                <h3 class="wow fadeInUp">последний проект</h3>
                                <h2 class="text-anime">Наши последние работы</h2>
                            </div>
                        </div>
                    </div>
                    <Swiper
                        spaceBetween={850}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        class="swiper-wrapper"
                    >
                        <SwiperSlide>
                            <div class="swiper-slide">
                                <div class="project-layout2-slide">
                                    <img src={img} alt="" className='iiis' />

                                    <div class="project-content">
                                        <h3>Фотонный синтез</h3>
                                        <p>Солнечная энергия</p>

                                        <div class="btn-link-box">
                                            <a href="https://t.me/Enerjiprojectadmin"><img
                                                src="./img/icon-one/icon-right-2.svg" alt="" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="swiper-slide">
                                <div class="project-layout2-slide">
                                    <img src={img1} alt="" />

                                    <div class="project-content">
                                        <h3>Динамика HelioHarbor</h3>
                                        <p>Геотермальная энергия</p>

                                        <div class="btn-link-box">
                                            <a href="https://t.me/Enerjiprojectadmin"><img
                                                src="./img/icon-one/icon-right-2.svg" alt="" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="swiper-slide">
                                <div class="project-layout2-slide">
                                    <img src={img2} alt="" />

                                    <div class="project-content">
                                        <h3>Динамика HelioHarbor</h3>
                                        <p>Солнечная энергия</p>

                                        <div class="btn-link-box">
                                            <a href="https://t.me/Enerjiprojectadmin"><img
                                                src="./img/icon-one/icon-right-2.svg" alt="" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="swiper">
                                <div class="swiper-wrapper">

                                    <div class="swiper-slide">
                                        <div class="project-layout2-slide">
                                            <img src={img3} alt="" />

                                            <div class="project-content">
                                                <h3>Динамика HelioHarbor</h3>
                                                <p>Solar Power</p>

                                                <div class="btn-link-box">
                                                    <a href="https://t.me/Enerjiprojectadmin"><img
                                                        src="./img/icon-one/icon-right-2.svg" alt="" /></a>
                                                </div>
                                            </div>
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
export default OurProjectsLayout;