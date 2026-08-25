import { Link } from "react-router-dom"
import "./Hero.css"

function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero">
          <div className="hero-overlay"></div>

          <div className="hero-inner">
            <div className="hero-content">
              <h1>
                Find Your
                <br />
                Perfect Car
              </h1>

              <p>
                Quality used cars. Competitive finance.
                <br />
                Drive away with confidence.
              </p>

              <div className="hero-actions">
                <Link
                  to="/cars"
                  className="hero-primary-btn"
                >
                  Browse Cars
                </Link>

                <Link
                  to="/sell-your-car"
                  className="hero-secondary-btn"
                >
                  Sell Your Car
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero