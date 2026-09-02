import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./EditCar.css"

function EditCar() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [price, setPrice] = useState("")
    const [year, setYear] = useState("")
    const [mileage, setMileage] = useState("")
    const [fuel, setFuel] = useState("Petrol")
    const [transmission, setTransmission] = useState("Automatic")
    const [featured, setFeatured] = useState(false)

    const [loading, setLoading] = useState(true)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:5000/api/cars/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setMake(data.make)
                setModel(data.model)
                setPrice(data.price)
                setYear(data.year)
                setMileage(data.mileage)
                setFuel(data.fuel)
                setTransmission(data.transmission)
                setFeatured(data.featured)

                setLoading(false)
            })
    }, [id])

    const handleSubmit = (event) => {
        event.preventDefault()

        const updatedCar = {
            make,
            model,
            price: Number(price),
            year: Number(year),
            mileage: Number(mileage),
            fuel,
            transmission,
            featured
        }

        fetch(`http://localhost:5000/api/cars/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedCar)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setSubmitted(true)

                setTimeout(() => {
                    navigate("/admin/cars")
                }, 1000)
            })
    }

    if (loading) {
        return (
            <section className="edit-car-page">
                <p className="edit-loading">Loading car details...</p>
            </section>
        )
    }

    return (
        <section className="edit-car-page">
            <div className="edit-car-container">
                <div className="edit-car-header">
                    <div>
                        <p className="edit-car-label">
                            Admin Panel
                        </p>

                        <h1>Edit Car</h1>

                        <p>
                            Update the vehicle details below.
                        </p>
                    </div>

                    <button
                        className="back-button"
                        onClick={() => navigate("/admin/cars")}
                    >
                        Back to Manage Cars
                    </button>
                </div>

                <form
                    className="edit-car-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <label>Make</label>

                        <input
                            type="text"
                            value={make}
                            onChange={(event) =>
                                setMake(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Model</label>

                        <input
                            type="text"
                            value={model}
                            onChange={(event) =>
                                setModel(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Price</label>

                        <input
                            type="number"
                            value={price}
                            onChange={(event) =>
                                setPrice(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Year</label>

                        <input
                            type="number"
                            value={year}
                            onChange={(event) =>
                                setYear(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mileage</label>

                        <input
                            type="number"
                            value={mileage}
                            onChange={(event) =>
                                setMileage(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Fuel</label>

                        <select
                            value={fuel}
                            onChange={(event) =>
                                setFuel(event.target.value)
                            }
                        >
                            <option>Petrol</option>
                            <option>Diesel</option>
                            <option>Electric</option>
                            <option>Hybrid</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Transmission</label>

                        <select
                            value={transmission}
                            onChange={(event) =>
                                setTransmission(event.target.value)
                            }
                        >
                            <option>Automatic</option>
                            <option>Manual</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Featured</label>

                        <select
                            value={featured}
                            onChange={(event) =>
                                setFeatured(
                                    event.target.value === "true"
                                )
                            }
                        >
                            <option value="false">
                                No
                            </option>

                            <option value="true">
                                Yes
                            </option>
                        </select>
                    </div>

                    <div className="edit-form-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() =>
                                navigate("/admin/cars")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="update-button"
                        >
                            Update Car
                        </button>
                    </div>

                    {submitted && (
                        <p className="edit-success-message">
                            Car updated successfully.
                        </p>
                    )}
                </form>
            </div>
        </section>
    )
}

export default EditCar