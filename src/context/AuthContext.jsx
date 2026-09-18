import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [admin, setAdmin] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function checkAuthentication() {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/auth/me",
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
            "http://localhost:5000/api/auth/login",
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
        await fetch(
            "http://localhost:5000/api/auth/logout",
            {
                method: "POST",
                credentials: "include"
            }
        )

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

export function useAuth() {
    return useContext(AuthContext)
}