import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "flowbite";
import ListTemplate from "./templates/ListTemplate";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import GuestRoute from "./core/GuestRoute";
// Template
import HomeBasicWedding from "./templates/basic-wedding/HomeBasicWedding";
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
