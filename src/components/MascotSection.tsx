import { useState, useEffect } from 'react';

const MascotSection = () => {
    const [isWaving, setIsWaving] = useState(false);
    const [hasWelcomed, setHasWelcomed] = useState(false);

    // Animation chào lần đầu khi component mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsWaving(true);
            setHasWelcomed(true);
            // Dừng animation sau 2 giây
            setTimeout(() => setIsWaving(false), 2000);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleMascotHover = () => {
        if (!isWaving) {
            setIsWaving(true);
            setTimeout(() => setIsWaving(false), 2000);
        }
    };

    return (
        <section id="mascot" className="py-5 bg-white">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="mascot-content-animation">
                            <h2 className="display-5 fw-bold text-center text-lg-start mb-4 slide-in-left">
                                Gặp gỡ linh vật của chúng tôi
                            </h2>
                            <div className="vision-content">
                                <h3 className="h4 text-success mb-3 fade-in-up" style={{ animationDelay: '0.3s' }}>
                                    Giới thiệu trò chơi
                                </h3>
                                <div className="border border-2 border-dashed border-success rounded p-4 mb-4 bg-light hover-lift fade-in-up" style={{ animationDelay: '0.5s' }}>
                                    <p className="text-muted fst-italic mb-0">
                                        GON là một trò chơi board game giáo dục về bảo vệ môi trường. Người chơi sẽ học cách bảo vệ thiên nhiên thông qua các thẻ bài tương tác.
                                    </p>
                                </div>

                                <h3 className="h4 text-success mb-3 fade-in-up" style={{ animationDelay: '0.7s' }}>
                                    Tầm nhìn của chúng tôi
                                </h3>
                                <div className="border border-2 border-dashed border-success rounded p-4 bg-light hover-lift fade-in-up" style={{ animationDelay: '0.9s' }}>
                                    <p className="text-muted fst-italic mb-0">
                                        Chúng tôi mong muốn tạo ra một thế giới nơi mọi người đều có ý thức bảo vệ môi trường thông qua giáo dục và giải trí.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="text-center">
                            <div className="mascot-container bg-success text-white rounded-3 p-5 shadow-lg hover-glow slide-in-right">
                                <div className="mascot-wrapper mb-3 mascot-transparent" onMouseEnter={handleMascotHover}>
                                    <img
                                        src="/img/Mascot-action.gif"
                                        alt="Linh vật GON"
                                        className={`mascot-image img-fluid rounded mascot-transparent ${isWaving ? 'mascot-waving' : 'mascot-idle'}`}
                                        style={{
                                            maxHeight: '200px',
                                            objectFit: 'contain',
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                    <div className={`welcome-bubble ${hasWelcomed && isWaving ? 'show' : ''}`}>
                                        <span>Xin chào! 👋</span>
                                    </div>
                                </div>
                                <h4 className="fw-bold mb-2 mascot-title">Linh vật GON</h4>
                                <small className="opacity-75 mascot-subtitle">Bảo vệ môi trường cùng chúng tôi</small>
                                <div className="mascot-sparkles">
                                    <span className="sparkle sparkle-1">✨</span>
                                    <span className="sparkle sparkle-2">🌟</span>
                                    <span className="sparkle sparkle-3">💚</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MascotSection; 