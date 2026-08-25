import { Link } from "react-router-dom"
import "./FinanceSection.css"

function FinanceSection() {
  return (
    <section className="finance-section">
      <div className="container">

        <div className="finance-section-card">

          <div className="finance-section-overlay"></div>

          <div className="finance-section-content">
            <h2>Finance Made Simple</h2>

            <h3>Drive now, pay your way.</h3>

            <p>
              We work with trusted lenders to offer flexible finance
              options with competitive rates.
            </p>

            <Link
              to="/finance"
              className="finance-section-btn"
            >
              Learn More
            </Link>
          </div>

        </div>

      </div>
    </section>
  )
}

export default FinanceSection