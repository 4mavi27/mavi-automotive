import { useState } from "react"
import { NavLink } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav className="navbar">
      <div className="container navbar-container">

        <h2 className="navbar-brand">
          Mavi Automotive
        </h2>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}

        >
          ☰
        </button>

        <ul
          className={menuOpen ? "nav-links open" : "nav-links"}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/cars"
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              Cars
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/finance"
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              Finance
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/sell-your-car"
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              Sell Your Car
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
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