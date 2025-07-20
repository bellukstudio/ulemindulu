import { Navigate } from "react-router-dom";
import { isTokenAvailable } from "./token";

/**
 * PrivateRoute component.
 *
 * A React component that will redirect to login page if user isn't logged in.
 *
 * @param {React.ReactElement} children - The component to render if user is logged in.
 * @returns {React.ReactElement} The rendered component.
 * @example
 * import PrivateRoute from "./PrivateRoute";
 *
 * <PrivateRoute>
 *     <Dashboard />
 * </PrivateRoute>
 */
export default function PrivateRoute({ children }) {
    return isTokenAvailable() ? children : <Navigate to="/login" replace />;
}
