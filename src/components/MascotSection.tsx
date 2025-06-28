const MascotSection = () => {
    return (
        <section id="mascot" className="py-5 bg-white">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <h2 className="display-5 fw-bold text-center text-lg-start mb-4">Meet Our Mascot</h2>
                        <div className="vision-content">
                            <h3 className="h4 text-primary mb-3">Game Introduction</h3>
                            <div className="border border-2 border-dashed border-secondary rounded p-4 mb-4 bg-light">
                                <p className="text-muted fst-italic mb-0">
                                    [Your game introduction will go here. Describe what makes your board game unique,
                                    the story behind it, and what players can expect from the experience.]
                                </p>
                            </div>

                            <h3 className="h4 text-primary mb-3">Our Vision</h3>
                            <div className="border border-2 border-dashed border-secondary rounded p-4 bg-light">
                                <p className="text-muted fst-italic mb-0">
                                    [Share your vision for the game here. What inspired you to create this?
                                    What do you hope players will feel and experience when they play?]
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="text-center">
                            <div className="bg-primary text-white rounded-3 p-5 shadow-lg">
                                <div className="display-1 mb-3">🎮</div>
                                <h4 className="fw-bold mb-2">Mascot Image</h4>
                                <small className="opacity-75">Add your mascot character here</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MascotSection 