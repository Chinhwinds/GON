import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { cards } from '../data/cards';
import type { Card } from '../data/cards';

const CardDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [isLoaded, setIsLoaded] = useState(false);
    const card = cards.find((c: Card) => c.id === id);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    if (!card) {
        return (
            <div className="container py-5 page-transition">
                <div className="text-center">
                    <div className="display-1 text-muted mb-3 bounce-in">❌</div>
                    <h2 className="slide-in-left">Thẻ không tồn tại</h2>
                    <p className="text-muted mb-4 fade-in-up">Thẻ bạn đang tìm kiếm không có trong bộ sưu tập.</p>
                    <Link to="/cards" className="btn btn-success btn-enhanced">
                        Quay lại bộ sưu tập
                    </Link>
                </div>
            </div>
        );
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Bảo Vệ': return '🛡️';
            case 'Cộng Đồng': return '👥';
            case 'Thiên Tai': return '🌪️';
            default: return '🃏';
        }
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'Bảo Vệ': return 'bg-success';
            case 'Cộng Đồng': return 'bg-info';
            case 'Thiên Tai': return 'bg-danger';
            default: return 'bg-secondary';
        }
    };

    return (
        <div className={`container py-5 ${isLoaded ? 'page-transition' : ''}`}>
            {/* Breadcrumb */}
            <div className="row">
                <div className="col-12 mb-4">
                    <nav aria-label="breadcrumb" className="fade-in-up">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/" className="text-decoration-none">Trang chủ</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/cards" className="text-decoration-none">Bộ sưu tập</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {card.name}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Main Card Detail */}
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-lg border-0 card-detail-fullsize card-hover-enhanced">
                        <div className="row g-0">
                            {/* Image Section - Full Height */}
                            <div className="col-lg-6">
                                <div className="card-image-container">
                                    <img
                                        src={card.image}
                                        alt={card.name}
                                        className="card-detail-image"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                                        }}
                                    />
                                    <span className={`position-absolute top-0 end-0 m-3 badge ${getTypeBadge(card.type)} fs-6 pulse-badge`}>
                                        {card.type}
                                    </span>
                                    <div className="card-image-overlay">
                                        <div className="image-effects"></div>
                                    </div>
                                    {/* Card Title Overlay */}
                                    <div className="card-title-overlay">
                                        <div className="text-center text-white">
                                            <div className="fs-1 mb-2 type-icon">{getTypeIcon(card.type)}</div>
                                            <h3 className="fw-bold">{card.name}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="col-lg-6">
                                <div className="card-body p-5 h-100 d-flex flex-column">
                                    <h2 className="fw-bold mb-4 text-gradient">Chi tiết thẻ</h2>

                                    <div className="mb-4 fade-in-up" style={{ animationDelay: '0.3s' }}>
                                        <h5 className="text-success fw-bold mb-2">Mô tả</h5>
                                        <div className="bg-light rounded p-3 hover-lift">
                                            <p className="lead mb-0">{card.description}</p>
                                        </div>
                                    </div>

                                    <div className="mb-4 fade-in-up" style={{ animationDelay: '0.5s' }}>
                                        <h5 className="text-success fw-bold mb-2">Hiệu ứng</h5>
                                        <div className="bg-success bg-opacity-10 rounded p-3 hover-lift">
                                            <p className="text-success fw-semibold mb-0">{card.effect}</p>
                                        </div>
                                    </div>

                                    {card.flavorText && (
                                        <div className="mb-4 fade-in-up" style={{ animationDelay: '0.7s' }}>
                                            <h5 className="text-success fw-bold mb-2">Flavor Text</h5>
                                            <blockquote className="blockquote bg-light rounded p-3 hover-lift">
                                                <p className="fst-italic text-muted mb-0">"{card.flavorText}"</p>
                                            </blockquote>
                                        </div>
                                    )}

                                    <div className="mb-4 fade-in-up" style={{ animationDelay: '0.9s' }}>
                                        <h5 className="text-success fw-bold mb-2">Thông tin khác</h5>
                                        <div className="row g-3">
                                            <div className="col-6">
                                                <div className="info-card bg-light rounded p-2 text-center hover-lift">
                                                    <small className="text-muted d-block">ID</small>
                                                    <strong>{card.id}</strong>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="info-card bg-light rounded p-2 text-center hover-lift">
                                                    <small className="text-muted d-block">Bộ</small>
                                                    <strong>{card.set}</strong>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="info-card bg-light rounded p-2 text-center hover-lift">
                                                    <small className="text-muted d-block">Nghệ sĩ</small>
                                                    <strong>{card.artist}</strong>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="info-card bg-light rounded p-2 text-center hover-lift">
                                                    <small className="text-muted d-block">Loại</small>
                                                    <strong>{card.type}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="d-grid gap-2 fade-in-up" style={{ animationDelay: '1.1s' }}>
                                            <Link to="/cards" className="btn btn-outline-success btn-enhanced">
                                                <i className="bi bi-arrow-left me-2"></i>
                                                Quay lại bộ sưu tập
                                            </Link>
                                            <Link to="/" className="btn btn-success btn-enhanced">
                                                <i className="bi bi-house me-2"></i>
                                                Về trang chủ
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetail;