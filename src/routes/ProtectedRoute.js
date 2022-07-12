import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthenticationContext from "../contexts/auth/Auth.context";

const ProtectedRoute = (props) => {
	const { state } = useContext(AuthenticationContext);

	return (
		state.isAuthenticated?<Outlet/>:<Navigate to="/login"/>
	);
};

export default ProtectedRoute;
