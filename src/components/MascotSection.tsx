const MascotSection = () => {
    return (
        <section id="mascot" className="py-5 bg-white">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <h2 className="display-5 fw-bold text-center text-lg-start mb-4">Gặp gỡ linh vật của chúng tôi</h2>
                        <div className="vision-content">
                            <h3 className="h4 text-success mb-3">Giới thiệu trò chơi</h3>
                            <div className="border border-2 border-dashed border-success rounded p-4 mb-4 bg-light">
                                <p className="text-muted fst-italic mb-0">
                                    GON là một trò chơi board game giáo dục về bảo vệ môi trường. Người chơi sẽ học cách bảo vệ thiên nhiên thông qua các thẻ bài tương tác.
                                </p>
                            </div>

                            <h3 className="h4 text-success mb-3">Tầm nhìn của chúng tôi</h3>
                            <div className="border border-2 border-dashed border-success rounded p-4 bg-light">
                                <p className="text-muted fst-italic mb-0">
                                    Chúng tôi mong muốn tạo ra một thế giới nơi mọi người đều có ý thức bảo vệ môi trường thông qua giáo dục và giải trí.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="text-center">
                            <div className="bg-success text-white rounded-3 p-5 shadow-lg">
                                <div className="display-1 mb-3">🌱</div>
                                <h4 className="fw-bold mb-2">Linh vật môi trường</h4>
                                <small className="opacity-75">Thêm linh vật bảo vệ môi trường của bạn ở đây</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MascotSection 