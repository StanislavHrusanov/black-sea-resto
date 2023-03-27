import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import * as authService from "../../services/authService";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const Logout = () => {
    const { userLogout } = useContext(AuthContext);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                showLoading();
                await authService.logout();
                userLogout();
                localStorage.removeItem('user');
                hideLoading();
                navigate('/');

            } catch (error) {
                window.alert(error.message);

                if (
                    error.message === 'Invalid access token' ||
                    error.message === 'User session does not exist') {
                    userLogout();
                    localStorage.removeItem('user');
                }
                hideLoading();
                navigate('/');
            }
        })();
    }, [showLoading, hideLoading, userLogout, navigate]);

    return isLoading && <LoadingSpinner />

}