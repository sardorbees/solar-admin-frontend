import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo/12.png'
import Marquee from "react-fast-marquee";
import '../assets/css/all.min.css'
import '../assets/css/animate.css'
import '../assets/css/bootstrap.min.css'
import '../assets/css/custom.css'
import '../assets/css/magnific-popup.css'
import '../assets/css/slicknav.min.css'
import '../assets/css/swiper-bundle.min.css'
import FloatingButtons from '../floatingbuttons/FloatingButtons'
import location from '../assets/img/logo1/location-img.jpg'
import location1 from '../assets/img/logo1/icon-location.svg'

import email from '../assets/img/logo1/email-img.jpg'
import email1 from '../assets/img/logo1/icon-mail.svg'

import phone from '../assets/img/logo1/phone-img.jpg'
import phone1 from '../assets/img/logo1/icon-phone.svg'

import follow from '../assets/img/logo1/follow-img.jpg'
import follow1 from '../assets/img/logo1/icon-follow.svg'

import telegram from '../assets/img/icon/telegram.png'
import instagram from '../assets/img/icon/instagram.png'
import ContactForm from '../сontact-form/ContactForm';
import Iframe from '../iframe/Iframe'
import { useLang } from '../translator/Translator';

function Contact() {
    const { lang, setLang } = useLang(); // контекст языка
    return (
        <div>
            <FloatingButtons />
            <div class="page-header parallaxie">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="page-header-box">
                                <br /><br /><br />
                                <h1 class="text-anime">
                                    {lang === 'uz' ? "Biz bilan bog'lanish" : "Связаться с нами"}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contact-information">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="section-title">
                                <h3 class="wow fadeInUp">
                                    {lang === 'uz' ? "Bog'lanish uchun ma'lumot" : "Контактная информация"}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-6">
                            <div class="contact-info-item wow fadeInUp" data-wow-delay="0.25s">
                                <div class="contact-image">
                                    <figure class="image-anime">
                                        <img src={location} alt="" />
                                    </figure>
                                </div>

                                <div class="contact-info-content">
                                    <h3>
                                        {lang === 'uz' ? "Bizning manzillarimiz" : "Наши адреса"}
                                        :</h3>
                                    <p>
                                        {lang === 'uz' ? "Ark Buloq L1-21" : "Арк Булок L1-21"}
                                    </p>
                                </div>

                                <div class="contact-icon">
                                    <img src={location1} alt="" />
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="contact-info-item wow fadeInUp" data-wow-delay="0.5s">
                                <div class="contact-image">
                                    <figure class="image-anime">
                                        <img src={email} alt="" />
                                    </figure>
                                </div>

                                <div class="contact-info-content">
                                    <h3>
                                        {lang === 'uz' ? "Telegram foydalanuvchi nomi" : "Telegram username"}
                                        :</h3>
                                    <p>
                                        {lang === 'uz' ? "@Enerjiprojectadmin" : "@Enerjiprojectadmin"}
                                    </p>
                                </div>

                                <div class="contact-icon">
                                    <img src={email1} alt="" />
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6">
                            <div class="contact-info-item wow fadeInUp" data-wow-delay="0.75s">
                                <div class="contact-image">
                                    <figure class="image-anime">
                                        <img src={phone} alt="" />
                                    </figure>
                                </div>

                                <div class="contact-info-content">
                                    <h3>
                                        {lang === 'uz' ? "Telefonlar" : "Телефоны"}
                                        :</h3>
                                    <p>+998 95 148 12 12</p>
                                </div>

                                <div class="contact-icon">
                                    <img src={phone1} alt="" />
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6">
                            <div class="contact-info-item wow fadeInUp" data-wow-delay="1.0s">
                                <div class="contact-image">
                                    <figure class="image-anime">
                                        <img src={follow} alt="" />
                                    </figure>
                                </div>

                                <div class="contact-info-content">
                                    <h3>
                                        {lang === 'uz' ? "Obuna boling bizga" : "Подписывайтесь на нас"}
                                        :</h3>
                                    <ul>
                                        <li><a href="https://t.me/Enerjiprojectadmin"><img src={telegram}
                                            alt="" /></a>
                                        </li>
                                        <li><a href="https://www.instagram.com/enerjiproject?igsh=bmozcmUxNGMyMHRp"><img
                                            src={instagram} alt="" /></a></li>
                                    </ul>
                                </div>

                                <div class="contact-icon">
                                    <img src={follow1} alt="" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="google-map-form">
                <div class="google-map">
                    <Iframe />
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 offset-lg-6">
                            <div class="contact-form-box">
                                <div class="section-title">
                                    <h3 class="wow fadeInUp">
                                        {lang === 'uz' ? "Biz bilan bog'lanish" : "Связаться с нами"}
                                    </h3>
                                </div>

                                <div class="contact-form wow fadeInUp" data-wow-delay="0.75s">
                                    <ContactForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-ticker">
                <div class="scrolling-ticker">
                    <div class="scrolling-ticker-box">
                        <div class="scrolling-content">
                            <span>Генерируйте свою собственную энергию</span>
                            <span>Пожинайте плоды</span>
                            <span>Исцели мир</span>
                            <span>Эффективность и мощность</span>
                            <span>24/7 Круглосуточная поддержка</span>
                        </div>

                        <div class="scrolling-content">
                            <span>Генерируйте свою собственную энергию</span>
                            <span>Пожинайте плоды</span>
                            <span>Исцели мир</span>
                            <span>Эффективность и мощность</span>
                            <span>24/7 Круглосуточная поддержка</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Contact;