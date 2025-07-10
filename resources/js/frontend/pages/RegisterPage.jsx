import FooterSection from "../components/FooterSection";
import Navbar from "../components/Navbar";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RegisterPage() {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState("");

    useEffect(() => {
        const initialEmail = searchParams.get("email");
        if (initialEmail) {
            setEmail(initialEmail);
        }
    }, [searchParams]);

    return (
        <>
            <Navbar />
            <section className="flex items-center justify-center min-h-screen pt-24' bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]">
                <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                        Daftar Akun Baru
                    </h2>
                    <p className="text-sm text-gray-500 text-center mb-6">
                        Masukkan data kamu dengan benar untuk membuat akun.
                    </p>

                    <form>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Nama Kamu
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Contoh: Jhon"
                                className="mt-1 block w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

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

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                className="mt-1 block w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="repeat-password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Ulangi Password
                            </label>
                            <input
                                type="password"
                                id="repeat-password"
                                placeholder="••••••••"
                                className="mt-1 block w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition"
                        >
                            Daftar Sekarang
                        </button>
                    </form>
                    <p className="mt-10">
                        {" "}
                        Sudah Punya Akun? <a href="/login" className="text-blue-600 font-bold">Login Sekarang</a>
                    </p>
                </div>
            </section>

            <FooterSection />
        </>
    );
}
