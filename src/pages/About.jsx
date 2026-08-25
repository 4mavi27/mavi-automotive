import "./About.css"
function About() {
  return (
    <section className="about-page">
      <div className="about-header">
        <h1>About Mavi Automotive</h1>

        <p>
          We make buying and selling quality used cars simple,
          transparent and straightforward.
        </p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>

          <p>
            Mavi Automotive is a customer-focused used car dealership
            offering carefully selected vehicles at competitive prices.
          </p>

          <p>
            Our goal is to provide a straightforward buying experience
            with clear vehicle information, flexible finance options and
            reliable customer support.
          </p>
        </div>

        <div className="about-values">
          <div className="about-card">
            <h3>Quality Vehicles</h3>
            <p>
              Every vehicle is selected with quality and reliability
              in mind.
            </p>
          </div>

          <div className="about-card">
            <h3>Transparent Service</h3>
            <p>
              Clear information and straightforward communication
              throughout your purchase.
            </p>
          </div>

          <div className="about-card">
            <h3>Customer Focused</h3>
            <p>
              We aim to make buying or selling your vehicle as simple
              as possible.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About