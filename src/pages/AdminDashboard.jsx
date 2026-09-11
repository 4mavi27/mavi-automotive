import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./AdminDashboard.css"

function AdminDashboard() {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    // =========================================
    // LOAD INVENTORY
    // =========================================

    useEffect(() => {
        fetch("http://localhost:5000/api/cars")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch cars")
                }

                return response.json()
            })
            .then((data) => {
                setCars(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Dashboard fetch error:", error)

                setErrorMessage(
                    "Unable to load dashboard data."
                )

                setLoading(false)
            })
    }, [])

    // =========================================
    // DASHBOARD STATS
    // =========================================

    const totalCars = cars.length

    const featuredCars = cars.filter(
        (car) => car.featured
    ).length

    // No separate availability field yet,
    // so all stored cars are treated as available.
    const availableCars = totalCars

    const enquiries = 0

    // Latest cars first
    const recentCars = [...cars]
        .reverse()
        .slice(0, 4)

    return (
        <div className="admin-dashboard">

            {/* =====================================
                SIDEBAR
            ===================================== */}

            <aside className="admin-sidebar">

                <div className="sidebar-brand">
                    <div className="sidebar-logo">
                        M
                    </div>

                    <div>
                        <h2>Mavi Automotive</h2>
                        <span>Admin Panel</span>
                    </div>
                </div>

                <nav className="admin-nav">

                    <Link
                        to="/admin"
                        className="admin-nav-item active"
                    >
                        <span className="admin-nav-icon">
                            ◫
                        </span>

                        Dashboard
                    </Link>

                    <Link
                        to="/admin/cars"
                        className="admin-nav-item"
                    >
                        <span className="admin-nav-icon">
                            🚗
                        </span>

                        Manage Cars
                    </Link>

                    <button
                        type="button"
                        className="admin-nav-item admin-nav-disabled"
                    >
                        <span className="admin-nav-icon">
                            ✉
                        </span>

                        Enquiries

                        <span className="coming-soon-badge">
                            Soon
                        </span>
                    </button>

                    <button
                        type="button"
                        className="admin-nav-item admin-nav-disabled"
                    >
                        <span className="admin-nav-icon">
                            ⚙
                        </span>

                        Settings
                    </button>

                </nav>

                <div className="sidebar-footer">
                    <p>
                        Mavi Automotive
                    </p>

                    <span>
                        Dealership Management
                    </span>
                </div>

            </aside>

            {/* =====================================
                MAIN
            ===================================== */}

            <main className="admin-main">

                {/* =================================
                    TOP BAR
                ================================= */}

                <div className="dashboard-topbar">

                    <div>
                        <p className="dashboard-label">
                            Admin Overview
                        </p>

                        <h1>
                            Dashboard
                        </h1>

                        <p className="dashboard-subtitle">
                            Manage your inventory and monitor
                            dealership activity.
                        </p>
                    </div>

                    <Link
                        to="/admin/cars/add"
                        className="dashboard-add-car-btn"
                    >
                        + Add New Car
                    </Link>

                </div>

                {/* =================================
                    ERROR
                ================================= */}

                {errorMessage && (
                    <p className="dashboard-error">
                        {errorMessage}
                    </p>
                )}

                {/* =================================
                    STATS
                ================================= */}

                <section className="admin-stats">

                    <div className="stat-card">

                        <div className="stat-card-top">
                            <div className="stat-icon">
                                🚘
                            </div>

                            <span>
                                Inventory
                            </span>
                        </div>

                        <div className="stat-card-content">
                            <h3>
                                Total Cars
                            </h3>

                            <p>
                                {loading
                                    ? "—"
                                    : totalCars}
                            </p>
                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-card-top">
                            <div className="stat-icon">
                                ✓
                            </div>

                            <span>
                                Active
                            </span>
                        </div>

                        <div className="stat-card-content">
                            <h3>
                                Available Cars
                            </h3>

                            <p>
                                {loading
                                    ? "—"
                                    : availableCars}
                            </p>
                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-card-top">
                            <div className="stat-icon">
                                ★
                            </div>

                            <span>
                                Homepage
                            </span>
                        </div>

                        <div className="stat-card-content">
                            <h3>
                                Featured Cars
                            </h3>

                            <p>
                                {loading
                                    ? "—"
                                    : featuredCars}
                            </p>
                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-card-top">
                            <div className="stat-icon">
                                ✉
                            </div>

                            <span>
                                Leads
                            </span>
                        </div>

                        <div className="stat-card-content">
                            <h3>
                                Enquiries
                            </h3>

                            <p>
                                {enquiries}
                            </p>
                        </div>

                    </div>

                </section>

                {/* =================================
                    LOWER GRID
                ================================= */}

                <div className="dashboard-content-grid">

                    {/* QUICK ACTIONS */}

                    <section className="dashboard-panel">

                        <div className="dashboard-panel-header">
                            <div>
                                <h2>
                                    Quick Actions
                                </h2>

                                <p>
                                    Common inventory management
                                    tasks.
                                </p>
                            </div>
                        </div>

                        <div className="quick-actions">

                            <Link
                                to="/admin/cars/add"
                                className="quick-action-card"
                            >
                                <div className="quick-action-icon">
                                    +
                                </div>

                                <div>
                                    <strong>
                                        Add New Car
                                    </strong>

                                    <span>
                                        Add another vehicle to
                                        your inventory.
                                    </span>
                                </div>
                            </Link>

                            <Link
                                to="/admin/cars"
                                className="quick-action-card"
                            >
                                <div className="quick-action-icon">
                                    🚗
                                </div>

                                <div>
                                    <strong>
                                        Manage Inventory
                                    </strong>

                                    <span>
                                        Edit, update or remove
                                        existing cars.
                                    </span>
                                </div>
                            </Link>

                        </div>

                    </section>

                    {/* INVENTORY OVERVIEW */}

                    <section className="dashboard-panel">

                        <div className="dashboard-panel-header">

                            <div>
                                <h2>
                                    Inventory Overview
                                </h2>

                                <p>
                                    Current dealership inventory
                                    summary.
                                </p>
                            </div>

                        </div>

                        <div className="inventory-overview">

                            <div>
                                <span>
                                    Total vehicles
                                </span>

                                <strong>
                                    {totalCars}
                                </strong>
                            </div>

                            <div>
                                <span>
                                    Featured
                                </span>

                                <strong>
                                    {featuredCars}
                                </strong>
                            </div>

                            <div>
                                <span>
                                    Standard listings
                                </span>

                                <strong>
                                    {totalCars -
                                        featuredCars}
                                </strong>
                            </div>

                        </div>

                    </section>

                </div>

                {/* =================================
                    RECENT INVENTORY
                ================================= */}

                <section className="dashboard-panel recent-inventory-panel">

                    <div className="dashboard-panel-header">

                        <div>
                            <h2>
                                Recent Inventory
                            </h2>

                            <p>
                                Latest vehicles in your
                                inventory.
                            </p>
                        </div>

                        <Link
                            to="/admin/cars"
                            className="view-all-cars-link"
                        >
                            View all cars →
                        </Link>

                    </div>

                    {loading ? (

                        <p className="dashboard-loading">
                            Loading inventory...
                        </p>

                    ) : recentCars.length === 0 ? (

                        <div className="dashboard-empty-state">
                            No vehicles added yet.
                        </div>

                    ) : (

                        <div className="recent-cars-grid">

                            {recentCars.map((car) => (

                                <Link
                                    key={car._id}
                                    to={`/admin/cars/edit/${car._id}`}
                                    className="recent-car-card"
                                >

                                    <div className="recent-car-image">

                                        {car.images &&
                                        car.images.length >
                                            0 ? (

                                            <img
                                                src={
                                                    car
                                                        .images[0]
                                                }
                                                alt={`${car.make} ${car.model}`}
                                            />

                                        ) : (

                                            <div className="recent-car-placeholder">
                                                🚗
                                            </div>

                                        )}

                                    </div>

                                    <div className="recent-car-details">

                                        <div className="recent-car-heading">

                                            <div>
                                                <h3>
                                                    {
                                                        car.make
                                                    }{" "}
                                                    {
                                                        car.model
                                                    }
                                                </h3>

                                                <span>
                                                    {
                                                        car.year
                                                    }
                                                </span>
                                            </div>

                                            {car.featured && (
                                                <span className="dashboard-featured-badge">
                                                    Featured
                                                </span>
                                            )}

                                        </div>

                                        <strong className="recent-car-price">
                                            £
                                            {Number(
                                                car.price
                                            ).toLocaleString()}
                                        </strong>

                                    </div>

                                </Link>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    )
}

export default AdminDashboard