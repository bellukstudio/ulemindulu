import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListTemplate from "./templates/ListTemplate";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import GuestRoute from "./core/GuestRoute";
import PrivateRoute from "./core/PrivateRoute";
// Template
import HomeBasicWedding from "./templates/basic-wedding/HomeBasicWedding";
import Order from "./pages/Order";
import DashboardClient from "./pages/client/DashboardClient";
import InvitationClient from "./pages/client/Invitation";
import DetailInvitation from "./pages/client/DetailInvitation";
import NotFound from "./pages/NotFound";
import InvitationPage from "./pages/InvitationPage";
import ErrorPage from "./pages/ErrorPage";
import dummyTemplateWedding, { dummyGift } from "./core/data/weddingDummny";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Invoices from "./pages/client/Invoices";
import InvoiceDownloader from "./pages/client/components/DownloadInvoice";
const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/templates" element={<ListTemplate />} />
                    <Route
                        path="/register"
                        element={
                            <GuestRoute>
                                <RegisterPage />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <GuestRoute>
                                <LoginPage />
                            </GuestRoute>
                        }
                    />

                    <Route
                        path="/template-order/:id"
                        element={
                            <PrivateRoute>
                                <Order />
                            </PrivateRoute>
                        }
                    />

                    {/* App client */}
                    <Route
                        path="/app/client"
                        element={
                            <PrivateRoute>
                                <DashboardClient />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/app/client/invitations"
                        element={
                            <PrivateRoute>
                                <InvitationClient />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/app/client/invoices"
                        element={
                            <PrivateRoute>
                                <Invoices />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/app/client/invitations/edit/:id"
                        element={
                            <PrivateRoute>
                                <DetailInvitation />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/app/client/invoices/download/:id"
                        element={
                            <PrivateRoute>
                                <InvoiceDownloader />
                            </PrivateRoute>
                        }
                    />

                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="/:slug" element={<InvitationPage />} />
                    {/* Template */}

                    {/* Basic Template */}
                    <Route
                        path="/template/basic-wedding/preview"
                        element={
                            <HomeBasicWedding
                                isPreview={true}
                                data={dummyTemplateWedding}
                                gift={dummyGift}
                            />
                        }
                    />
                </Routes>
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />
        </>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
