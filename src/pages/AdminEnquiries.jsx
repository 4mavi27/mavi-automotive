import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./AdminEnquiries.css"

function AdminEnquiries() {
    const [enquiries, setEnquiries] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [updatingId, setUpdatingId] = useState(null)

    useEffect(() => {
        const loadEnquiries = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/enquiries",
                    {
                        credentials: "include"
                    }
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to load enquiries"
                    )
                }

                setEnquiries(data)
            } catch (error) {
                console.error(
                    "Load enquiries error:",
                    error
                )

                setErrorMessage(error.message)
            } finally {
                setLoading(false)
            }
        }

        loadEnquiries()
    }, [])

    const handleStatusChange = async (
        enquiryId,
        status
    ) => {
        try {
            setUpdatingId(enquiryId)
            setErrorMessage("")

            const response = await fetch(
                `http://localhost:5000/api/enquiries/${enquiryId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ status })
                }
            )

            const updatedEnquiry =
                await response.json()

            if (!response.ok) {
                throw new Error(
                    updatedEnquiry.message ||
                    "Failed to update status"
                )
            }

            setEnquiries((currentEnquiries) =>
                currentEnquiries.map((enquiry) =>
                    enquiry._id === enquiryId
                        ? updatedEnquiry
                        : enquiry
                )
            )
        } catch (error) {
            console.error(
                "Update enquiry error:",
                error
            )

            setErrorMessage(error.message)
        } finally {
            setUpdatingId(null)
        }
    }

    if (loading) {
        return (
            <section className="admin-enquiries-page">
                <p className="admin-enquiries-loading">
                    Loading enquiries...
                </p>
            </section>
        )
    }

    return (
        <section className="admin-enquiries-page">
            <div className="admin-enquiries-container">

                <header className="admin-enquiries-header">
                    <div>
                        <p className="admin-enquiries-label">
                            Admin Panel
                        </p>

                        <h1>Customer Enquiries</h1>

                        <p className="admin-enquiries-subtitle">
                            Review and manage customer messages.
                        </p>
                    </div>

                    <Link
                        to="/admin"
                        className="enquiries-dashboard-link"
                    >
                        ← Back to Dashboard
                    </Link>
                </header>

                {errorMessage && (
                    <p className="admin-enquiries-error">
                        {errorMessage}
                    </p>
                )}

                {enquiries.length === 0 ? (
                    <div className="no-enquiries-card">
                        <h2>No enquiries yet</h2>
                        <p>
                            New customer enquiries will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="enquiries-grid">
                        {enquiries.map((enquiry) => (
                            <article
                                key={enquiry._id}
                                className="enquiry-card"
                            >
                                <div className="enquiry-card-top">
                                    <span className="enquiry-type">
                                        {enquiry.type.replace("-", " ")}
                                    </span>

                                    <span
                                        className={`enquiry-status ${enquiry.status}`}
                                    >
                                        {enquiry.status}
                                    </span>
                                </div>

                                <h2>{enquiry.name}</h2>

                                <a href={`mailto:${enquiry.email}`}>
                                    {enquiry.email}
                                </a>

                                {enquiry.phone && (
                                    <a href={`tel:${enquiry.phone}`}>
                                        {enquiry.phone}
                                    </a>
                                )}

                                <p className="enquiry-message">
                                    {enquiry.message}
                                </p>
                                {enquiry.vehicle?.make && (
                                    <div className="enquiry-vehicle">
                                        {enquiry.vehicle.image && (
                                            <img
                                                src={enquiry.vehicle.image}
                                                alt={`${enquiry.vehicle.make} ${enquiry.vehicle.model}`}
                                            />
                                        )}

                                        <div className="enquiry-vehicle-info">
                                            <span>ENQUIRED VEHICLE</span>

                                            <h3>
                                                {enquiry.vehicle.make}{" "}
                                                {enquiry.vehicle.model}
                                            </h3>

                                            <p>
                                                £{enquiry.vehicle.price?.toLocaleString()}
                                            </p>

                                            <div className="enquiry-vehicle-specs">
                                                <span>{enquiry.vehicle.year}</span>

                                                <span>
                                                    {enquiry.vehicle.mileage?.toLocaleString()} miles
                                                </span>

                                                <span>{enquiry.vehicle.fuel}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <p className="enquiry-date">
                                    {new Date(
                                        enquiry.createdAt
                                    ).toLocaleString("en-GB")}
                                </p>

                                <label>
                                    Status
                                    <select
                                        value={enquiry.status}
                                        disabled={
                                            updatingId ===
                                            enquiry._id
                                        }
                                        onChange={(event) =>
                                            handleStatusChange(
                                                enquiry._id,
                                                event.target.value
                                            )
                                        }
                                    >
                                        <option value="new">
                                            New
                                        </option>

                                        <option value="contacted">
                                            Contacted
                                        </option>

                                        <option value="closed">
                                            Closed
                                        </option>
                                    </select>
                                </label>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default AdminEnquiries