import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Video from '../video/Video';
import WhyChooseusLayout from '../why-chooseus-layout/WhyChooseusLayout';
import OurProcessLlayout from '../our-process-layout/OurProcessLlayout';
import FloatingButtons from '../floatingbuttons/FloatingButtons';
import ProductSkidka from '../product_skidka/ProductSkidka'
import NewProduct from '../new_product/NewProduct'
import AllCategory from '../allcategory/AllCategory'
import OurProject from '../our_project/OurProject'
import About from '../about/About'
import { Translator, useLang } from '../translator/Translator';

function Main() {
    const { lang } = useLang();
    return (
        <div>
            <Video />
            <ProductSkidka />
            <NewProduct />
            <FloatingButtons />
            <AllCategory />
            <OurProject />
            < WhyChooseusLayout />
            <OurProcessLlayout />
            <About />
            <div class="footer-ticker">
                <div class="scrolling-ticker">
                    <div class="scrolling-ticker-box">
                        <div class="scrolling-content">
                            <span>
                                <Translator tKey="fotter" />
                            </span>
                            <span>
                                <Translator tKey="fotter1" />
                            </span>
                            <span>
                                <Translator tKey="fotter2" />
                            </span>
                            <span>
                                <Translator tKey="fotter3" />
                            </span>
                            <span>
                                <Translator tKey="fotter4" />
                            </span>
                        </div>

                        <div class="scrolling-content">
                            <span>
                                <Translator tKey="fotter" />
                            </span>
                            <span>
                                <Translator tKey="fotter1" />
                            </span>
                            <span>
                                <Translator tKey="fotter2" />
                            </span>
                            <span>
                                <Translator tKey="fotter3" />
                            </span>
                            <span>
                                <Translator tKey="fotter4" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Main;