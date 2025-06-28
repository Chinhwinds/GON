import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cards } from '../data/cards';

const CardList = () => {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCards = cards.filter(card => {
        const matchesFilter = filter === 'all' || card.type === filter;
        const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

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
                <div className="col-12">
                    <h1 className="display-4 fw-bold text-center mb-5">Bộ sưu tập thẻ</h1>

                    {/* Search and Filter */}
                    <div className="row mb-4">
                        <div className="col-md-6 mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm thẻ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <select
                                className="form-select"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">Tất cả loại thẻ</option>
                                <option value="Bảo Vệ">Thẻ Bảo Vệ</option>
                                <option value="Cộng Đồng">Thẻ Cộng Đồng</option>
                                <option value="Thiên Tai">Thẻ Thiên Tai</option>
                            </select>
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="mb-4">
                        <p className="text-muted">
                            Hiển thị {filteredCards.length} thẻ {filter !== 'all' ? `(${filter})` : ''}
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="row g-4">
                        {filteredCards.map((card) => (
                            <div key={card.id} className="col-lg-4 col-md-6">
                                <div className="card h-100 shadow-sm hover-lift">
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div className="display-6">{getTypeIcon(card.type)}</div>
                                            <span className={`badge ${getTypeBadge(card.type)}`}>
                                                {card.type}
                                            </span>
                                        </div>

                                        <h5 className="card-title fw-bold mb-2">{card.name}</h5>
                                        <p className="card-text text-muted small mb-3">
                                            {card.description}
                                        </p>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-muted">ID: {card.id}</small>
                                            <Link
                                                to={`/card/${card.id}`}
                                                className="btn btn-outline-success btn-sm"
                                            >
                                                Xem chi tiết
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredCards.length === 0 && (
                        <div className="text-center py-5">
                            <div className="display-4 text-muted mb-3">🔍</div>
                            <h4>Không tìm thấy thẻ</h4>
                            <p className="text-muted">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardList; 