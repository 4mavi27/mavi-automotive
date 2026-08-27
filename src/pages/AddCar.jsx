import "./AddCar.css"
function AddCar() {
    return (
        <section className="add-car-page">
            <h1>Add New Car</h1>
            <form className="add-car-form">
                <label>Make</label>
                <input
                    type="text"
                    placeholder="Enter car make"
                />

                <label>Model</label>
                <input
                    type="text"
                    placeholder="Enter car model"
                />

                <label>Price</label>
                <input
                    type="number"
                    placeholder="Enter car price"
                />

                <button type="submit">
                    Add Car
                </button>
            </form>
        </section>
    )
}

export default AddCar