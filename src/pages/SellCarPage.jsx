import { useState } from "react"
import "./SellCarPage.css"

function SellCarPage() {
  // Vehicle details
  const [registration, setRegistration] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [mileage, setMileage] = useState("")

  // Customer details
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  // Validation / success message
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    // Check empty fields
    if (
      registration.trim() === "" ||
      make.trim() === "" ||
      model.trim() === "" ||
      mileage === "" ||
      name.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === ""
    ) {
      setMessage("Please fill in all fields.")
      setIsError(true)
      return
    }

    // Email validation
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email address.")
      setIsError(true)
      return
    }

    // Phone validation
    const phonePattern =
      /^\+?[0-9\s-]{10,15}$/

    if (!phonePattern.test(phone)) {
      setMessage("Please enter a valid phone number.")
      setIsError(true)
      return
    }

    // Mileage validation
    if (Number(mileage) < 0) {
      setMessage("Mileage cannot be negative.")
      setIsError(true)
      return
    }

    // Show submitted data in console for now
    console.log({
      registration,
      make,
      model,
      mileage,
      name,
      email,
      phone
    })

    // Success message
    setMessage(
      "Thank you. We’ve received your vehicle details. Our valuation team will review your submission and contact you shortly with an estimated offer."
    )

    setIsError(false)

    // Clear form after successful submission
    setRegistration("")
    setMake("")
    setModel("")
    setMileage("")
    setName("")
    setEmail("")
    setPhone("")
  }

  return (
    <section className="sell-car-page">
      <h1>Sell Your Car</h1>

      <p>
        Tell us about your vehicle and our valuation team will get back to you
        with an estimated offer.
      </p>

      <form onSubmit={handleSubmit}>
        <h2>Vehicle Details</h2>

        <label>Registration</label>
        <input
          type="text"
          value={registration}
          onChange={(event) =>
            setRegistration(event.target.value)
          }
          placeholder="e.g. AB12 CDE"
        />

        <label>Make</label>
        <input
          type="text"
          value={make}
          onChange={(event) =>
            setMake(event.target.value)
          }
          placeholder="e.g. BMW"
        />

        <label>Model</label>
        <input
          type="text"
          value={model}
          onChange={(event) =>
            setModel(event.target.value)
          }
          placeholder="e.g. 320d"
        />

        <label>Mileage</label>
        <input
          type="number"
          min="0"
          value={mileage}
          onChange={(event) =>
            setMileage(event.target.value)
          }
          placeholder="e.g. 45000"
        />

        <h2>Contact Details</h2>

        <label>Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Enter your full name"
        />

        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="Enter your email address"
        />

        <label>Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(event) =>
            setPhone(event.target.value)
          }
          placeholder="e.g. 07123 456789"
        />

        <button type="submit">
          Submit Valuation Request
        </button>
      </form>

      {message && (
        <p
          className={
            isError
              ? "form-message form-error"
              : "form-message"
          }
        >
          {message}
        </p>
      )}
    </section>
  )
}

export default SellCarPage