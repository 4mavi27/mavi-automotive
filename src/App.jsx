import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom"

import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import ScrollToTop from "./components/ScrollToTop.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

import Home from "./pages/Home.jsx"
import CarsPage from "./pages/CarsPage.jsx"
import CarDetailsPage from "./pages/CarDetailsPage.jsx"
import Contact from "./pages/Contact.jsx"
import Finance from "./pages/Finance.jsx"
import SellCarPage from "./pages/SellCarPage.jsx"
import About from "./pages/About.jsx"

import AdminLogin from "./pages/AdminLogin.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import ManageCars from "./pages/ManageCars.jsx"
import AddCar from "./pages/AddCar.jsx"
import EditCar from "./pages/EditCar.jsx"

import {
  AuthProvider
} from "./context/AuthContext.jsx"

function AppContent() {
  const location = useLocation()

  const isAdminPage =
    location.pathname.startsWith("/admin")

  return (
    <>
      {!isAdminPage && <Navbar />}

      <ScrollToTop />

      <Routes>
        {/* Public routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/cars"
          element={<CarsPage />}
        />

        <Route
          path="/cars/:id"
          element={<CarDetailsPage />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/finance"
          element={<Finance />}
        />

        <Route
          path="/sell-your-car"
          element={<SellCarPage />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        {/* Public admin login route */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Protected admin routes */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/cars"
          element={
            <ProtectedRoute>
              <ManageCars />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/cars/add"
          element={
            <ProtectedRoute>
              <AddCar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/cars/edit/:id"
          element={
            <ProtectedRoute>
              <EditCar />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App