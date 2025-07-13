import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import MascotSection from './components/MascotSection'
import CardGameSection from './components/CardGameSection'
import CardList from './components/CardList'
import CardDetail from './components/CardDetail'

function App() {
  console.log('App fully loaded');
  return (
    <Router>
      <div className="app">
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container">
            <Link className="navbar-brand fw-bold fs-3" to="/">GON</Link>
            <div className="navbar-nav">
              <Link className="nav-link" to="/cards">Bộ sưu tập thẻ</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <main>
              <section id="home" className="bg-success text-white text-center py-5">
                <div className="container">
                  <h1 className="display-4 fw-bold mb-3">Chào mừng đến với GON</h1>
                  <p className="lead">Một cuộc phiêu lưu board game hoành tráng đang chờ đợi</p>
                </div>
              </section>
              <MascotSection />
              <CardGameSection />
            </main>
          } />
          <Route path="/cards" element={<CardList />} />
          <Route path="/card/:id" element={<CardDetail />} />
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
