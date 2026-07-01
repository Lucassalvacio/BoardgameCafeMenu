import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../api/firebase";


export default function StaffLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            navigate("/staff/dashboard");

        } catch (err: any) {

            switch (err.code) {

                case "auth/invalid-credential":
                    setError("Incorrect email or password.");
                    break;

                case "auth/too-many-requests":
                    setError("Too many failed attempts. Please wait.");
                    break;

                default:
                    setError("Login failed.");
            }

        } finally {

            setLoading(false);

        }
    }

    return (

        <main className="staff-login-page">

            <form
                className="staff-login-card"
                onSubmit={handleLogin}
            >

                <h1>Meeple & Mug</h1>

                <h2>Staff Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <p className="error-text">
                        {error}
                    </p>
                )}

                <button
                    disabled={loading}
                >
                    {loading
                        ? "Signing In..."
                        : "Login"}
                </button>

            </form>

        </main>

    );

}