import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import img from "../assets/img/product-img/111111.png";
import { Translator, useLang } from "../translator/Translator";

import '../assets/css/all.min.css';
import '../assets/css/animate.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/custom.css';
import '../assets/css/magnific-popup.css';
import '../assets/css/slicknav.min.css';
import '../assets/css/swiper-bundle.min.css';
import '../assets/css/product.css';

function CustomModal() {
    const [show, setShow] = useState(false);
    const { lang } = useLang();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button onClick={handleShow} style={{fontSize: '16px', color: 'black'}}>
                <Translator tKey="yuz 100" />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body className="text-center">
                    <img src={img} alt="product" />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CustomModal;