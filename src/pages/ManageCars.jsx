import { Link } from "react-router-dom"
//import cars from "../data/cars.js"
import { useEffect, useState } from "react"
import "./ManageCars.css"

function ManageCars() {
    const [cars, setCars] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/cars")
            .then((response) => response.json())
            .then((data) => {
                setCars(data)
            })
    }, [])


    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/cars/${id}`, {
            method: "DELETE"
        })
            .then((response) => response.json())
            .then(() => {
                setCars((currentCars) =>
                    currentCars.filter((car) => car.id !== id)
                )
            })
    }

    return (
        <section className="manage-cars-page">
            <div className="manage-cars-header">
                <h1>Manage Cars</h1>
                <Link
                    to="/admin/cars/add"
                    className="add-car-btn"
                >
                    Add New Car
                </Link>
            </div>
            <table className="cars-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Car</th>
                        <th>Price</th>
                        <th>Year</th>
                        <th>Fuel</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car.id}>
                            <td>{car.id}</td>
                            <td>
                                {car.make} {car.model}
                            </td>
                            <td>£{car.price.toLocaleString()}</td>
                            <td>{car.year}</td>
                            <td>{car.fuel}</td>
                            <td>
                                <img
                                    src={car.image}
                                    alt={`${car.make} ${car.model}`}
                                    className="admin-car-image"
                                />
                            </td>
                            <td>
                                <Link to={`/admin/cars/edit/${car.id}`}>
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(car.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </section>
    )
}

export default ManageCars