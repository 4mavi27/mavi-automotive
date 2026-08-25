import { Link } from "react-router-dom"
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">

      <div className="container footer-container">

        <div className="footer-column footer-brand">
          <h2>
            <span>MAVI</span> AUTOMOTIVE
          </h2>

          <p>
            Trusted car specialists offering quality
            used cars, finance and exceptional
            customer service.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/finance">Finance</Link>
          <Link to="/sell-your-car">
            Sell Your Car
          </Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-column">
          <h3>Our Services</h3>

          <p>Car Finance</p>
          <p>Part Exchange</p>
          <p>Warranty</p>
          <p>Vehicle Sourcing</p>
          <p>Delivery</p>
        </div>

        <div className="footer-column">
          <h3>Contact Us</h3>

          <p>London, United Kingdom</p>
          <p>Contact our team for enquiries.</p>
        </div>

      </div>

      <div className="container footer-bottom">
        <p>
          © 2026 Mavi Automotive. All rights reserved.
        </p>
      </div>

    </footer>
  )
}

export default Footer