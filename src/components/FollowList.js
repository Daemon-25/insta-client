import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
 import Divider from "@material-ui/core/Divider";
 import ListItemAvatar from "@material-ui/core/ListItemAvatar";
 import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import { config } from "../config/constants";
import AuthenticationContext from "../contexts/auth/Auth.context";

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;
	return (
		<div
			style={{ width: 430 }}
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
};

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: "flex",
		height: "100%",
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
	fieldContainer: { display: "flex", marginBottom: "10px" },
	fieldContainerUnderInfo: { display: "flex", marginBottom: "10px", marginTop: "10px" },
	fieldLabel: { margin: "auto 0px", marginRight: "10px", width: "25%", fontWeight: "bold" },
	fieldInput: { "& .MuiOutlinedInput-input": { padding: "10px 14px" } },
	textInfo: { color: "rgba(var(--f52,142,142,142),1)", marginBottom: "10px" },
	links: {
		textDecoration: "none",
		color : "black",
		fontSize: "1.2rem"
	},
}));

export default function FollowList() {
	const classes = useStyles();

	const { state } = useContext(AuthenticationContext)
	return (
		<div className={classes.root}>
			{state.user.Followers.map((e) => {
				return (
					<>
						<Link
							className={classes.links}
							key={e.FollowerId}
							to={`/profile/${e.FollowerId}`}
						//  onClick={handleCloseModal}
						>{e.FollowerName}</Link>
						<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<Avatar
								alt="Remy Sharp"
								src="/static/images/avatar/1.jpg"
							/>
						</ListItemAvatar>
						
					</ListItem><br/>
					</>
				)
			})}

		</div>
	);
}
