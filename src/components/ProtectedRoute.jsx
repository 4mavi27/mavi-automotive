import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

function ProtectedRoute({ children }) {
    const { admin, loading } = useAuth()

    if (loading) {
        return (
            <p className="admin-auth-loading">
                Checking admin session...
            </p>
        )
    }

    if (!admin) {
        return (
            <Navigate
                to="/admin/login"
                replace
            />
        )
    }

    return children
}

export default ProtectedRoute