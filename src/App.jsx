import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import CarsPage from './pages/CarsPage.jsx'
import CarDetailsPage from './pages/CarDetailsPage.jsx'
import Contact from './pages/Contact.jsx'
import Finance from './pages/Finance.jsx'
import SellCarPage from './pages/SellCarPage.jsx'
import About from './pages/About.jsx'
import ScrollToTop from "./components/ScrollToTop"


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/cars/:id" element={<CarDetailsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/finance" element={<Finance />} />
        <Route
          path="/sell-your-car"
          element={<SellCarPage />}
        />
        <Route path="/about" element={<About />} />
      </Routes>


      <Footer />
    </BrowserRouter>
  )
}

export default App