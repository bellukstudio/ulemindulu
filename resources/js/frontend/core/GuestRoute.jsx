import { Navigate } from "react-router-dom";
import { isTokenAvailable } from "../core/token";

export default function GuestRoute({ children }) {
    if (isTokenAvailable()) {
        return <Navigate to="/" replace />;
    }
    return children;
}
