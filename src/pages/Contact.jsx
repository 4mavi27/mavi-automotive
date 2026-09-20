import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import "./Contact.css"

function Contact() {
  // Form field states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  // Tracks whether the form has been successfully submitted
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reads query parameters from the current URL
  const [searchParams] = useSearchParams()
  const carId = searchParams.get("carId")

  const [selectedVehicle, setSelectedVehicle] =
    useState(null)

  const [vehicleLoading, setVehicleLoading] =
    useState(false)

  // Gets the selected car from the URL
  // Example URL: /contact?car=BMW-320d
  const selectedCar = searchParams.get("car")

  // Converts "BMW-320d" into "BMW 320d" for display
  const displayCar = selectedCar?.replace("-", " ")

  useEffect(() => {
    if (!carId) {
      return
    }

    const loadSelectedVehicle = async () => {
      setVehicleLoading(true)

      try {
        const response = await fetch(
          `http://localhost:5000/api/cars/${carId}`
        )

        if (!response.ok) {
          throw new Error(
            "Selected vehicle could not be loaded"
          )
        }

        const vehicle = await response.json()

        setSelectedVehicle(vehicle)
      } catch (error) {
        console.error(
          "Selected vehicle fetch error:",
          error
        )

        setSelectedVehicle(null)
      } finally {
        setVehicleLoading(false)
      }
    }

    loadSelectedVehicle()
  }, [carId])
  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault()

    setSubmitted(false)
    setErrorMessage("")
    setIsSubmitting(true)

    const enquiryMessage = message

    try {
      const response = await fetch(
        "http://localhost:5000/api/enquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            message: enquiryMessage,
            type: carId
              ? "vehicle"
              : "general",
            carId: carId || null
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit enquiry"
        )
      }

      setSubmitted(true)

      setName("")
      setEmail("")
      setPhone("")
      setMessage("")
    } catch (error) {
      console.error(
        "Submit enquiry error:",
        error
      )

      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact-page">
      <div className="contact-header">
        <p className="contact-eyebrow">
          GET IN TOUCH
        </p>

        <h1>How can we help?</h1>

        <p className="contact-subtitle">
          Have a question about one of our vehicles?
          Our team is here to help.
        </p>
      </div>

      {/* Show the selected vehicle only when it exists in the URL */}
      {vehicleLoading && (
        <p className="selected-vehicle-loading">
          Loading selected vehicle...
        </p>
      )}

      {selectedVehicle && (
        <div className="selected-vehicle-card">
          {selectedVehicle.images?.[0] && (
            <img
              src={selectedVehicle.images[0]}
              alt={`${selectedVehicle.make} ${selectedVehicle.model}`}
            />
          )}

          <div className="selected-vehicle-info">
            <span>YOUR SELECTED VEHICLE</span>

            <h2>
              {selectedVehicle.make}{" "}
              {selectedVehicle.model}
            </h2>

            <p className="selected-vehicle-price">
              £{selectedVehicle.price.toLocaleString()}
            </p>

            <div className="selected-vehicle-specs">
              <span>{selectedVehicle.year}</span>

              <span>
                {selectedVehicle.mileage.toLocaleString()} miles
              </span>

              <span>{selectedVehicle.fuel}</span>
            </div>
          </div>
        </div>
      )}

      <form
        className="contact-form"
        onSubmit={handleSubmit}
      >
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label>Phone</label>
        <input
          type="tel"
          placeholder="Enter your phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
        />

        <label>Message</label>
        <textarea
          placeholder="How can we help you?"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Submitting..."
            : "Submit Enquiry"}
        </button>
        {errorMessage && (
          <p className="contact-error-message">
            {errorMessage}
          </p>
        )}

        {/* Display confirmation after successful submission */}
        {submitted && (
          <p className="success-message">
            Thank you! Your enquiry has been submitted.
          </p>
        )}
      </form>
    </section>
  )
}

export default Contact