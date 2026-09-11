import CarCard from "./CarCard"
import { useEffect, useState } from "react"
//import cars from "../data/cars.js"
import "./Cars.css"

function Cars() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/cars")
      .then((response) => response.json())
      .then((data) => {
        setCars(data)
      })
      .catch((error) => {
        console.log("Failed to fetch featured cars:", error)
      })
  }, [])

  const featuredCars = cars.filter(
    (car) => car.featured
  )

  const sliderCars = [
    ...featuredCars,
    ...featuredCars,
  ]

  return (
    <section className="cars">

      <div className="container">

        <h2>Featured Cars</h2>

        <div className="cars-slider">

          <div className="cars-slider-track">

            {sliderCars.map((car, index) => (
              <CarCard
                key={`${car.id}-${index}`}
                id={car.id}
                make={car.make}
                model={car.model}
                price={car.price}
                year={car.year}
                mileage={car.mileage}
                fuel={car.fuel}
                images={car.images}
              />
            ))}

          </div>

        </div>

      </div>

    </section>
  )
}

export default Cars