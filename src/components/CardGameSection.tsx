import { Link } from 'react-router-dom';

const CardGameSection = () => {
    return (
        <section id="cards" className="py-5 bg-light">
            <div className="container">
                <h2 className="display-5 fw-bold text-center mb-5">Bộ sưu tập thẻ</h2>

                <div className="row justify-content-center mb-5">
                    <div className="col-lg-8 text-center">
                        <div className="row g-4 mb-4">
                            <div className="col-md-4">
                                <div className="text-center">
                                    <div className="display-6 fw-bold text-success mb-2">24</div>
                                    <div className="text-muted fw-semibold">Tổng số thẻ</div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="text-center">
                                    <div className="display-6 fw-bold text-success mb-2">3</div>
                                    <div className="text-muted fw-semibold">Loại thẻ</div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="text-center">
                                    <div className="display-6 fw-bold text-success mb-2">Môi trường</div>
                                    <div className="text-muted fw-semibold">Chủ đề</div>
                                </div>
                            </div>
                        </div>

                        <div className="card-description">
                            <h3 className="h4 mb-3">Về bộ thẻ của chúng tôi</h3>
                            <p className="lead text-muted">
                                Mỗi thẻ trong GON đều được thiết kế cẩn thận với chủ đề bảo vệ môi trường.
                                Bộ sưu tập bao gồm các thẻ Bảo Vệ, Cộng Đồng và Thiên Tai, tạo ra trải nghiệm
                                chơi game động và hấp dẫn về chủ đề môi trường.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-lg-4 col-md-6">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body text-center p-4">
                                <div className="display-4 mb-3">🛡️</div>
                                <h4 className="card-title h5 mb-3">Thẻ bảo vệ</h4>
                                <p className="card-text text-muted">Các hành động bảo vệ môi trường và tăng điểm cho các vùng</p>
                                <div className="mt-3">
                                    <span className="badge bg-success">8 thẻ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body text-center p-4">
                                <div className="display-4 mb-3">👥</div>
                                <h4 className="card-title h5 mb-3">Thẻ cộng đồng</h4>
                                <p className="card-text text-muted">Hành động cộng đồng và tương tác với người chơi khác</p>
                                <div className="mt-3">
                                    <span className="badge bg-info">8 thẻ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body text-center p-4">
                                <div className="display-4 mb-3">🌪️</div>
                                <h4 className="card-title h5 mb-3">Thẻ thiên tai</h4>
                                <p className="card-text text-muted">Thiên tai và các sự kiện gây thiệt hại cho môi trường</p>
                                <div className="mt-3">
                                    <span className="badge bg-danger">8 thẻ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-5">
                    <Link to="/cards" className="btn btn-success btn-lg">
                        Khám phá bộ sưu tập
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CardGameSection 