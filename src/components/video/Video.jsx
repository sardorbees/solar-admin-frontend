import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLang } from '../translator/Translator';
import FloatingButtons from '../floatingbuttons/FloatingButtons';
import WOW from 'wowjs';
import 'animate.css';

function Video() {
    const [videoUrl, setVideoUrl] = useState(null);
    const [error, setError] = useState(null);
    const { lang } = useLang();

    useEffect(() => {
        new WOW.WOW({ live: false }).init(); // инициализируем wow.js

        const fetchVideo = async () => {
            try {
                const response = await axios.get('https://django-admin-pro.onrender.com/api/banner_video/banner-videos/');
                if (response.data.length > 0) {
                    const latestVideo = response.data[0];
                    setVideoUrl(latestVideo.video);
                }
            } catch (err) {
                console.error('Ошибка при загрузке видео:', err);
                setError('video_error');
            }
        };

        fetchVideo();
        const interval = setInterval(fetchVideo, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="hero-layout2 hero-video"
            style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}
        >
            <FloatingButtons />
            {videoUrl && (
                <video
                    key={videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: -1,
                    }}
                >
                    <source src={videoUrl} type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                </video>
            )}

            <div className="container h-100 d-flex align-items-center justify-content-center text-center">
                <div className="hero-layout2-box text-white">
                    <div className="section-title mb-4">
                        <h1
                            className="wow bounceInDown"
                            data-wow-duration="1.5s"
                        >
                            {lang === 'uz' ? "Enerji Project" : "Enerji Project"}
                        </h1>
                        <h3
                            className="wow fadeInUp"
                            data-wow-delay="0.5s"
                            data-wow-duration="1.5s"
                        >
                            {lang === 'uz' ? "Konsalting muhandisligi" : "Consulting Engineering"}
                        </h3>
                    </div>

                    <div className="hero-content">
                        {error ? (
                            <p className="text-danger wow shake" data-wow-delay="0.2s">
                                {error}
                            </p>
                        ) : (
                            <p className="wow fadeIn" data-wow-delay="1s" data-wow-duration="2s">
                                {lang === 'uz'
                                    ? "Qulaylik, xavfsizlik va samaradorlik hammasi bir joyda"
                                    : "Удобства и Безопасность и Эффективность все одном месте"}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;