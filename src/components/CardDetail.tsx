import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCardById } from '../data/cards';

const CardDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const card = id ? getCardById(id) : undefined;

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'bg-secondary';
            case 'uncommon': return 'bg-success';
            case 'rare': return 'bg-primary';
            case 'legendary': return 'bg-warning';
            default: return 'bg-dark';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Bảo Vệ': return '🛡️';
            case 'Cộng Đồng': return '👥';
            case 'Thiên Tai': return '🌪️';
            default: return '🎴';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Bảo Vệ': return 'bg-success';
            case 'Cộng Đồng': return 'bg-info';
            case 'Thiên Tai': return 'bg-danger';
            default: return 'bg-primary';
        }
    };

    const getRarityText = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'Phổ Biến';
            case 'uncommon': return 'Không Phổ Biến';
            case 'rare': return 'Hiếm';
            case 'legendary': return 'Huyền Thoại';
            default: return rarity;
        }
    };

    if (!card) {
        return (
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <div className="display-1 text-muted mb-3">❌</div>
                        <h2>Không Tìm Thấy Thẻ</h2>
                        <p className="text-muted mb-4">Thẻ bạn đang tìm kiếm không tồn tại.</p>
                        <Link to="/cards" className="btn btn-primary">
                            Quay Lại Bộ Sưu Tập
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-12 mb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/" className="text-decoration-none">Trang Chủ</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/cards" className="text-decoration-none">Thẻ</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">{card.name}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="row">
                {/* Card Image */}
                <div className="col-lg-4 mb-4">
                    <div className="card border-0 shadow-lg">
                        <div className="card-body text-center p-5">
                            <div className="display-1 mb-3">{card.image}</div>
                            <div className="d-flex justify-content-center gap-2 mb-3">
                                <span className={`badge ${getRarityColor(card.rarity)}`}>
                                    {getRarityText(card.rarity)}
                                </span>
                                <span className={`badge ${getTypeColor(card.type)}`}>
                                    {getTypeIcon(card.type)} {card.type}
                                </span>
                            </div>
                            <h2 className="card-title h3 mb-0">{card.name}</h2>
                        </div>
                    </div>
                </div>

                {/* Card Details */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h5 className="text-muted mb-2">Chi Phí</h5>
                                    <div className="h4 text-primary">{card.cost}</div>
                                </div>
                                {card.power > 0 && (
                                    <div className="col-md-6">
                                        <h5 className="text-muted mb-2">Sức Mạnh</h5>
                                        <div className="h4 text-danger">{card.power}</div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <h5 className="text-muted mb-2">Mô Tả</h5>
                                <p className="lead">{card.description}</p>
                            </div>

                            <div className="mb-4">
                                <h5 className="text-muted mb-2">Hiệu Ứng</h5>
                                <div className="bg-light p-3 rounded">
                                    <p className="mb-0">{card.effect}</p>
                                </div>
                            </div>

                            {card.flavorText && (
                                <div className="mb-4">
                                    <h5 className="text-muted mb-2">Câu Nói</h5>
                                    <p className="fst-italic text-muted">"{card.flavorText}"</p>
                                </div>
                            )}

                            <div className="row">
                                {card.artist && (
                                    <div className="col-md-6 mb-3">
                                        <h5 className="text-muted mb-2">Họa Sĩ</h5>
                                        <p className="mb-0">{card.artist}</p>
                                    </div>
                                )}
                                {card.set && (
                                    <div className="col-md-6 mb-3">
                                        <h5 className="text-muted mb-2">Bộ Thẻ</h5>
                                        <p className="mb-0">{card.set}</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4">
                                <Link to="/cards" className="btn btn-outline-primary me-2">
                                    ← Quay Lại Bộ Sưu Tập
                                </Link>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(-1)}
                                >
                                    ← Quay Lại
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Cards Section */}
            <div className="row mt-5">
                <div className="col-12">
                    <h3 className="mb-4">Thẻ Liên Quan</h3>
                    <div className="row g-3">
                        {/* This could be expanded to show cards of the same type or rarity */}
                        <div className="col-md-6 col-lg-4">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body text-center p-3">
                                    <div className="fs-4 mb-2">🎴</div>
                                    <h6 className="card-title">Sẽ có thêm thẻ...</h6>
                                    <p className="small text-muted">Các thẻ liên quan sẽ hiển thị ở đây</p>
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