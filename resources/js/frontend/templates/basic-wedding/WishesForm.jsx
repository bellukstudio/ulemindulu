import { useState, useEffect } from "react";
import { wishesAPI } from "../../action/wishes";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
WishesForm.propTypes = {
    isPreview: PropTypes.bool,
};
/**
 * WishesForm is a React component that renders a form for submitting
 * wishes and messages to a wedding invitation page. It manages the form
 * state, handles form submission, and displays a list of submitted messages
 * with pagination.
 *
 * @param {Object} props
 * @param {boolean} props.isPreview - Indicates whether the form is in
 *                                    preview mode. When true, the form does
 *                                    not fetch or submit data.
 *
 * @returns {React.ReactElement} - The rendered WishesForm component.
 */

export default function WishesForm({ isPreview }) {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        present: "",
        saying: "",
    });
    const [messages, setMessages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const messagesPerPage = 5;

    const fetchMessages = async () => {
        try {
            const res = await wishesAPI.getAllWishes(slug);
            if (res.success) {
                setMessages(res.data);
            } else {
                console.error("Failed to fetch messages:", res.status);
                setMessages([]);
            }
        } catch (err) {
            console.error("Error fetching messages:", err);
            setMessages([]);
            navigate("/error", {
                state: {
                    error:
                        err.response?.data?.errors ||
                        err.response?.data?.message ||
                        "Terjadi kesalahan.",
                },
            });
        }
    };

    useEffect(() => {
        if (isPreview) return;

        fetchMessages();

        const interval = setInterval(() => {
            fetchMessages();
        }, 3000);

        return () => clearInterval(interval);
    }, [isPreview]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isPreview) return;

        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const res = await wishesAPI.postWishes(formData, slug);

            if (res.success) {
                setFormData({ name: "", present: "", saying: "" });
                setCurrentPage(1);
                await fetchMessages();
            } else {
                console.error("Failed to submit:", res.status);
                toast.warn("Gagal mengirim ucapan. Silakan coba lagi.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalPages = Math.ceil(messages.length / messagesPerPage);
    const startIndex = (currentPage - 1) * messagesPerPage;
    const endIndex = startIndex + messagesPerPage;
    const currentMessages = messages.slice(startIndex, endIndex);

    const goToPage = (page) => setCurrentPage(page);
    const goToPrevious = () =>
        currentPage > 1 && setCurrentPage(currentPage - 1);
    const goToNext = () =>
        currentPage < totalPages && setCurrentPage(currentPage + 1);

    return (
        <div
            className="w-full min-h-screen relative bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://res.cloudinary.com/ducsvvqsy/image/upload/v1752224580/template/asset/bg2_ljf3k9.png')",
            }}
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 px-6 py-16 text-center text-white">
                <h2 className="text-4xl font-semibold mb-10 text-white mt-10">
                    Tulis Ucapan & Doa
                </h2>

                {/* Form */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            required
                            placeholder="name Anda"
                            className="w-full border p-2 rounded font-mono bg-white text-gray-800"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            disabled={isSubmitting}
                        />
                        <select
                            required
                            className="w-full border p-2 rounded font-mono bg-white text-gray-800"
                            value={formData.present}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    present: e.target.value,
                                })
                            }
                            disabled={isSubmitting}
                        >
                            <option value="">present</option>
                            <option value="Hadir ✅">Hadir</option>
                            <option value="Tidak Hadir ❌">Tidak Hadir</option>
                        </select>
                        <textarea
                            required
                            placeholder="Ucapan Doa"
                            className="w-full border p-2 rounded bg-white font-mono text-gray-800"
                            rows={4}
                            value={formData.saying}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    saying: e.target.value,
                                })
                            }
                            disabled={isSubmitting}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 font-mono rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Mengirim..." : "Kirim"}
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="space-y-4 mt-10">
                    {messages.length > 0 ? (
                        <>
                            {/* Messages */}
                            {currentMessages.map((msg, index) => (
                                <div
                                    key={startIndex + index}
                                    className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-lg text-gray-800 font-mono">
                                            {msg.name}
                                        </h3>
                                        <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                                            {msg.present}
                                        </span>
                                    </div>
                                    <hr className="border-gray-200 mb-4" />
                                    <p className="text-gray-700 leading-relaxed font-mono text-sm bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400">
                                        {msg.saying}
                                    </p>
                                </div>
                            ))}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center space-x-2 mt-8">
                                    <button
                                        onClick={goToPrevious}
                                        disabled={currentPage === 1}
                                        className="px-3 py-2 text-sm font-mono rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        ← Sebelumnya
                                    </button>

                                    <div className="flex space-x-1">
                                        {Array.from(
                                            { length: totalPages },
                                            (_, i) => i + 1
                                        ).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => goToPage(page)}
                                                className={`px-3 py-2 text-sm font-mono rounded-lg transition-colors ${
                                                    currentPage === page
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={goToNext}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-2 text-sm font-mono rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Selanjutnya →
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white shadow-lg rounded-xl p-8 text-center border border-gray-100">
                            <div className="text-gray-400 text-6xl mb-4">
                                💌
                            </div>
                            <p className="text-gray-500 font-mono">
                                Belum ada ucapan
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
