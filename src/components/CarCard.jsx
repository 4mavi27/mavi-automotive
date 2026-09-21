import { Link } from 'react-router-dom'
import {
  CalendarDays,
  Gauge,
  Fuel
} from "lucide-react"
import "./CarCard.css"
function CarCard(props) {
  return (
    <div className="car-card">
      <img
        src={props.images?.[0]}
        alt={`${props.make} ${props.model}`}
      />

      <h3>{props.make}</h3>
      <p className="car-model">{props.model}</p>

      <p className="car-price">
        £{props.price.toLocaleString()}
      </p>

      <div className="car-details">
        <span>
          <CalendarDays aria-hidden="true" />
          {props.year}
        </span>

        <span>
          <Gauge aria-hidden="true" />
          {props.mileage.toLocaleString()} miles
        </span>

        <span>
          <Fuel aria-hidden="true" />
          {props.fuel}
        </span>
      </div>
      <div className="car-card-actions">
        <Link
          to={`/cars/${props.id}`}
          className="view-details-btn"
        >
          View Details
        </Link>

        <Link
          to={`/contact?carId=${encodeURIComponent(
            props.id
          )}&car=${encodeURIComponent(
            `${props.make} ${props.model}`
          )}`}
          className="enquire-car-btn"
        >
          Enquire
        </Link>
      </div>
    </div>
  )
}

export default CarCard