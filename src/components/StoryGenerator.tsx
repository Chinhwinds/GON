import { useState } from 'react';
import { cards } from '../data/cards';

interface StoryResponse {
    title: string;
    content: string;
    moral: string;
    cardSequence: string[];
}

const StoryGenerator = () => {
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    const [storyType, setStoryType] = useState<'adventure' | 'educational' | 'heroic'>('adventure');
    const [storyLength, setStoryLength] = useState<'short' | 'medium' | 'long'>('medium');
    const [generatedStory, setGeneratedStory] = useState<StoryResponse | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCards = cards.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addCardToSequence = (cardId: string) => {
        if (!selectedCards.includes(cardId)) {
            setSelectedCards([...selectedCards, cardId]);
        }
    };

    const removeCardFromSequence = (index: number) => {
        setSelectedCards(selectedCards.filter((_, i) => i !== index));
    };

    const clearSequence = () => {
        setSelectedCards([]);
    };

    const getCardById = (id: string) => {
        return cards.find(card => card.id === id);
    };

    const generateStory = async () => {
        if (selectedCards.length === 0) {
            alert('Vui lòng chọn ít nhất một thẻ để tạo câu truyện!');
            return;
        }

        setIsGenerating(true);

        try {
            // Simulate AI story generation with environmental themes
            const storyData = await generateEnvironmentalStory(selectedCards, storyType, storyLength);
            setGeneratedStory(storyData);
        } catch (error) {
            console.error('Lỗi khi tạo câu truyện:', error);
            alert('Có lỗi xảy ra khi tạo câu truyện. Vui lòng thử lại!');
        } finally {
            setIsGenerating(false);
        }
    };

    const generateEnvironmentalStory = async (
        cardSequence: string[],
        type: 'adventure' | 'educational' | 'heroic',
        length: 'short' | 'medium' | 'long'
    ): Promise<StoryResponse> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const cardNames = cardSequence.map(id => getCardById(id)?.name || 'Thẻ bí ẩn');
        const cardDescriptions = cardSequence.map(id => getCardById(id)?.description || 'Hành động bảo vệ môi trường');

        // Enhanced story templates with consistent environmental themes
        const storyTemplates = {
            adventure: {
                short: `Trong một buổi sáng đẹp trời tại làng Xanh, nhóm bảo vệ môi trường "Lá Phổi Xanh" đã bắt đầu hành trình bảo vệ thiên nhiên. Họ thực hiện các bước: ${cardNames.join(', ')}. Mỗi hành động đều mang lại những thay đổi tích cực, từ việc ${cardDescriptions[0]} đến ${cardDescriptions[cardDescriptions.length - 1]}. Kết quả là cả làng đã trở nên xanh tươi hơn bao giờ hết.`,
                medium: `Câu chuyện bắt đầu khi cô Mai, một nhà hoạt động môi trường trẻ tuổi, quyết định thực hiện dự án "Làng Xanh Tương Lai". Cùng với nhóm của mình, họ đã lập kế hoạch chi tiết và thực hiện các bước: ${cardNames.join(', ')}. Mỗi hành động đều có ý nghĩa sâu sắc - từ việc ${cardDescriptions[0]} giúp cải thiện chất lượng không khí, đến ${cardDescriptions[cardDescriptions.length - 1]} tạo ra môi trường sống bền vững. Sau ba tháng, làng đã thay đổi hoàn toàn với những con đường rợp bóng cây và không khí trong lành.`,
                long: `Trong một thế giới nơi môi trường đang bị đe dọa nghiêm trọng bởi biến đổi khí hậu, một nhóm anh hùng môi trường đã xuất hiện tại thành phố Xanh. Dẫn đầu là anh Minh, một kỹ sư môi trường với tầm nhìn xa trông rộng. Họ đã thực hiện một hành trình đầy thử thách với các bước: ${cardNames.join(', ')}. Mỗi hành động đều thể hiện sự dũng cảm và tầm nhìn chiến lược. Từ việc ${cardDescriptions[0]} để tạo nền tảng vững chắc, đến ${cardDescriptions[cardDescriptions.length - 1]} để đảm bảo sự bền vững lâu dài. Sau một năm, thành phố đã trở thành mô hình tiêu biểu về bảo vệ môi trường, thu hút sự chú ý của cả nước.`
            },
            educational: {
                short: `Trường Tiểu học Xanh đã tổ chức chương trình "Em Yêu Môi Trường" với các hoạt động: ${cardNames.join(', ')}. Mỗi hoạt động đều dạy học sinh những bài học quý giá về bảo vệ thiên nhiên. Các em học được rằng ${cardDescriptions[0]} là cách đơn giản nhất để bắt đầu, và ${cardDescriptions[cardDescriptions.length - 1]} giúp duy trì môi trường xanh sạch.`,
                medium: `Chương trình giáo dục môi trường "Tương Lai Xanh" đã được triển khai tại 10 trường học trong thành phố. Thông qua các hoạt động: ${cardNames.join(', ')}, học sinh không chỉ học lý thuyết mà còn được thực hành trực tiếp. Từ việc ${cardDescriptions[0]} giúp các em hiểu về tầm quan trọng của việc bảo vệ tài nguyên, đến ${cardDescriptions[cardDescriptions.length - 1]} dạy về trách nhiệm cộng đồng. Kết quả là 95% học sinh đã thay đổi hành vi và trở thành những "chiến sĩ môi trường" nhí.`,
                long: `Dự án giáo dục môi trường toàn diện "Thế Hệ Xanh" đã được thực hiện trong 3 năm tại 50 trường học trên toàn quốc. Chương trình bao gồm các bước: ${cardNames.join(', ')}. Mỗi bước đều được thiết kế khoa học, từ việc ${cardDescriptions[0]} để xây dựng nhận thức cơ bản, đến ${cardDescriptions[cardDescriptions.length - 1]} để phát triển kỹ năng lãnh đạo môi trường. Dự án đã tạo ra 10,000 "đại sứ môi trường" trẻ tuổi, mỗi người đều có khả năng lan tỏa thông điệp bảo vệ thiên nhiên đến gia đình và cộng đồng.`
            },
            heroic: {
                short: `Những anh hùng môi trường của đội "Bảo Vệ Xanh" đã thực hiện các hành động dũng cảm: ${cardNames.join(', ')}. Họ đã chứng minh rằng bảo vệ thiên nhiên là nhiệm vụ thiêng liêng của mỗi công dân. Từ việc ${cardDescriptions[0]} thể hiện lòng dũng cảm, đến ${cardDescriptions[cardDescriptions.length - 1]} chứng minh sự kiên trì. Họ đã cứu được 100 hecta rừng và 5 dòng sông khỏi ô nhiễm.`,
                medium: `Trong cuộc chiến bảo vệ môi trường chống lại các công ty xả thải bất hợp pháp, đội "Anh Hùng Xanh" đã thực hiện những hành động phi thường: ${cardNames.join(', ')}. Mỗi hành động đều thể hiện sự hy sinh và lòng dũng cảm vì thiên nhiên. Từ việc ${cardDescriptions[0]} để thu thập bằng chứng, đến ${cardDescriptions[cardDescriptions.length - 1]} để đảm bảo công lý. Sau 6 tháng, họ đã thành công đóng cửa 15 cơ sở gây ô nhiễm và cứu được 500 hecta đất nông nghiệp.`,
                long: `Câu chuyện về những anh hùng môi trường đã thực hiện sứ mệnh vĩ đại "Cứu Lấy Hành Tinh Xanh" trong 5 năm. Họ đã thực hiện một kế hoạch chiến lược với các bước: ${cardNames.join(', ')}. Mỗi hành động đều thể hiện sự hy sinh cao cả và tầm nhìn xa trông rộng. Từ việc ${cardDescriptions[0]} để tạo nền tảng vững chắc, đến ${cardDescriptions[cardDescriptions.length - 1]} để đảm bảo tương lai bền vững. Dự án đã cứu được 1,000 hecta rừng, làm sạch 20 dòng sông, và tạo ra 50,000 việc làm xanh. Họ đã chứng minh rằng bảo vệ thiên nhiên là nhiệm vụ cao cả nhất của con người.`
            }
        };

        const storyContent = storyTemplates[type as keyof typeof storyTemplates][length as keyof typeof storyTemplates.adventure];

        const morals = [
            "Bảo vệ môi trường là trách nhiệm của mỗi người chúng ta, bắt đầu từ những hành động nhỏ nhất.",
            "Những hành động nhỏ có thể tạo ra thay đổi lớn cho thiên nhiên và tương lai của chúng ta.",
            "Thiên nhiên là ngôi nhà chung, hãy cùng nhau bảo vệ và gìn giữ cho thế hệ mai sau.",
            "Mỗi hành động bảo vệ môi trường đều có ý nghĩa sâu sắc và tác động lâu dài đến cuộc sống.",
            "Tương lai xanh bắt đầu từ những hành động hôm nay, mỗi người đều có thể trở thành anh hùng môi trường."
        ];

        const storyTitles = {
            adventure: {
                short: "Cuộc Phiêu Lưu Xanh Nhỏ",
                medium: "Hành Trình Bảo Vệ Làng Xanh",
                long: "Sứ Mệnh Cứu Lấy Thành Phố Xanh"
            },
            educational: {
                short: "Bài Học Môi Trường Đầu Tiên",
                medium: "Chương Trình Giáo Dục Xanh",
                long: "Dự Án Thế Hệ Xanh Toàn Quốc"
            },
            heroic: {
                short: "Những Anh Hùng Xanh Nhỏ",
                medium: "Cuộc Chiến Bảo Vệ Môi Trường",
                long: "Sứ Mệnh Cứu Lấy Hành Tinh Xanh"
            }
        };

        return {
            title: storyTitles[type as keyof typeof storyTitles][length as keyof typeof storyTitles.adventure],
            content: storyContent,
            moral: morals[Math.floor(Math.random() * morals.length)],
            cardSequence: cardSequence
        };
    };

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="display-4 fw-bold text-center mb-5">Tạo câu truyện từ thẻ bài</h1>

                    <div className="row">
                        {/* Card Selection */}
                        <div className="col-lg-8">
                            <div className="card shadow-sm border-0 mb-4">
                                <div className="card-body p-4">
                                    <h4 className="fw-bold mb-3">Chọn thẻ bài</h4>

                                    {/* Search */}
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tìm kiếm thẻ..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    {/* Card Grid */}
                                    <div className="row g-2 mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                        {filteredCards.map((card) => (
                                            <div key={card.id} className="col-md-6 col-lg-4">
                                                <div
                                                    className="card border-2 border-dashed border-success card-hover"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => addCardToSequence(card.id)}
                                                >
                                                    <div className="card-body p-2 text-center">
                                                        <div className="fs-4 mb-1">{card.image}</div>
                                                        <h6 className="card-title small mb-1">{card.name}</h6>
                                                        <span className={`badge ${card.type === 'Bảo Vệ' ? 'bg-success' : card.type === 'Cộng Đồng' ? 'bg-info' : 'bg-danger'} small`}>
                                                            {card.type}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Selected Cards Sequence */}
                            <div className="card shadow-sm border-0 mb-4">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="fw-bold mb-0">Thứ tự thẻ đã chọn</h4>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={clearSequence}
                                            disabled={selectedCards.length === 0}
                                        >
                                            Xóa tất cả
                                        </button>
                                    </div>

                                    {selectedCards.length === 0 ? (
                                        <p className="text-muted text-center py-3">Chưa có thẻ nào được chọn</p>
                                    ) : (
                                        <div className="row g-2">
                                            {selectedCards.map((cardId, index) => {
                                                const card = getCardById(cardId);
                                                return (
                                                    <div key={index} className="col-md-6 col-lg-4">
                                                        <div className="card border-success">
                                                            <div className="card-body p-2 text-center position-relative">
                                                                <button
                                                                    className="btn btn-sm btn-outline-danger position-absolute top-0 end-0"
                                                                    style={{ transform: 'translate(50%, -50%)' }}
                                                                    onClick={() => removeCardFromSequence(index)}
                                                                >
                                                                    ×
                                                                </button>
                                                                <div className="fs-5 mb-1">{card?.image}</div>
                                                                <h6 className="card-title small mb-1">{card?.name}</h6>
                                                                <small className="text-muted">Bước {index + 1}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Story Settings */}
                        <div className="col-lg-4">
                            <div className="card shadow-sm border-0 mb-4">
                                <div className="card-body p-4">
                                    <h4 className="fw-bold mb-3">Cài đặt câu truyện</h4>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Loại câu truyện</label>
                                        <select
                                            className="form-select"
                                            value={storyType}
                                            onChange={(e) => setStoryType(e.target.value as 'adventure' | 'educational' | 'heroic')}
                                        >
                                            <option value="adventure">Phiêu lưu</option>
                                            <option value="educational">Giáo dục</option>
                                            <option value="heroic">Anh hùng</option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Độ dài câu truyện</label>
                                        <select
                                            className="form-select"
                                            value={storyLength}
                                            onChange={(e) => setStoryLength(e.target.value as 'short' | 'medium' | 'long')}
                                        >
                                            <option value="short">Ngắn</option>
                                            <option value="medium">Trung bình</option>
                                            <option value="long">Dài</option>
                                        </select>
                                    </div>

                                    <button
                                        className="btn btn-success w-100"
                                        onClick={generateStory}
                                        disabled={selectedCards.length === 0 || isGenerating}
                                    >
                                        {isGenerating ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Đang tạo câu truyện...
                                            </>
                                        ) : (
                                            'Tạo câu truyện'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Generated Story */}
                    {generatedStory && (
                        <div className="card shadow-sm border-0 mt-4">
                            <div className="card-body p-4">
                                <h3 className="fw-bold mb-3">{generatedStory.title}</h3>

                                <div className="mb-4">
                                    <p className="lead">{generatedStory.content}</p>
                                </div>

                                <div className="alert alert-success">
                                    <h6 className="fw-bold mb-2">Bài học:</h6>
                                    <p className="mb-0">{generatedStory.moral}</p>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted">
                                        Được tạo từ {generatedStory.cardSequence.length} thẻ bài
                                    </small>
                                    <button
                                        className="btn btn-outline-success btn-sm"
                                        onClick={() => setGeneratedStory(null)}
                                    >
                                        Tạo câu truyện mới
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoryGenerator;
