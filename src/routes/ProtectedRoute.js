import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthenticationContext from "../contexts/auth/Auth.context";

const useAuth=()=>{
	const user=localStorage.getItem('user')
	if(user){
	  return true
	} else {
	  return false
	}
  }
const ProtectedRoute = (props) => {
	const { state } = useContext(AuthenticationContext);
	const auth=useAuth()
	return (
		auth?<Outlet/>:<Navigate to="/login"/>
		// <Route
		// 	{...restOfProps}
		// 	render={(props) =>
		// 		state.isAuthenticated ? <Component {...props} /> : <Navigate to="/" />
		// 	}
		// />
	);
};

export default ProtectedRoute;
