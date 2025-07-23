import { Link, useLocation, useNavigate } from "react-router-dom";

/**
 * Halaman Error - Oops terjadi kesalahan.
 *
 * Komponen ini akan di render jika terjadi kesalahan pada aplikasi.
 * Menerima data error melalui state dari navigation.
 *
 * @returns {React.ReactElement} Element JSX yang akan di render.
 */
export default function ErrorPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const errorMessage =
        location.state?.error || "Terjadi kesalahan yang tidak diketahui.";
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center max-w-md mx-auto px-4">
                {/* Icon Error */}
                <div className="mb-6">
                    <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Judul Error */}
                <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>

                {/* Pesan Error */}
                <p className="text-xl text-gray-700 mb-2">Terjadi Kesalahan</p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-gray-800 text-sm">{errorMessage}</p>
                </div>

                <p className="text-gray-600 mb-8">
                    Maaf, sepertinya ada sesuatu yang tidak beres. Silakan coba
                    lagi atau kembali ke halaman utama.
                </p>

                {/* Tombol Aksi */}
                <div className="space-y-4">
                    <button
                        onClick={handleGoBack}
                        className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                    >
                        Coba Lagi
                    </button>

                    <Link
                        to="/"
                        className="inline-block w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>

                {/* Informasi Tambahan */}
                <p className="text-sm text-gray-500 mt-6">
                    Jika masalah ini terus berlanjut, silakan hubungi tim
                    dukungan.
                </p>
            </div>
        </div>
    );
}
