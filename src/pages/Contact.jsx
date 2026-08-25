import { useState } from "react"
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

  // Reads query parameters from the current URL
  const [searchParams] = useSearchParams()

  // Gets the selected car from the URL
  // Example URL: /contact?car=BMW-320d
  const selectedCar = searchParams.get("car")

  // Converts "BMW-320d" into "BMW 320d" for display
  const displayCar = selectedCar?.replace("-", " ")

  // Handles form submission
  const handleSubmit = (event) => {
    event.preventDefault()

    // Temporary output until the backend is connected
    console.log(
      name,
      email,
      phone,
      displayCar,
      message
    )

    // Show the success message
    setSubmitted(true)

    // Clear the form fields after submission
    setName("")
    setEmail("")
    setPhone("")
    setMessage("")
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
      {displayCar && (
        <p className="selected-vehicle">
          Interested Vehicle: {displayCar}
        </p>
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

        <button type="submit">
          Submit Enquiry
        </button>

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