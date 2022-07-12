import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthenticationContext from "../contexts/auth/Auth.context";

const ProtectedRoute = (props) => {
	const { state } = useContext(AuthenticationContext);

	return (
		state.isAuthenticated?<Outlet/>:<Navigate to="/login"/>
		// <Route
		// 	{...restOfProps}
		// 	render={(props) =>
		// 		state.isAuthenticated ? <Component {...props} /> : <Navigate to="/" />
		// 	}
		// />
	);
};

export default ProtectedRoute;
