const CardGameSection = () => {
    return (
        <section id="cards" className="py-5 bg-light">
            <div className="container">
                <h2 className="display-5 fw-bold text-center mb-5">Card Collection</h2>

                <div className="row justify-content-center mb-5">
                    <div className="col-lg-8 text-center">
                        <div className="row g-4 mb-4">
                            <div className="col-md-4">
                                <div className="text-center">
                                    <div className="display-6 fw-bold text-primary mb-2">150+</div>
                                    <div className="text-muted fw-semibold">Total Cards</div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="text-center">
                                    <div className="display-6 fw-bold text-primary mb-2">5</div>
                                    <div className="text-muted fw-semibold">Card Types</div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="text-center">
                                    <div className="display-6 fw-bold text-primary mb-2">Unique</div>
                                    <div className="text-muted fw-semibold">Designs</div>
                                </div>
                            </div>
                        </div>

                        <div className="card-description">
                            <h3 className="h4 mb-3">About Our Cards</h3>
                            <p className="lead text-muted">
                                Each card in GON has been carefully crafted with unique artwork and strategic gameplay elements.
                                Our collection features diverse card types including character cards, action cards, resource cards,
                                and special event cards that create dynamic and engaging gameplay experiences.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-lg-3 col-md-6">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body text-center p-4">
                                <div className="display-4 mb-3">🃏</div>
                                <h4 className="card-title h5 mb-3">Character Cards</h4>
                                <p className="card-text text-muted">Unique heroes and villains with special abilities</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body text-center p-4">
                                <div className="display-4 mb-3">⚡</div>
                                <h4 className="card-title h5 mb-3">Action Cards</h4>
                                <p className="card-text text-muted">Strategic moves and powerful effects</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body text-center p-4">
                                <div className="display-4 mb-3">💎</div>
                                <h4 className="card-title h5 mb-3">Resource Cards</h4>
                                <p className="card-text text-muted">Valuable assets and currency</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body text-center p-4">
                                <div className="display-4 mb-3">🌟</div>
                                <h4 className="card-title h5 mb-3">Special Events</h4>
                                <p className="card-text text-muted">Game-changing moments and surprises</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CardGameSection 