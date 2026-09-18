import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"
import "./AdminLogin.css"

function AdminLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] =
        useState("")
    const [isSubmitting, setIsSubmitting] =
        useState(false)

    const { admin, login } = useAuth()
    const navigate = useNavigate()

    if (admin) {
        return (
            <Navigate
                to="/admin"
                replace
            />
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrorMessage("")
        setIsSubmitting(true)

        try {
            await login(email, password)
            navigate("/admin", {
                replace: true
            })
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="admin-login-page">
            <section className="admin-login-card">
                <div className="admin-login-logo">
                    M
                </div>

                <p className="admin-login-label">
                    Mavi Automotive
                </p>

                <h1>Admin Login</h1>

                <p className="admin-login-subtitle">
                    Sign in to manage vehicle inventory.
                </p>

                <form onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            autoComplete="email"
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            autoComplete="current-password"
                            required
                        />
                    </label>

                    {errorMessage && (
                        <p className="admin-login-error">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Signing in..."
                            : "Sign In"}
                    </button>
                </form>
            </section>
        </main>
    )
}

export default AdminLogin