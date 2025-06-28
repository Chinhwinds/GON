import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cards } from '../data/cards';

const CardList = () => {
    const [filterType, setFilterType] = useState<string>('all');
    const [filterRarity, setFilterRarity] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredCards = cards.filter(card => {
        const matchesType = filterType === 'all' || card.type === filterType;
        const matchesRarity = filterRarity === 'all' || card.rarity === filterRarity;
        const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.description.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesType && matchesRarity && matchesSearch;
    });

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'text-secondary';
            case 'uncommon': return 'text-success';
            case 'rare': return 'text-primary';
            case 'legendary': return 'text-warning';
            default: return 'text-dark';
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

    return (
        <div className="container py-5">
            <div className="row mb-4">
                <div className="col-12">
                    <h1 className="display-4 fw-bold text-center mb-4">Bộ Sưu Tập Thẻ</h1>
                    <p className="lead text-center text-muted mb-5">
                        Khám phá tất cả {cards.length} thẻ trong vũ trụ GON
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="row mb-4">
                <div className="col-md-4 mb-3">
                    <label htmlFor="searchInput" className="form-label">Tìm Kiếm Thẻ</label>
                    <input
                        type="text"
                        className="form-control"
                        id="searchInput"
                        placeholder="Tìm theo tên hoặc mô tả..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="typeFilter" className="form-label">Lọc Theo Loại</label>
                    <select
                        className="form-select"
                        id="typeFilter"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">Tất Cả Loại</option>
                        <option value="Bảo Vệ">Bảo Vệ</option>
                        <option value="Cộng Đồng">Cộng Đồng</option>
                        <option value="Thiên Tai">Thiên Tai</option>
                    </select>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="rarityFilter" className="form-label">Lọc Theo Độ Hiếm</label>
                    <select
                        className="form-select"
                        id="rarityFilter"
                        value={filterRarity}
                        onChange={(e) => setFilterRarity(e.target.value)}
                    >
                        <option value="all">Tất Cả Độ Hiếm</option>
                        <option value="common">Phổ Biến</option>
                        <option value="uncommon">Không Phổ Biến</option>
                        <option value="rare">Hiếm</option>
                        <option value="legendary">Huyền Thoại</option>
                    </select>
                </div>
            </div>

            {/* Results count */}
            <div className="row mb-4">
                <div className="col-12">
                    <p className="text-muted">
                        Hiển thị {filteredCards.length} trong tổng số {cards.length} thẻ
                    </p>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="row g-4">
                {filteredCards.map((card) => (
                    <div key={card.id} className="col-lg-3 col-md-4 col-sm-6">
                        <Link to={`/card/${card.id}`} className="text-decoration-none">
                            <div className="card h-100 shadow-sm border-0 hover-lift">
                                <div className="card-body p-3">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <span className="fs-4">{card.image}</span>
                                        <span className={`badge ${getRarityColor(card.rarity)}`}>
                                            {card.rarity === 'common' ? 'Phổ Biến' :
                                                card.rarity === 'uncommon' ? 'Không Phổ Biến' :
                                                    card.rarity === 'rare' ? 'Hiếm' : 'Huyền Thoại'}
                                        </span>
                                    </div>
                                    <h5 className="card-title h6 mb-2 text-dark">{card.name}</h5>
                                    <p className="card-text small text-muted mb-2">{card.description}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className={`badge ${getTypeColor(card.type)}`}>
                                            {getTypeIcon(card.type)} {card.type}
                                        </span>
                                        <div className="text-end">
                                            <div className="small text-muted">Chi phí: {card.cost}</div>
                                            {card.power > 0 && <div className="small text-danger">Sức mạnh: {card.power}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* No results message */}
            {filteredCards.length === 0 && (
                <div className="row">
                    <div className="col-12 text-center py-5">
                        <div className="display-1 text-muted mb-3">🔍</div>
                        <h3>Không tìm thấy thẻ</h3>
                        <p className="text-muted">Hãy thử điều chỉnh tìm kiếm hoặc bộ lọc</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardList; 