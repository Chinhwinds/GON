import './App.css'
import MascotSection from './components/MascotSection'
import CardGameSection from './components/CardGameSection'
import CardList from './components/CardList'
import CardDetail from './components/CardDetail'
import CardStoryGenerator from './components/CardStoryGenerator'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar navbar-expand-lg navbar-dark bg-success sticky-top">
          <div className="container">
            <Link className="navbar-brand fw-bold fs-3" to="/">GON</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#mascot">Linh vật</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#cards">Thẻ bài</a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cards">Bộ sưu tập thẻ</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/story-generator">Tạo câu chuyện</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <main>
              <section id="home" className="bg-success text-white text-center py-5">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <h1 className="display-4 fw-bold mb-3">Chào mừng đến với GON</h1>
                      <p className="lead">Một cuộc phiêu lưu board game hoành tráng đang chờ đợi</p>
                    </div>
                  </div>
                </div>
              </section>
              <MascotSection />
              <CardGameSection />
            </main>
          } />
          <Route path="/cards" element={<CardList />} />
          <Route path="/card/:id" element={<CardDetail />} />
          <Route path="/story-generator" element={<CardStoryGenerator />} />
        </Routes>

        <footer className="bg-dark text-white text-center py-4">
          <div className="container">
            <p className="mb-0">&copy; 2024 GON Board Game. Tất cả quyền được bảo lưu.</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
