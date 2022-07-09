import React, { useEffect, useContext } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import AuthContext from "../contexts/auth/Auth.context";
import ProtectedRoute from "./ProtectedRoute";

// different routes
import Home from "../screens/Home";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import CreatePost from "../screens/CreatePost.js";
import Profile from "../screens/Profile";
import UserProfile from "../screens/UserProfile";
import SubscribePosts from "../screens/SubscribePosts";
import Reset from "../screens/ResetPassword.js";
import NewPass from "../screens/NewPassword.js";

const Routing = () => {
	const { state } = useContext(AuthContext);

	// check if we are already authenticated
	useEffect(() => {
		state.isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />;
	});

	return (
		<BrowserRouter>
			<Routes>
				{/* Public routes */}
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/signup" element={<Signup />} />
				<Route exact path="/reset" element={<Reset />} />
				<Route exact path="/reset/:token" element={<NewPass />} />
				<Route path="/" element={<ProtectedRoute />}>
					<Route exact path="/" element={<SubscribePosts />} />
					<Route exact path="/explore" element={<Home />} />
					<Route exact path="/create" element={<CreatePost />} />
					<Route exact path="/profile" element={<Profile />} />
					<Route exact path="/profile/:userid" element={<UserProfile />} />
				</Route>

				{/* Separate the protected routes from public ones */}


				{/* in case we want to handle the 404 page not found */}
				{/* <Route component={NotFound} /> */}
			</Routes>
		</BrowserRouter>
	);
};

export default Routing;