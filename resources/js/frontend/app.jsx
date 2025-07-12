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
const App = () => {
    return (
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

                {/* Template */}

                {/* Basic Template */}
                <Route
                    path="/template/basic-wedding"
                    element={<HomeBasicWedding />}
                />
            </Routes>
        </Router>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
