import { useState } from "react"
import {
  NavLink,
  Link
} from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const getLinkClass = ({ isActive }) =>
    isActive ? "active-link" : ""

  return (
    <nav className="navbar">
      <div className="container navbar-container">

        {/* Clickable website brand */}
        <Link
          to="/"
          className="navbar-brand"
          onClick={closeMenu}
          aria-label="Mavi Automotive home"
        >
          <span>Mavi</span>{" "}
          Automotive
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          className="menu-toggle"
          onClick={() =>
            setMenuOpen((currentState) => !currentState)
          }
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Navigation links */}
        <ul
          id="main-navigation"
          className={
            menuOpen
              ? "nav-links open"
              : "nav-links"
          }
        >
          <li>
            <NavLink
              to="/"
              end
              className={getLinkClass}
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/cars"
              className={getLinkClass}
              onClick={closeMenu}
            >
              Cars
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/finance"
              className={getLinkClass}
              onClick={closeMenu}
            >
              Finance
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/sell-your-car"
              className={getLinkClass}
              onClick={closeMenu}
            >
              Sell Your Car
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={getLinkClass}
              onClick={closeMenu}
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={getLinkClass}
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </li>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar