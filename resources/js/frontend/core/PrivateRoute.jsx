import { Navigate } from "react-router-dom";
import { isTokenAvailable } from "./token";

export default function PrivateRoute({ children }) {
    return isTokenAvailable() ? children : <Navigate to="/login" replace />;
}
