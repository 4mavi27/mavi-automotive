import { Link } from "react-router-dom"
import "./SellYourCar.css"

function SellYourCar() {
  return (
    <section className="sell-home">

      <div className="container">

        <div className="sell-home-card">

          <div className="sell-home-content">

            <div className="sell-home-icon">
              🚗
            </div>

            <div>
              <h2>
                Looking to sell your car?
              </h2>

              <p>
                Get a free, no-obligation valuation
                in minutes.
              </p>
            </div>

          </div>

          <Link
            to="/sell-your-car"
            className="sell-home-btn"
          >
            Get Your Free Valuation
          </Link>

        </div>

      </div>

    </section>
  )
}

export default SellYourCar