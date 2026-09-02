import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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
import AdminDashboard from './pages/AdminDashboard.jsx'
import ManageCars from "./pages/ManageCars.jsx"
import AddCar from './pages/AddCar.jsx'
import EditCar from './pages/EditCar.jsx'

function AppContent() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith("/admin")
  return (
    <>
      {!isAdminPage && <Navbar />}

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

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
        <Route path="/admin/cars" element={<ManageCars />} />
        <Route path="/admin/cars/add" element={<AddCar />} />
        <Route
          path="/admin/cars/edit/:id"
          element={<EditCar />}
        />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  )
}


function App() {
  return (
    <BrowserRouter>
      <AppContent />

    </BrowserRouter>
  )
}

export default App