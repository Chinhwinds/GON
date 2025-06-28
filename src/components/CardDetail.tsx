import { useParams, Link } from 'react-router-dom';
import { cards } from '../data/cards';

const CardDetail = () => {
    const { id } = useParams<{ id: string }>();
    const card = cards.find(c => c.id === id);

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

                <div className="col-lg-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-5">
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div className="display-1">{getTypeIcon(card.type)}</div>
                                <span className={`badge ${getTypeBadge(card.type)} fs-6`}>
                                    {card.type}
                                </span>
                            </div>

                            <h1 className="display-5 fw-bold mb-3">{card.name}</h1>

                            <p className="lead text-muted mb-4">{card.description}</p>

                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <div className="card bg-light border-0">
                                        <div className="card-body text-center">
                                            <h6 className="text-muted mb-2">Chi phí</h6>
                                            <div className="display-6 fw-bold text-success">{card.cost}</div>
                                        </div>
                                    </div>
                                </div>
                                {card.power > 0 && (
                                    <div className="col-md-6">
                                        <div className="card bg-light border-0">
                                            <div className="card-body text-center">
                                                <h6 className="text-muted mb-2">Sức mạnh</h6>
                                                <div className="display-6 fw-bold text-danger">{card.power}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <h5 className="fw-bold mb-3">Thông tin chi tiết</h5>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="d-flex justify-content-between">
                                            <span className="text-muted">ID:</span>
                                            <span className="fw-semibold">{card.id}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex justify-content-between">
                                            <span className="text-muted">Loại:</span>
                                            <span className="fw-semibold">{card.type}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-3">Hành động</h5>
                            <div className="d-grid gap-2">
                                <Link to="/cards" className="btn btn-outline-success">
                                    ← Quay lại bộ sưu tập
                                </Link>
                                <button className="btn btn-success">
                                    Thêm vào bộ sưu tập
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-sm border-0 mt-4">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-3">Thẻ liên quan</h5>
                            <div className="list-group list-group-flush">
                                {cards
                                    .filter(c => c.type === card.type && c.id !== card.id)
                                    .slice(0, 3)
                                    .map(relatedCard => (
                                        <Link
                                            key={relatedCard.id}
                                            to={`/card/${relatedCard.id}`}
                                            className="list-group-item list-group-item-action border-0 px-0"
                                        >
                                            <div className="d-flex align-items-center">
                                                <span className="me-2">{getTypeIcon(relatedCard.type)}</span>
                                                <div>
                                                    <div className="fw-semibold">{relatedCard.name}</div>
                                                    <small className="text-muted">{relatedCard.type}</small>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetail; 