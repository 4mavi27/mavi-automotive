import { useEffect, useState } from "react"
import CarCard from "../components/CarCard.jsx"
import cars from "../data/cars.js"
import "../components/Cars.css"

function CarsPage() {
  const [search, setSearch] = useState("")
  const [sortOption, setSortOption] = useState("")
  const [fuelFilter, setFuelFilter] = useState("All")
  const [maxPrice, setMaxPrice] = useState("")
  const [brandFilter, setBrandFilter] = useState("All")
  const [showAllBrands, setShowAllBrands] = useState(false)
  const [apiCars, setApiCars] = useState([])

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)

  const carsPerPage = 9

  useEffect(() => {
    fetch("http://localhost:5000/api/cars")
      .then((response) => response.json())
      .then((data) => {
        setApiCars(data)
        console.log(data)
      })
  }, [])

  const brands = [
    "BMW",
    "Audi",
    "Mercedes",
    "Ford",
    "Toyota",
    "Volkswagen",
    "Tesla",
  ]

  const visibleBrands = brands.slice(0, 5)
  const extraBrands = brands.slice(5)

  // =========================
  // FILTER CARS
  // =========================

  const filteredCars = apiCars.filter((car) => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      car.make.toLowerCase().includes(searchText) ||
      car.model.toLowerCase().includes(searchText)

    const matchesBrand =
      brandFilter === "All" ||
      car.make === brandFilter

    const matchesFuel =
      fuelFilter === "All" ||
      car.fuel === fuelFilter

    const matchesPrice =
      maxPrice === "" ||
      car.price <= Number(maxPrice)

    return (
      matchesSearch &&
      matchesBrand &&
      matchesFuel &&
      matchesPrice
    )
  })

  // =========================
  // SORT CARS
  // =========================

  const sortedCars = [...filteredCars]

  if (sortOption === "low-high") {
    sortedCars.sort((a, b) => a.price - b.price)
  }

  if (sortOption === "high-low") {
    sortedCars.sort((a, b) => b.price - a.price)
  }

  if (sortOption === "newest") {
    sortedCars.sort((a, b) => b.year - a.year)
  }

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    sortedCars.length / carsPerPage
  )

  const startIndex =
    (currentPage - 1) * carsPerPage

  const carsForCurrentPage = sortedCars.slice(
    startIndex,
    startIndex + carsPerPage
  )

  // Go back to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [
    search,
    brandFilter,
    fuelFilter,
    maxPrice,
    sortOption,
  ])

  // =========================
  // RESET FILTERS
  // =========================

  const resetFilters = () => {
    setSearch("")
    setBrandFilter("All")
    setFuelFilter("All")
    setMaxPrice("")
    setSortOption("")
    setShowAllBrands(false)
    setCurrentPage(1)
  }

  return (
    <section className="cars-page">

      {/* =====================
          PAGE HEADER
      ====================== */}

      <div className="cars-page-header">
        <h1>All Cars</h1>

        <p>
          Find the perfect car to match your lifestyle.
        </p>

        <input
          className="cars-search"
          type="text"
          placeholder="Search by make or model..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />
      </div>

      {/* =====================
          SIDEBAR + CARS
      ====================== */}

      <div className="cars-page-layout">

        {/* =====================
            SIDEBAR
        ====================== */}

        <aside className="cars-sidebar">

          {/* BRAND FILTER */}

          <div className="sidebar-section">
            <h3>Browse by Brand</h3>

            <div className="brand-list-vertical">

              <button
                className={
                  brandFilter === "All"
                    ? "brand-row active"
                    : "brand-row"
                }
                onClick={() =>
                  setBrandFilter("All")
                }
              >
                All Brands
              </button>

              {visibleBrands.map((brand) => (
                <button
                  key={brand}
                  className={
                    brandFilter === brand
                      ? "brand-row active"
                      : "brand-row"
                  }
                  onClick={() =>
                    setBrandFilter(brand)
                  }
                >
                  {brand}
                </button>
              ))}

              <button
                className="browse-all-brands-btn"
                onClick={() =>
                  setShowAllBrands(!showAllBrands)
                }
              >
                {showAllBrands
                  ? "Hide Brands"
                  : "Browse All Brands"}
              </button>

              {showAllBrands &&
                extraBrands.map((brand) => (
                  <button
                    key={brand}
                    className={
                      brandFilter === brand
                        ? "brand-row active"
                        : "brand-row"
                    }
                    onClick={() =>
                      setBrandFilter(brand)
                    }
                  >
                    {brand}
                  </button>
                ))}

            </div>
          </div>

          {/* FUEL FILTER */}

          <div className="sidebar-section">
            <h3>Fuel Type</h3>

            <select
              value={fuelFilter}
              onChange={(event) =>
                setFuelFilter(event.target.value)
              }
            >
              <option value="All">
                All Fuel Types
              </option>

              <option value="Petrol">
                Petrol
              </option>

              <option value="Diesel">
                Diesel
              </option>

              <option value="Electric">
                Electric
              </option>
            </select>
          </div>

          {/* MAXIMUM PRICE */}

          <div className="sidebar-section">
            <h3>Maximum Price</h3>

            <input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(event) =>
                setMaxPrice(event.target.value)
              }
            />
          </div>

          {/* SORT */}

          <div className="sidebar-section">
            <h3>Sort By</h3>

            <select
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value)
              }
            >
              <option value="">
                Default
              </option>

              <option value="low-high">
                Price: Low to High
              </option>

              <option value="high-low">
                Price: High to Low
              </option>

              <option value="newest">
                Year: Newest First
              </option>
            </select>
          </div>

          <button
            className="reset-filters"
            onClick={resetFilters}
          >
            Reset Filters
          </button>

        </aside>

        {/* =====================
            CAR RESULTS
        ====================== */}

        <div className="cars-results">

          <p className="cars-count">
            Browse all available vehicles.
            Showing: {sortedCars.length}
          </p>

          <div className="car-list">

            {carsForCurrentPage.length === 0 ? (
              <p className="no-cars">
                No cars found.
              </p>
            ) : (
              carsForCurrentPage.map((car) => (
                <CarCard
                  key={car.id}
                  id={car.id}
                  make={car.make}
                  model={car.model}
                  price={car.price}
                  year={car.year}
                  mileage={car.mileage}
                  fuel={car.fuel}
                  image={car.image}
                />
              ))
            )}

          </div>

          {/* =====================
              PAGINATION
          ====================== */}

          {totalPages > 1 && (
            <div className="pagination">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => {
                  const pageNumber = index + 1

                  return (
                    <button
                      key={pageNumber}
                      className={
                        currentPage === pageNumber
                          ? "active-page"
                          : ""
                      }
                      onClick={() =>
                        setCurrentPage(pageNumber)
                      }
                    >
                      {pageNumber}
                    </button>
                  )
                }
              )}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
              >
                Next
              </button>

            </div>
          )}

        </div>
      </div>
    </section>
  )
}

export default CarsPage