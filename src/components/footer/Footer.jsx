import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo/12.png'
import Marquee from "react-fast-marquee";
import '../assets/css/all.min.css'
import '../assets/css/Burger.css'
import '../assets/css/animate.css'
import '../assets/css/bootstrap.min.css'
import '../assets/css/custom.css'
import '../assets/css/magnific-popup.css'
import '../assets/css/slicknav.min.css'
import '../assets/css/swiper-bundle.min.css'
import ins from '../assets/img/icon/instagram.png'
import tiktok from '../assets/img/icon/tiktok.png'
import facebook from '../assets/img/icon/facebook.png'
import email from '../assets/img/icon-one/icon-email.svg'
import phone from '../assets/img/icon-one/icon-phone.svg'
import lovation from '../assets/img/icon-one/icon-location.svg'
import { Translator, useLang } from '../translator/Translator';


function Footer() {
    const { lang } = useLang();
    return (
        <div>
            <footer class="main-footer">

                <div class="footer-contact">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-4">

                                <div class="footer-contact-box wow fadeInUp" data-wow-delay="0.5s">
                                    <div class="contact-icon-box">
                                        <img src={lovation} alt="" />
                                    </div>

                                    <div class="footer-contact-info">
                                        <h3>
                                            <Translator tKey="location" />
                                        </h3>
                                        <p>
                                            <Translator tKey="location1" />
                                        </p>
                                    </div>
                                </div>

                            </div>

                            <div class="col-lg-4">

                                <div class="footer-contact-box wow fadeInUp" data-wow-delay="0.25s">
                                    <div class="contact-icon-box">
                                        <img src={ins} alt="" />
                                    </div>

                                    <div class="footer-contact-info">
                                        <h3>
                                            <Translator tKey="inst" />
                                        </h3>
                                        <p>
                                            <Translator tKey="eneh" />
                                        </p>
                                    </div>
                                </div>

                            </div>

                            <div class="col-lg-4">

                                <div class="footer-contact-box wow fadeInUp" data-wow-delay="0.75s">
                                    <div class="contact-icon-box">
                                        <img src={facebook} alt="" />
                                    </div>

                                    <div class="footer-contact-info">
                                        <h3>
                                            <Translator tKey="face" />
                                        </h3>
                                        <p>
                                            <Translator tKey="eneh" />
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer;