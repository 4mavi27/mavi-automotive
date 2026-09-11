import { Link } from 'react-router-dom'
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
        <span>{props.year}</span>
        <span>{props.mileage.toLocaleString()} miles</span>
        <span>{props.fuel}</span>
      </div>
      <Link
        to={`/cars/${props.id}`}
        className="view-details-btn"
      >
        View Details
      </Link>
    </div>
  )
}

export default CarCard