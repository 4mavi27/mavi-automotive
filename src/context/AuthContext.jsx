import {
    useEffect,
    useState
} from "react"

import AuthContext from "./auth-context.js"

function AuthProvider({ children }) {
    const [admin, setAdmin] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function checkAuthentication() {
            try {
                const response = await fetch(
                    "/api/auth/me",
                    {
                        credentials: "include"
                    }
                )

                if (!response.ok) {
                    setAdmin(null)
                    return
                }

                const data = await response.json()
                setAdmin(data.admin)
            } catch (error) {
                console.error(
                    "Authentication check failed:",
                    error
                )

                setAdmin(null)
            } finally {
                setLoading(false)
            }
        }

        checkAuthentication()
    }, [])

    async function login(email, password) {
        const response = await fetch(
            "/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password
                })
            }
        )

        const data = await response.json()

        if (!response.ok) {
            throw new Error(
                data.message || "Login failed"
            )
        }

        setAdmin(data.admin)
    }

    async function logout() {
        const response = await fetch(
            "/api/auth/logout",
            {
                method: "POST",
                credentials: "include"
            }
        )

        if (!response.ok) {
            throw new Error("Logout failed")
        }

        setAdmin(null)
    }

    return (
        <AuthContext.Provider
            value={{
                admin,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider