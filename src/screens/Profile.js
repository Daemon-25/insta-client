/**
 *
 * @author Anass Ferrak aka " TheLordA " <ferrak.anass@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Clone
 *
 */
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthenticationContext from "../contexts/auth/Auth.context";
import VerticalTabs from "../components/VerticalTabs.js";
import Navbar from "../components/Navbar";
import { config as axiosConfig, MY_POST_URL, MY_BOOKMARKS_URL } from "../config/constants";

// Material-UI Components
import { makeStyles, withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

// Material-UI Icons
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import FollowList from "../components/FollowList";
import FollowingList from "../components/FollowingList";

// General styles
const useStyles = makeStyles((theme) => ({
	root: {
		marginTop:"-4vh",
		maxWidth: 935,
		margin: "auto",
		padding: "60px 20px 0",
	},
	dialogContainer: {
		"& .MuiDialog-paperWidthSm": {
			width: "80%",
			maxWidth: "900px",
		},
	},
	dialogTitle: {
		margin: "0px",
		padding: "16px",
	},
	avatar_container: { margin: "auto",
	// marginLeft:"1vw",
	display: "inline-block",
	 },
	 data_container:{
		display: "inline-block",
	 },
	avatar: { width: 152, height: 152 },
	editButton: {
		marginLeft: 20,
		padding: "5px 9px",
    	textAlign: "center",
		// paddingleft:0,
		fontSize:14,
		fontWeight:600,
		borderRadius:4,
		height:25,
		width:122,
	},
	settings: {
		cursor:"pointer",
		marginLeft:15,
		marginTop:".5vh",
	},
	posts: {
		width: "100%",
		height: "100%",
	},
	posts_img: {
		width:"inherit",
		// minWidth:"200px",
		// width: "250px",
		// height: "35vh",
		margin:"auto",
		marginTop: "1vh",
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
	},
	closeButton: {
		position: "absolute",
		right: "8px",
		top: "8px",
		color: "#9e9e9e",
	},
	second: {
		marginTop:"2vh",
		marginBottom: "3vh",
	},
	FollowButton:{
		border: "none",
		background: "none",
		padding: 0,
		cursor:"pointer",
	},
	FollowingButton:{
		border: "none",
		background: "none",
		padding: 0,
		cursor:"pointer",
	},
	third:{
		marginTop: 70,
	},
	posts_css:{
		display: "flex",
		flexWrap: "wrap",
		justifyContent:"center",
		alignItems:"center",
	}
}));

// EditProfile dialog content style
const DialogContent = withStyles((theme) => ({
	root: {
		padding: "16px",
	},
}))(MuiDialogContent);

// EditProfile dialog actions style
const DialogActions = withStyles((theme) => ({
	root: {
		margin: "0px",
		padding: "2px",
	},
}))(MuiDialogActions);

// Tabs data container
const TabPanel = (props) => {
	const { children, value, index, ...other } = props;
	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
};


const ProfilePage = () => {
	const classes = useStyles();
	const { state } = useContext(AuthenticationContext);
	const [data, setData] = useState([]);
	const [bookmarks, setBookmarks] = useState([]);
	const [value, setValue] = useState("Posts");

	const config = axiosConfig(localStorage.getItem("jwt"));
	// const {state} =useContext(AuthenticationContext);

	useEffect(() => {
		axios.get(MY_POST_URL, config).then((res) => {
			setData(res.data.posts);
		});
		axios.get(MY_BOOKMARKS_URL, config).then((res) => {
			setBookmarks(res.data.bookmark);
		});
	}, []);

	//Toggle the EditProfile Button to show the Dialog
	const [openEdit, setOpenEdit] = useState(false);

	const handleEditClickOpen = () => {
		setOpenEdit(true);
	};
	const handleEditClose = () => {
		setOpenEdit(false);
	};
	//Toggle the followers button to show the list
	const [openFollow, setOpenFollow] = useState(false);

	const handleFollowClickOpen = () => {
		setOpenFollow(true);
	};
	const handleFollowClose = () => {
		setOpenFollow(false);
	};
//Toggle the following button to show the list
const [openFollowing, setOpenFollowing] = useState(false);

const handleFollowingClickOpen = () => {
	setOpenFollowing(true);
};
const handleFollowingClose = () => {
	setOpenFollowing(false);
};
	return (
		<>
			<Navbar />
			<CssBaseline />
			<Box component="main" className={classes.root}>
				{/* User Profile Data Goes Here */}
				<Box mb="44px" className="main-box">
					<Grid container>
						<Grid item xs={4} className={classes.avatar_container}>
							<Avatar
								className={classes.avatar}
								style={{ margin: "auto" }}
								src="https://scontent.fdel29-1.fna.fbcdn.net/v/t1.6435-9/159865248_289707042515524_1981105062399326257_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZMYgKp5S3NAAX_Zoad6&_nc_ht=scontent.fdel29-1.fna&oh=00_AT8vZ__twtLxLyfBomjj5deiSmds0gw_OohHK9fkTUZk0g&oe=62F6127B"
							/>
						</Grid>
						<Grid item xs={8} className={classes.data_container}>
							<Box clone mb="20px">
								<Grid container alignItems="center" className="sideGrid">
									
									<Typography variant="h5">
										{state ? state.user.Name : "IsLoading ..."}
									</Typography>
									<Button
										className={classes.editButton}
										variant="outlined"
										onClick={handleEditClickOpen}
									>
										Edit Profile
									</Button>
									<div className={classes.settings}>
									<svg aria-label="Options" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
									</div>
								</Grid>
							</Box>
							<Box mb="20px" className={classes.second}>
								<Grid container spacing={4}>
									<Grid item>
										<Typography variant="subtitle1">
											<b>{data.length}</b> posts
										</Typography>
									</Grid>
									<Grid item>
										<button
										className={classes.FollowButton}
										variant="outlined"
										onClick={handleFollowClickOpen}
										>
										<Typography variant="subtitle1">
											<b>
												{state
													? state.user.Followers.length
													: "IsLoading ..."}
											</b>{" "}
											Followers
										</Typography>
										</button>
									</Grid>
									<Grid item>
										<button
										className={classes.FollowingButton}
										variant="outlined"
										onClick={handleFollowingClickOpen}
										>
										<Typography variant="subtitle1">
											<b>
												{state
													? state.user.Following.length
													: "IsLoading ..."}
											</b>{" "}
											Following
										</Typography>
										</button>
									</Grid>
								</Grid>
							</Box>
							<Typography variant="subtitle1">Name Here</Typography>
							<Typography variant="subtitle1">Loda Lehsun</Typography>
							<Typography variant="subtitle1">bhosdikeeeeee</Typography>
						</Grid>
					</Grid>
				</Box>
				{/* Tabs Goes Reference Here */}
				<Tabs
					className={classes.third}
					value={value}
					centered
					onChange={(event, value) => {
						setValue(value);
					}}
					TabIndicatorProps={{
						style: {
							transform: "translateY(-70px)",
							backgroundColor: "#262626",
						},
					}}
				>
					<Tab label="Posts" value="Posts" icon={<svg aria-label="" class="_ab6-" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>} />
					<Tab label="IGTV" value="IGTV" icon={<svg aria-label="" class="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M9.763 17.664a.908.908 0 01-.454-.787V11.63a.909.909 0 011.364-.788l4.545 2.624a.909.909 0 010 1.575l-4.545 2.624a.91.91 0 01-.91 0z" fill-rule="evenodd"></path></svg>} disabled />
					<Tab label="Saved" value="Saved" icon={<svg aria-label="" class="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>} />
					<Tab
						label="Tagged"
						value="Tagged"
						icon={<svg aria-label="" class="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59 0 001.124.465h5.259A1.818 1.818 0 0122 6.08v14.104a1.818 1.818 0 01-1.818 1.818H3.818A1.818 1.818 0 012 20.184V6.08a1.818 1.818 0 011.818-1.818h5.26a1.59 1.59 0 001.123-.465z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M18.598 22.002V21.4a3.949 3.949 0 00-3.948-3.949H9.495A3.949 3.949 0 005.546 21.4v.603" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle></svg>}
						disabled
					/>
				</Tabs>
				{/* Tabs Data Goes Here */}
				<TabPanel value={value} index="Posts">
					<Grid container spacing={4} className={classes.posts_css}>
						{data.map((item) => (
							<Grid item xs={4} key={item.id} className={classes.posts}>
								<img
									className={classes.posts_img}
									alt="post"
									src={`data:${item.photoType};base64,${item.photo}`}
								/>
							</Grid>
						))}
					</Grid>
				</TabPanel>
				<TabPanel value={value} index="Saved">
					<GridList cellHeight={230} cols={3} spacing={15}>
						{bookmarks.map((item) => (
							<GridListTile key={item._id}>
								<img
									src={`data:${item.PhotoType};base64,${item.Photo}`}
									alt={item.Title}
								/>
								<GridListTileBar
									title={item.Title}
									subtitle={<span>By : {item.PostedBy.Name}</span>}
									actionIcon={
										<IconButton
											aria-label={`info about`}
											className={classes.icon}
										>
											<DeleteIcon />
										</IconButton>
									}
								/>
							</GridListTile>
						))}
					</GridList>
				</TabPanel>
			</Box>
			{/* EditProfile Dialog */}
			<Dialog onClose={handleEditClose} open={openEdit} className={classes.dialogContainer}>
				<DialogTitle disableTypography className={classes.dialogTitle}>
					<Typography variant="h6">Profile settings</Typography>
					<IconButton
						aria-label="close"
						className={classes.closeButton}
						onClick={handleEditClose}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					<VerticalTabs  />
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleEditClose} color="primary">
						Save changes
					</Button>
				</DialogActions>
			</Dialog>
			{/* Follow Dialog */}
			<Dialog onClose={handleFollowClose} open={openFollow} className={classes.dialogContainer}>
				<DialogTitle disableTypography className={classes.dialogTitle}>
					<Typography variant="h6">Followers</Typography>
					<IconButton
						aria-label="close"
						className={classes.closeButton}
						onClick={handleFollowClose}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					<FollowList />
				</DialogContent>
			</Dialog>
			{/* Following Dialog */}
			<Dialog onClose={handleFollowingClose} open={openFollowing} className={classes.dialogContainer}>
				<DialogTitle disableTypography className={classes.dialogTitle}>
					<Typography variant="h6">Following</Typography>
					<IconButton
						aria-label="close"
						className={classes.closeButton}
						onClick={handleFollowingClose}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					<FollowingList />
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ProfilePage;
