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
import AboutUs from '../about-us/AboutUs'
import WhyChooseUs from '../why-choose-us/WhyChooseUs'
import FooterTicker from '../footer-ticker/FooterTicker';

function About() {
    
    return (
        <div>
            {/* <div class="page-header parallaxie">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="page-header-box">
                                <br /><br /><br />
                                <h1 class="text-anime">О комнании</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <AboutUs />
            {/* <WhyChooseUs />
            <FooterTicker /> */}
        </div>
    )
}
export default About;