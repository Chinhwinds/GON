import React, { useState } from 'react';
import type { Card } from '../data/cards';
import { cards } from '../data/cards';
import { generateStory } from '../services/storyService';
import 'bootstrap/dist/css/bootstrap.min.css';

interface StoryResult {
    story: string;
    lesson: string;
    cardsUsed: Card[];
}

const CardStoryGenerator: React.FC = () => {
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const [storyResult, setStoryResult] = useState<StoryResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Phân loại thẻ theo type
    const protectionCards = cards.filter(card => card.type === 'Bảo Vệ');
    const communityCards = cards.filter(card => card.type === 'Cộng Đồng');
    const disasterCards = cards.filter(card => card.type === 'Thiên Tai');

    const handleCardSelect = (card: Card) => {
        const isSelected = selectedCards.some(selected => selected.id === card.id);

        if (isSelected) {
            setSelectedCards(selectedCards.filter(selected => selected.id !== card.id));
        } else {
            setSelectedCards([...selectedCards, card]);
        }
    };

    const handleClearSelection = () => {
        setSelectedCards([]);
        setStoryResult(null);
        setError(null);
    };

    const createPrompt = (cards: Card[]): string => {
        const protectionCount = cards.filter(card => card.type === 'Bảo Vệ').length;
        const communityCount = cards.filter(card => card.type === 'Cộng Đồng').length;
        const disasterCount = cards.filter(card => card.type === 'Thiên Tai').length;

        let prompt = `Bạn là một AI chuyên tạo câu chuyện giáo dục về bảo vệ môi trường dựa trên các hành động trong trò chơi.

Các thẻ đã được chơi trong trò chơi:
`;

        cards.forEach((card, index) => {
            prompt += `${index + 1}. ${card.name} - ${card.description} (Hiệu ứng: ${card.effect})\n`;
        });

        prompt += `\nPhân loại thẻ:
- Thẻ Bảo Vệ (${protectionCount} lá): ${cards.filter(card => card.type === 'Bảo Vệ').map(card => card.name).join(', ') || 'Không có'}
- Thẻ Cộng Đồng (${communityCount} lá): ${cards.filter(card => card.type === 'Cộng Đồng').map(card => card.name).join(', ') || 'Không có'}
- Thẻ Thiên Tai (${disasterCount} lá): ${cards.filter(card => card.type === 'Thiên Tai').map(card => card.name).join(', ') || 'Không có'}

Hãy tạo:
1. Một câu chuyện ngắn gọn (150-200 từ) kết hợp các hành động trên thành một câu chuyện có ý nghĩa về bảo vệ môi trường
2. Một bài học rút ra từ câu chuyện (50-80 từ)

Format trả về:
CÂU CHUYỆN:
[viết câu chuyện ở đây]

BÀI HỌC:
[viết bài học ở đây]

Hãy tạo câu chuyện sinh động, có ý nghĩa giáo dục và phù hợp với các hành động đã chơi.`;

        return prompt;
    };

    const generateStory = async () => {
        if (selectedCards.length === 0) {
            setError('Vui lòng chọn ít nhất một thẻ bài!');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Tạo prompt
            const prompt = createPrompt(selectedCards);

            // Gọi service để tạo câu chuyện
            const data = await generateStory({ prompt, cards: selectedCards });

            // Parse response để tách câu chuyện và bài học
            const storyMatch = data.response.match(/CÂU CHUYỆN:\s*([\s\S]*?)(?=BÀI HỌC:|$)/);
            const lessonMatch = data.response.match(/BÀI HỌC:\s*([\s\S]*?)$/);

            const story = storyMatch ? storyMatch[1].trim() : 'Không thể tạo câu chuyện.';
            const lesson = lessonMatch ? lessonMatch[1].trim() : 'Không thể tạo bài học.';

            setStoryResult({
                story,
                lesson,
                cardsUsed: selectedCards,
            });

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra!');
        } finally {
            setIsLoading(false);
        }
    };

    const renderCard = (card: Card) => {
        const isSelected = selectedCards.some(selected => selected.id === card.id);

        return (
            <div
                key={card.id}
                className={`card h-100 ${isSelected ? 'border-success bg-light' : ''}`}
                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                onClick={() => handleCardSelect(card)}
            >
                <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                        <span className="badge bg-primary me-2">{card.type}</span>
                        <span className="badge bg-secondary">{card.rarity}</span>
                    </div>
                    <h6 className="card-title">{card.name}</h6>
                    <p className="card-text small text-muted">{card.description}</p>
                    <div className="mt-auto">
                        <small className="text-success fw-bold">{card.effect}</small>
                    </div>
                </div>
                {isSelected && (
                    <div className="card-footer bg-success text-white text-center">
                        <small>✓ Đã chọn</small>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-12">
                    <div className="text-center mb-4">
                        <h1 className="display-4 text-success">🌱 Tạo Câu Chuyện Từ Thẻ Bài</h1>
                        <p className="lead">Chọn các thẻ bài đã chơi để tạo câu chuyện và bài học về bảo vệ môi trường</p>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {error}
                            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                        </div>
                    </div>
                </div>
            )}

            <div className="row">
                {/* Card Selection */}
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-header bg-success text-white">
                            <h3 className="mb-0">🎯 Chọn Thẻ Bài Đã Chơi</h3>
                        </div>
                        <div className="card-body">
                            {/* Bảo Vệ Cards */}
                            <div className="mb-4">
                                <h4 className="text-success">🛡️ Thẻ Bảo Vệ</h4>
                                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                                    {protectionCards.map(renderCard)}
                                </div>
                            </div>

                            {/* Cộng Đồng Cards */}
                            <div className="mb-4">
                                <h4 className="text-primary">👥 Thẻ Cộng Đồng</h4>
                                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                                    {communityCards.map(renderCard)}
                                </div>
                            </div>

                            {/* Thiên Tai Cards */}
                            <div className="mb-4">
                                <h4 className="text-danger">🌪️ Thẻ Thiên Tai</h4>
                                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                                    {disasterCards.map(renderCard)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Selected Cards & Controls */}
                <div className="col-lg-4">
                    <div className="card sticky-top" style={{ top: '20px' }}>
                        <div className="card-header bg-info text-white">
                            <h4 className="mb-0">📋 Thẻ Đã Chọn ({selectedCards.length})</h4>
                        </div>
                        <div className="card-body">
                            {selectedCards.length === 0 ? (
                                <p className="text-muted text-center">Chưa có thẻ nào được chọn</p>
                            ) : (
                                <div className="mb-3">
                                    {selectedCards.map(card => (
                                        <div key={card.id} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
                                            <div>
                                                <strong>{card.name}</strong>
                                                <br />
                                                <small className="text-muted">{card.effect}</small>
                                            </div>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleCardSelect(card)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="d-grid gap-2">
                                <button
                                    className="btn btn-success btn-lg"
                                    onClick={generateStory}
                                    disabled={selectedCards.length === 0 || isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Đang tạo câu chuyện...
                                        </>
                                    ) : (
                                        '📖 Tạo Câu Chuyện'
                                    )}
                                </button>

                                {selectedCards.length > 0 && (
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={handleClearSelection}
                                    >
                                        🗑️ Xóa Tất Cả
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Story Result */}
            {storyResult && (
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header bg-success text-white">
                                <h3 className="mb-0">📖 Câu Chuyện Được Tạo</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card h-100">
                                            <div className="card-header bg-primary text-white">
                                                <h5 className="mb-0">📖 Câu Chuyện</h5>
                                            </div>
                                            <div className="card-body">
                                                <p className="card-text">{storyResult.story}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="card h-100">
                                            <div className="card-header bg-warning text-dark">
                                                <h5 className="mb-0">💡 Bài Học</h5>
                                            </div>
                                            <div className="card-body">
                                                <p className="card-text">{storyResult.lesson}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h5>🎮 Thẻ Đã Sử Dụng</h5>
                                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                                        {storyResult.cardsUsed.map(card => (
                                            <div key={card.id} className="col">
                                                <div className="card border-success">
                                                    <div className="card-body text-center">
                                                        <h6 className="card-title">{card.name}</h6>
                                                        <p className="card-text small text-success">{card.effect}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-center mt-4">
                                    <button
                                        className="btn btn-outline-success btn-lg"
                                        onClick={handleClearSelection}
                                    >
                                        🔄 Tạo Câu Chuyện Mới
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardStoryGenerator; 