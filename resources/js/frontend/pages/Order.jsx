import NavbarOrder from "../components/NavbarOrder";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getClientId } from "../core/token";
import { orderApi } from "../action/order";
import { templateAPI } from "../action/template";
import Loading from "./Loading";
/**
 * A page to order an invitation template.
 *
 * This page allows users to order an invitation template with a given subdomain.
 * The page will render a form with a text input for the subdomain and a submit button.
 * When the form is submitted, the page will call the `orderTemplate` function from the `orderApi`
 * action to create a new order.
 *
 * If the order is successful, the page will navigate to the "/app/client/invitations" page.
 * If the order fails, the page will display an error message.
 *
 * The page will also render a loading state while the order is being processed.
 *
 * The page will also fetch the template data from the `templateAPI` action and display an error
 * message if the template is not found.
 *
 * @returns {ReactElement} The order page component.
 */
export default function Order() {
    const navigate = useNavigate();
    const { id } = useParams();
    const clientId = getClientId();
    const currentDate = new Date();

    const [subdomain, setSubdomain] = useState("");
    const [template, setTemplate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchTemplateById = async () => {
            try {
                const res = await templateAPI.fetchTemplateByid(id);

                if (res.success) {
                    setTemplate(res.data);
                } else {
                    console.error("Template tidak ditemukan:", res.error);
                    navigate("/404");
                }
            } catch (error) {
                console.error("Template tidak ditemukan:", error);
                navigate("/error", {
                    state: {
                        error:
                            err.response?.data?.errors ||
                            err.response?.data?.message ||
                            "Terjadi kesalahan.",
                    },
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTemplateById();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);

            const orderData = {
                client_id: clientId,
                invitation_template_id: template.id,
                order_date: currentDate.toISOString().split("T")[0],
                subdomain: subdomain,
            };

            const result = await orderApi.orderTemplate(orderData);

            if (result.success) {
                navigate("/app/client/invitations");
            } else {
                setErrors(result.errors || {});
            }
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.errors ||
                    err.response?.data?.message ||
                    "Terjadi kesalahan."
            );
            navigate("/error", {
                state: {
                    error:
                        err.response?.data?.errors ||
                        err.response?.data?.message ||
                        "Terjadi kesalahan.",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

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
                    {errors.subdomain && (
                        <p className="text-red-500 text-sm mt-1 text-center">
                            {errors.subdomain[0]}
                        </p>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="subdomain"
                                className="block text-sm font-medium text-gray-700 mb-2"
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
                                    placeholder="cth. wedding-riski-dan-nisa"
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
