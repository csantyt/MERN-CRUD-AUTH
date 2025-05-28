import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Authcontext";


function ProtectedRoute() {
    const { loading, isAuthenticated, user } = useAuth ();
    console.log(loading, user, isAuthenticated)

    if (loading) return <h1>Loading...</h1>;
    if (!loading &&!isAuthenticated) return <Navigate to="/login" replace />;

    return <Outlet />;
    }

    export default ProtectedRoute;