import "./AdminDashboard.css"
import { Link } from "react-router-dom"
import cars from "../data/cars.js"
function AdminDashboard() {
    const totalCars = cars.length
    const featuredCars = cars.filter((car) => car.featured).length
    return (
        <div className="admin-dashboard">

            <aside className="admin-sidebar">
                <h2>Mavi Automotive</h2>

                <nav>
                    <p className="active">Dashboard</p>
                    <Link to="/admin/cars">
                        Manage Cars
                    </Link>
                    <p>Enquiries</p>
                    <p>Settings</p>
                </nav>
            </aside>

            <main className="admin-main">
                <h1>Dashboard</h1>
                <p>Welcome back, Admin!</p>
                <div className="admin-stats">
                    <div className="stat-card">
                        <h3>Total Cars</h3>
                        <p>{totalCars}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Available Cars</h3>
                        <p>8</p>
                    </div>

                    <div className="stat-card">
                        <h3>Featured Cars</h3>
                        <p>{featuredCars}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Enquiries</h3>
                        <p>5</p>
                    </div>
                </div>
            </main>

        </div>

    )
}

export default AdminDashboard