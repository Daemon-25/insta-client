import React, { useReducer } from "react";

import AuthContext from "./Auth.context";
import AuthReducer from "./Auth.reducer";

const AuthState = (props) => {
	let initialState = localStorage.getItem('user') ? {isAuthenticated : true, user : JSON.parse(localStorage.getItem('user'))/* , Followers : JSON.parse(localStorage.getItem('user')).Followers, Following : JSON.parse(localStorage.getItem('user')).Following, Bookmarks: JSON.parse(localStorage.getItem('user')).Bookmarks */} : {};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	return <AuthContext.Provider value={{ state, dispatch }}>{props.children}</AuthContext.Provider>;
};

export default AuthState;
