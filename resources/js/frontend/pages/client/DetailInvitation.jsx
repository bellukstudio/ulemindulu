import { useState, useEffect } from "react";
import { Menu, X, Share2, Gift, Album, Settings, Gauge } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { orderApi } from "../../action/order";
import FormSettings from "./FormInvitation/FormSettings";
import FormGift from "./FormInvitation/FormGift";
import FormUploadAlbum from "./FormInvitation/FormUploadAlbum";

/**
 * DetailInvitation is a React component that renders the detail invitation page.
 * It fetches the order and template data using the slug from URL parameters and
 * displays the appropriate template. The component shows a loading indicator while
 * fetching data and handles errors during the fetch operation. If the template type
 * is not recognized, it displays a fallback message.
 *
 * The component consists of a menu with various tabs (settings, share, gift, album)
 * and a main content area that displays the content of the selected tab.
 * The settings tab displays the settings form that allows the user to update the
 * order and template data. The share tab displays a profile page with the user's
 * name and photo. The gift tab displays a form that allows the user to add a new
 * bank account. The album tab displays a grid of uploaded photos.
 *
 * @returns {React.ReactElement} The rendered detail invitation page component.
 */
export default function DetailInvitation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("settings");
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [template, setTemplate] = useState(null);

    const menuItems = [
        { id: "settings", label: "Settings", icon: Settings },
        { id: "share", label: "Share", icon: Share2 },
        {
            id: "gift",
            label: "Gift",
            icon: Gift,
        },
        {
            id: "album",
            label: "Album",
            icon: Album,
        },
    ];

    useEffect(() => {
        // Fetch order by id
        const fetchOrderById = async () => {
            try {
                const result = await orderApi.fetchOrderId(id);
                if (result.success) {
                    setOrder(result.data);
                    setTemplate(result.data.invitation_template);
                } else {
                    navigate("/404");
                }
            } catch (err) {
                console.error(err);
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

        fetchOrderById();
    }, [id, navigate]);

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 max-w-sm mx-auto relative">
            {/* Navbar */}
            <nav className="bg-[#3758F9] shadow-sm border-b border-gray-200 sticky top-0 z-50 ">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between ">
                        {/* Logo */}
                        <div className="flex items-center">
                            <a href="/app/client/invitations">
                                <img
                                    src="/sample/logo.png"
                                    className="h-8"
                                    alt="Logo"
                                />
                            </a>
                        </div>

                        {/* Right side icons */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-1"
                            >
                                {isMenuOpen ? (
                                    <X className="w-5 h-5 text-white" />
                                ) : (
                                    <Menu className="w-5 h-5 text-white" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
                        <div className="py-1">
                            <a
                                href="/app/client/invitations"
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setIsMenuOpen(false);
                                }}
                                className={`w-full flex items-center px-2 py-3 text-left hover:bg-gray-50 transition-colors bg-blue-50 text-blue-600"`}
                            >
                                <Gauge className="w-5 h-5 mr-3" />
                                <span className="font-medium">Dashboard</span>
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="pb-12">
                {activeTab === "settings" && (
                    <FormSettings order={order} template={template} />
                )}
                {activeTab === "share" && (
                    <div className="p-4">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">
                            Profile
                        </h1>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="text-center">
                                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    John Doe
                                </h2>
                                <p className="text-gray-600 text-sm mb-4">
                                    Software Developer
                                </p>
                                <div className="flex justify-center space-x-8 text-center">
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            127
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            Posts
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            1.2K
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            Followers
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            856
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            Following
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "album" && (
                    <FormUploadAlbum activeTab={activeTab} order={order} />
                )}
                {activeTab === "gift" && (
                    <FormGift order={order} template={template} />
                )}
            </main>
            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 shadow-lg">
                <div className="flex">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`flex-1 flex flex-col items-center py-3 transition-colors ${
                                    activeTab === item.id
                                        ? "text-blue-600 bg-blue-50"
                                        : "text-gray-600 hover:text-gray-800"
                                }`}
                            >
                                <Icon className="w-5 h-5 mb-1" />
                                <span className="text-xs font-medium">
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
