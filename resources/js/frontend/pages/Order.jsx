import { section } from "framer-motion/client";
import NavbarOrder from "../components/NavbarOrder";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getClientId } from "../core/token";
import axios from "axios";

export default function Order() {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const [subdomain, setSubdomain] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const clientId = getClientId();
    const { id } = useParams();
    const currentDate = new Date();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);
            const response = await axios.post(
                `${baseURL}/v1/order/order-template`,
                {
                    client_id: clientId,
                    invitation_template_id: id,
                    order_date: currentDate.toISOString().split("T")[0],
                    subdomain: subdomain,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            navigate("/app/client/invitations");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Terjadi kesalahan saat mendaftar."
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <NavbarOrder />
            <section className="flex items-center justify-center min-h-screen bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]">
                <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                    {error && (
                        <p className="text-red-500 mb-4 text-sm text-center">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="subdomain"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Link Undangan
                            </label>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex bg-gray-300 items-center pl-3 rounded-tl-lg rounded-bl-lg">
                                    <span className="text-gray-500 text-sm mr-2">
                                        ulemindulu.my.id/
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    id="subdomain"
                                    name="subdomain"
                                    value={subdomain}
                                    onChange={(e) =>
                                        setSubdomain(e.target.value)
                                    }
                                    placeholder="cth. riski-dan-nisa"
                                    className="block w-full pl-36 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition"
                        >
                            {loading ? "Ordering..." : "Order Now"}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}
