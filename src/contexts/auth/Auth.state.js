import React, { useReducer } from "react";

import AuthContext from "./Auth.context";
import AuthReducer from "./Auth.reducer";

const AuthState = (props) => {
	let initialState = localStorage.getItem('user') ? {isAuthenticated : true, user : JSON.parse(localStorage.getItem('user'))/* , Followers : localStorage.getItem('user').Followers, Following : localStorage.getItem('user').Following, Bookmarks: localStorage.getItem('user').Bookmarks */} : {};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	return <AuthContext.Provider value={{ state, dispatch }}>{props.children}</AuthContext.Provider>;
};

export default AuthState;
