import FooterSection from "../components/FooterSection";
import Navbar from "../components/Navbar";
export default function LoginPage() {
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

                    <form>
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

                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition"
                        >
                            Login Sekarang
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
