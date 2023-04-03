import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const AlreadyLoggedIn = () => {
    const { user } = useContext(AuthContext);

    if (user) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}