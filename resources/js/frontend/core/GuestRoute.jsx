import { Navigate } from "react-router-dom";
import { isTokenAvailable } from "../core/token";

/**
 * GuestRoute component.
 *
 * A React component that will redirect to homepage if user already logged in.
 *
 * @param {React.ReactElement} children - The component to render if user isn't logged in.
 * @returns {React.ReactElement} The rendered component.
 * @example
 * import GuestRoute from "./GuestRoute";
 *
 * <GuestRoute>
 *     <Login />
 * </GuestRoute>
 */
export default function GuestRoute({ children }) {
    if (isTokenAvailable()) {
        return <Navigate to="/" replace />;
    }
    return children;
}
