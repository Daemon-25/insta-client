/* eslint-disable import/no-anonymous-default-export */
import { FETCH_USER_DATA, UPDATE_USER, BOOKMARK_POST, LOGOUT } from "../types";

export default (state, action) => {
	const { payload, type } = action;

	switch (type) {
		case FETCH_USER_DATA:
			return {
				...state,
				isAuthenticated: true,
				user: payload,
			};
		case UPDATE_USER:
			return {
				...state,
				user : payload
			};
		case BOOKMARK_POST:
			return {
				...state,
				Bookmarks: payload.Bookmarks,
			};
		case LOGOUT:
			return { isAuthenticated: true };
		default:
			return state;
	}
};
