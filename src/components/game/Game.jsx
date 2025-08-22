import React, { useState, useEffect, useRef } from 'react';

const DiscountGameModal = ({ onClose }) => {
    const gameWidth = 400;
    const gameHeight = 400;
    const targetSize = 60;

    const [pos, setPos] = useState({
        x: Math.random() * (gameWidth - targetSize),
        y: Math.random() * (gameHeight - targetSize),
    });
    const [caught, setCaught] = useState(false);
    const [clicked, setClicked] = useState(false);

    const velocity = useRef({ x: 0, y: 0 });
    const lastChange = useRef(Date.now());

    const randomVelocity = () => ({
        x: (Math.random() - 0.5) * 9,
        y: (Math.random() - 0.5) * 9,
    });

    useEffect(() => {
        velocity.current = randomVelocity();
    }, []);

    useEffect(() => {
        if (caught) return;

        const move = () => {
            setPos(prev => {
                let newX = prev.x + velocity.current.x;
                let newY = prev.y + velocity.current.y;

                if (newX < 0) {
                    newX = 0;
                    velocity.current.x = -velocity.current.x;
                } else if (newX > gameWidth - targetSize) {
                    newX = gameWidth - targetSize;
                    velocity.current.x = -velocity.current.x;
                }

                if (newY < 0) {
                    newY = 0;
                    velocity.current.y = -velocity.current.y;
                } else if (newY > gameHeight - targetSize) {
                    newY = gameHeight - targetSize;
                    velocity.current.y = -velocity.current.y;
                }

                const now = Date.now();
                if (now - lastChange.current > 1000 + Math.random() * 1000) {
                    velocity.current = randomVelocity();
                    lastChange.current = now;
                }

                return { x: newX, y: newY };
            });

            requestAnimationFrame(move);
        };

        const animId = requestAnimationFrame(move);
        return () => cancelAnimationFrame(animId);
    }, [caught]);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setCaught(true), 300);
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
            role="dialog"
            aria-modal="true"
        >
            <div
                style={{
                    position: 'relative',
                    width: gameWidth,
                    height: gameHeight,
                    background: 'linear-gradient(135deg, #1e1e2f, #3b3b6d)',
                    borderRadius: 15,
                    overflow: 'hidden',
                    cursor: caught ? 'default' : 'pointer',
                    userSelect: 'none',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
                    border: '2px solid #4b4b8a',
                }}
            >
                {/* Кнопка закрытия X */}
                <button
                    onClick={onClose}
                    aria-label="Закрыть игру"
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        background: 'transparent',
                        border: 'none',
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#fff',
                        cursor: 'pointer',
                        userSelect: 'none',
                        zIndex: 10,
                        lineHeight: 1,
                        padding: 0,
                        width: 32,
                        height: 32,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50%',
                        transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    ×
                </button>

                {!caught && (
                    <div
                        onClick={handleClick}
                        style={{
                            position: 'absolute',
                            width: targetSize,
                            height: targetSize,
                            background: 'radial-gradient(circle at 30% 30%, #ff7a5c, #d23618)',
                            borderRadius: '50%',
                            boxShadow:
                                '0 0 15px #ff7a5c, inset 0 0 10px #ffad99, 0 0 20px #d23618',
                            left: pos.x,
                            top: pos.y,
                            transform: clicked ? 'scale(1.5) rotate(20deg)' : 'scale(1) rotate(0deg)',
                            opacity: clicked ? 0 : 1,
                            transitionProperty: 'transform, opacity',
                            transitionDuration: clicked ? '0.3s' : '0s',
                            pointerEvents: 'auto',
                        }}
                        aria-label="Поймать скидку"
                        role="button"
                    />
                )}

                {caught && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'rgba(40, 167, 69, 0.95)',
                            padding: '25px 40px',
                            color: '#fff',
                            fontSize: 28,
                            fontWeight: '700',
                            borderRadius: 15,
                            boxShadow: '0 0 30px #28a745',
                            userSelect: 'none',
                            textAlign: 'center',
                            animation: 'fadeIn 0.8s ease forwards',
                            maxWidth: '90%',
                            lineHeight: '1.2',
                        }}
                    >
                        🎉 Поздравляем! Вы получили скидку 15%! 🎉
                        <button
                            onClick={onClose}
                            style={{
                                marginTop: 20,
                                padding: '10px 20px',
                                fontSize: 16,
                                borderRadius: 8,
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: '#28a745',
                                color: 'white',
                                boxShadow: '0 4px 10px rgba(40,167,69,0.7)',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#218838'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#28a745'}
                        >
                            Закрыть
                        </button>
                    </div>
                )}

                <style>
                    {`
            @keyframes fadeIn {
              0% {opacity: 0; transform: translate(-50%, -60%);}
              100% {opacity: 1; transform: translate(-50%, -50%);}
            }
          `}
                </style>
            </div>
        </div>
    );
};

export default DiscountGameModal;