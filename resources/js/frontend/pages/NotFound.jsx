import { Link } from "react-router-dom";

/**
 * Halaman 404 Not Found.
 *
 * Komponen ini akan di render jika user mengakses route yang tidak ada.
 *
 * @returns {React.ReactElement} Element JSX yang akan di render.
 */
export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-blue-600">404</h1>
                <p className="text-xl text-gray-600 mt-4">
                    Halaman tidak ditemukan.
                </p>
                <Link
                    to="/"
                    className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}
