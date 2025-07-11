import FooterSection from "../components/FooterSection";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);
            const response = await axios.post(`${baseURL}/v1/auth/login`, {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.message || "Terjadi kesalahan saat login."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <section className="flex items-center justify-center min-h-screen pt-24' bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]">
                <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                        Login Akun
                    </h2>
                    <p className="text-sm text-gray-500 text-center mb-6">
                        Masukkan credential kamu dengan benar.
                    </p>
                    {error && (
                        <p className="text-red-500 mb-4 text-sm text-center">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="kamu@email.com"
                                className="mt-1 block w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4 relative">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="mt-1 block w-full px-4 py-2 pr-10 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 text-sm text-gray-600"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition"
                        >
                            {loading ? "Melakukan Login..." : "Login Sekarang"}
                        </button>
                    </form>
                    <p className="mt-10">
                        {" "}
                        Belum Punya Akun?{" "}
                        <a href="/register" className="text-blue-600 font-bold">
                            Daftar Sekarang
                        </a>
                    </p>
                </div>
            </section>

            <FooterSection />
        </>
    );
}
