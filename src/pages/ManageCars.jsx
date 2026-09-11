import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./ManageCars.css"

function ManageCars() {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    // =========================================
    // FETCH CARS
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
                console.error("Fetch cars error:", error)

                setErrorMessage(
                    "Failed to load cars. Please try again."
                )

                setLoading(false)
            })
    }, [])

    // =========================================
    // DELETE CAR
    // =========================================

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this car?"
        )

        if (!confirmed) {
            return
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/cars/${id}`,
                {
                    method: "DELETE"
                }
            )

            if (!response.ok) {
                throw new Error("Failed to delete car")
            }

            setCars((currentCars) =>
                currentCars.filter(
                    (car) => car._id !== id
                )
            )
        } catch (error) {
            console.error("Delete error:", error)

            setErrorMessage(
                "Failed to delete car. Please try again."
            )
        }
    }

    // =========================================
    // LOADING
    // =========================================

    if (loading) {
        return (
            <section className="manage-cars-page">
                <p className="manage-cars-loading">
                    Loading cars...
                </p>
            </section>
        )
    }

    return (
        <section className="manage-cars-page">

            <div className="manage-cars-container">

                {/* =====================================
                    HEADER
                ===================================== */}

                <div className="manage-cars-header">

                    <div>
                        <p className="manage-cars-label">
                            Admin Panel
                        </p>

                        <h1>
                            Manage Cars
                        </h1>

                        <p className="manage-cars-subtitle">
                            View, edit and manage your vehicle inventory.
                        </p>
                    </div>

                    <div className="manage-cars-header-actions">

                        <Link
                            to="/admin"
                            className="back-dashboard-btn"
                        >
                            ← Back to Dashboard
                        </Link>

                        <Link
                            to="/admin/cars/add"
                            className="add-new-car-btn"
                        >
                            + Add New Car
                        </Link>

                    </div>

                </div>

                {/* =====================================
                    ERROR
                ===================================== */}

                {errorMessage && (
                    <p className="manage-cars-error">
                        {errorMessage}
                    </p>
                )}

                {/* =====================================
                    EMPTY STATE
                ===================================== */}

                {cars.length === 0 ? (

                    <div className="no-cars-card">

                        <h2>
                            No cars found
                        </h2>

                        <p>
                            Add your first vehicle to the inventory.
                        </p>

                        <Link
                            to="/admin/cars/add"
                            className="empty-add-car-btn"
                        >
                            Add New Car
                        </Link>

                    </div>

                ) : (

                    /* =====================================
                        TABLE
                    ===================================== */

                    <div className="manage-cars-table-wrapper">

                        <table className="manage-cars-table">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Car</th>
                                    <th>Price</th>
                                    <th>Year</th>
                                    <th>Fuel</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {cars.map((car, index) => (

                                    <tr key={car._id}>

                                        {/* Short display ID */}

                                        <td
                                            data-label="ID"
                                            className="car-number"
                                        >
                                            #{index + 1}
                                        </td>

                                        {/* Car */}

                                        <td data-label="Car">

                                            <div className="car-name-cell">

                                                <strong>
                                                    {car.make} {car.model}
                                                </strong>

                                                {car.featured && (
                                                    <span className="table-featured-badge">
                                                        Featured
                                                    </span>
                                                )}

                                            </div>

                                        </td>

                                        {/* Price */}

                                        <td data-label="Price">
                                            £
                                            {Number(
                                                car.price
                                            ).toLocaleString()}
                                        </td>

                                        {/* Year */}

                                        <td data-label="Year">
                                            {car.year}
                                        </td>

                                        {/* Fuel */}

                                        <td data-label="Fuel">
                                            {car.fuel}
                                        </td>

                                        {/* Image */}

                                        <td data-label="Image">

                                            {car.images &&
                                            car.images.length > 0 ? (

                                                <img
                                                    className="manage-car-image"
                                                    src={car.images[0]}
                                                    alt={`${car.make} ${car.model}`}
                                                />

                                            ) : (

                                                <div className="manage-car-image-placeholder">
                                                    No Image
                                                </div>

                                            )}

                                        </td>

                                        {/* Actions */}

                                        <td data-label="Actions">

                                            <div className="car-actions">

                                                <Link
                                                    to={`/admin/cars/edit/${car._id}`}
                                                    className="edit-car-btn"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    type="button"
                                                    className="delete-car-btn"
                                                    onClick={() =>
                                                        handleDelete(
                                                            car._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </section>
    )
}

export default ManageCars