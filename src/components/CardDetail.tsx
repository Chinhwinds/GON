import { useParams, Link } from 'react-router-dom';
import { cards } from '../data/cards';
import type { Card } from '../data/cards';
const CardDetail = () => {
    const { id } = useParams<{ id: string }>();
    const card = cards.find((c: Card) => c.id === id);

    if (!card) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <div className="display-1 text-muted mb-3">❌</div>
                    <h2>Thẻ không tồn tại</h2>
                    <p className="text-muted mb-4">Thẻ bạn đang tìm kiếm không có trong bộ sưu tập.</p>
                    <Link to="/cards" className="btn btn-success">
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
        <div className="container py-5">
            <div className="row">
                <div className="col-12 mb-4">
                    <nav aria-label="breadcrumb">
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

                <div className="col-lg-6">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="position-relative">
                            <img
                                src={card.image}
                                alt={card.name}
                                className="card-img-top"
                                style={{ height: '400px', objectFit: 'cover' }}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                                }}
                            />
                            <span className={`position-absolute top-0 end-0 m-3 badge ${getTypeBadge(card.type)} fs-6`}>
                                {card.type}
                            </span>
                        </div>
                        <div className="card-body p-4">
                            <div className="text-center mb-3">
                                <div className="fs-1 mb-2">{getTypeIcon(card.type)}</div>
                                <h3 className="fw-bold">{card.name}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body p-5">
                            <h2 className="fw-bold mb-4">Chi tiết thẻ</h2>

                            <div className="mb-4">
                                <h5 className="text-success fw-bold mb-2">Mô tả</h5>
                                <p className="lead">{card.description}</p>
                            </div>

                            <div className="mb-4">
                                <h5 className="text-success fw-bold mb-2">Hiệu ứng</h5>
                                <div className="alert alert-light border-success">
                                    <strong>{card.effect}</strong>
                                </div>
                            </div>

                            {card.flavorText && (
                                <div className="mb-4">
                                    <h5 className="text-success fw-bold mb-2">Lời khuyên</h5>
                                    <blockquote className="blockquote">
                                        <p className="fst-italic text-muted">"{card.flavorText}"</p>
                                    </blockquote>
                                </div>
                            )}

                            <div className="mb-4">
                                <h5 className="text-success fw-bold mb-2">Thông tin khác</h5>
                                <div className="row g-2">
                                    <div className="col-6">
                                        <small className="text-muted">ID: {card.id}</small>
                                    </div>
                                    <div className="col-6">
                                        <small className="text-muted">Bộ: {card.set}</small>
                                    </div>
                                    <div className="col-6">
                                        <small className="text-muted">Nghệ sĩ: {card.artist}</small>
                                    </div>
                                    <div className="col-6">
                                        <small className="text-muted">Loại: {card.type}</small>
                                    </div>
                                </div>
                            </div>

                            <div className="d-grid gap-2">
                                <Link to="/cards" className="btn btn-outline-success">
                                    ← Quay lại bộ sưu tập
                                </Link>
                                <Link to="/" className="btn btn-success">
                                    Về trang chủ
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetail; 