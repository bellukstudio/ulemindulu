import FooterSection from "../components/FooterSection";
import Navbar from "../components/Navbar";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RegisterPage() {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const initialEmail = searchParams.get("email");
        if (initialEmail) {
            setEmail(initialEmail);
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== repeatPassword) {
            setError("Password tidak cocok.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${baseURL}/v1/auth/register`, {
                clientName,
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Terjadi kesalahan saat mendaftar.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <section className="flex items-center justify-center min-h-screen pt-24 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]">
                <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Daftar Akun Baru</h2>
                    <p className="text-sm text-gray-500 text-center mb-6">Masukkan data kamu dengan benar untuk membuat akun.</p>

                    {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Kamu</label>
                            <input
                                type="text"
                                id="name"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                placeholder="Contoh: Jhon"
                                className="mt-1 block w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="kamu@email.com"
                                className="mt-1 block w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>

                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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

                        <div className="mb-6 relative">
                            <label htmlFor="repeat-password" className="block text-sm font-medium text-gray-700">Ulangi Password</label>
                            <input
                                type={showRepeatPassword ? "text" : "password"}
                                id="repeat-password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                placeholder="••••••••"
                                className="mt-1 block w-full px-4 py-2 pr-10 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                className="absolute right-3 top-9 text-sm text-gray-600"
                            >
                                {showRepeatPassword ? "🙈" : "👁️"}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition"
                            disabled={loading}
                        >
                            {loading ? "Mendaftar..." : "Daftar Sekarang"}
                        </button>
                    </form>

                    <p className="mt-10 text-sm text-center">
                        Sudah Punya Akun? <a href="/login" className="text-blue-600 font-bold">Login Sekarang</a>
                    </p>
                </div>
            </section>
            <FooterSection />
        </>
    );
}
