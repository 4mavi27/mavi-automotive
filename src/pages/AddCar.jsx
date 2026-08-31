import { useState } from "react"
import "./AddCar.css"
function AddCar() {
    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [price, setPrice] = useState("")
    const [year, setYear] = useState("")
    const [mileage, setMileage] = useState("")
    const [fuel, setFuel] = useState("Petrol")
    const [transmission, setTransmission] = useState("Automatic")
    const [featured, setFeatured] = useState(false)
    const [image, setImage] = useState(null)
    const [submitted, setSubmitted] = useState(false)


    const handleSubmit = (event) => {
        event.preventDefault()
        if (
            !make ||
            !model ||
            !price ||
            !year ||
            !mileage
        ) {
            alert("Please fill in all required fields.")
            return
        }

        const newCar = {
            make,
            model,
            price: Number(price),
            year: Number(year),
            mileage: Number(mileage),
            fuel,
            transmission,
            featured,
            image
        }

        console.log(newCar)
        setSubmitted(true)
        setMake("")
        setModel("")
        setPrice("")
        setYear("")
        setMileage("")
        setFuel("Petrol")
        setTransmission("Automatic")
        setFeatured(false)
        setImage(null)
    }
    return (
        <section className="add-car-page">
            <h1>Add New Car</h1>
            <form
                className="add-car-form"
                onSubmit={handleSubmit}
            >
                <label>Make</label>
                <input
                    type="text"
                    placeholder="Enter car make"
                    value={make}
                    onChange={(event) => setMake(event.target.value)}
                />

                <label>Model</label>
                <input
                    type="text"
                    placeholder="Enter car model"
                    value={model}
                    onChange={(event) => setModel(event.target.value)}
                />

                <label>Price</label>
                <input
                    type="number"
                    placeholder="Enter car price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                />
                <label>Year</label>
                <input
                    type="number"
                    placeholder="Enter car year"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                />

                <label>Mileage</label>
                <input
                    type="number"
                    placeholder="Enter mileage"
                    value={mileage}
                    onChange={(event) => setMileage(event.target.value)}
                />

                <label>Fuel</label>
                <select
                    value={fuel}
                    onChange={(event) => setFuel(event.target.value)}
                >
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Electric</option>
                    <option>Hybrid</option>
                </select>

                <label>Transmission</label>
                <select
                    value={transmission}
                    onChange={(event) => setTransmission(event.target.value)}
                >
                    <option>Automatic</option>
                    <option>Manual</option>
                </select>
                <label>Featured</label>
                <select
                    value={featured}
                    onChange={(event) =>
                        setFeatured(event.target.value === "true")
                    }
                >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>
                <label>Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => setImage(event.target.files[0])}
                />

                <button type="submit">
                    Add Car
                </button>
                {submitted && (
                    <p className="success-message">
                        Car added successfully.
                    </p>
                )}
            </form>
        </section>
    )
}

export default AddCar