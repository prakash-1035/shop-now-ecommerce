import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const { isAuthenticated, loading, user } = useSelector(
        (state) => state.auth
    );
    // console.log("calling protected routes");
    return (
        <Fragment>
            {loading === false &&
                (isAuthenticated && user.role === "admin" ? (
                    <Outlet />
                ) : (
                    <Navigate to="/login" />
                ))}
        </Fragment>
    );
};

export default ProtectedRoutes;
