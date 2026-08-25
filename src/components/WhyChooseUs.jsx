import "./WhyChooseUs.css"

function WhyChooseUs() {
  return (
    <section className="why-choose-us">
      <div className="container why-choose-container">

        <h2>Why Choose Us?</h2>

        <div className="why-cards">

          <div className="why-card">
            <div className="why-icon">✓</div>
            <h3>Quality Assured</h3>
            <p>
              Every car is carefully inspected for quality.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">£</div>
            <h3>Finance Available</h3>
            <p>
              Flexible finance options to suit your budget.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">↔</div>
            <h3>Part Exchange</h3>
            <p>
              Get a great value for your current car.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">☎</div>
            <h3>Expert Support</h3>
            <p>
              Our team is here to help every step of the way.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs