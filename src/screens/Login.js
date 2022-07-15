/**
 *
 * @author Anass Ferrak aka " TheLordA " <ferrak.anass@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Clone
 *
 */
import image2 from './instaHome.png'
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationContext from "../contexts/auth/Auth.context";
import { FETCH_USER_DATA } from "../contexts/types.js";
import { LOGIN_URL } from "../config/constants";
import Copyright from "../components/Copyright";
import { EmailRegex } from "../utils/regex";
import axios from "axios";
// Material-UI Components
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

// General Styles
const useStyles = makeStyles((theme) => ({
	main:{
		// width:"100vw",
		height:"100vh",
		display:"flex",
		boxSizing:"border-box",
		flexDirection:"row",
		flexWrap:"wrap"
	},
	Logo: {
		fontFamily: "Grand Hotel, cursive",
		margin: "0px 0px 20px 0px",
	},
	paper: {
		marginTop: "50px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	image1: {
		display:"flex",
		overflow:"auto" ,
		// width:"50vw " ,
		minWidth:"300px",
		height: "100vh",
		border:"3px solid black",
		backgroundSize: "100% 100%",
		backgroundColor: "#fafafa",
		// backgroundImage: "url(https://source.unsplash.com/random)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		justifyContent:"center",
		alignItems:"center"
	},
	RightPage:{
		border:"3px solid black",
		minWidth:"300px",
		// width:"50vw",
		height:"100vh",
		display:"flex",
		justifyContent:"center",
		alignItems:"center"

	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(2, 0, 2),
	},
}));

const Login = () => {
	const { dispatch } = useContext(AuthenticationContext);

	const history = useNavigate();
	const classes = useStyles();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formatValidation, setFormatValidation] = useState(false);
	const [authValidation, setAuthValidation] = useState(false);

	const handleInputChanges = (e) => {
		switch (e.target.name) {
			case "email":
				setEmail(e.target.value);
				break;
			case "password":
				setPassword(e.target.value);
				break;
			default:
				break;
		}
	};

	const handlePostData = () => {
		if (EmailRegex.test(email)) {
			axios.post(LOGIN_URL, { email, password })
				.then((res) => {
					const data = res.data;
					if (data.error) {
						setFormatValidation(false);
						setAuthValidation(true);
					} else {
						// we store our generated token in order to use it to access protected endpoints
						localStorage.setItem("jwt", data.token);

						// we also store the user details
						localStorage.setItem("user", JSON.stringify(data.user));
						console.log(data)
						
						dispatch({ payload: data.user, type: FETCH_USER_DATA });

						// we redirect the user to home page
						history("/");
					}
				})
				.catch((err) => {
					// that should be changed in Production
					// TODO : Make an error handler
					console.log(err);
				});
		} else {
			setAuthValidation(false);
			setFormatValidation(true);
		}
	};

	

	return (
		<Grid container className={classes.main}>
			<Grid className={classes.image1} item sm={4} md={6} >
				<img src={image2} alt="" style={{height: "80vh"}}/>
			</Grid>
			<Grid item xs={12} sm={8} md={6} className={classes.RightPage}>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className={classes.paper}>
						<Typography className={classes.Logo} variant="h2" gutterBottom>
							Instagram Clone
						</Typography>
						{formatValidation ? (
							<Alert variant="outlined" severity="error">
								Invalid Email format — check it out!
							</Alert>
						) : null}
						{authValidation ? (
							<Alert variant="outlined" severity="error">
								Invalid given Email/Password — check it out!
							</Alert>
						) : null}
						<form className={classes.form} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								// autoComplete="email"
								autoFocus
								value={email}
								onChange={handleInputChanges}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={handleInputChanges}
							/>

							<Button
								fullWidth
								variant="outlined"
								color="primary"
								className={classes.submit}
								disabled={email !== "" && password !== "" ? false : true}
								onClick={handlePostData}
							>
								Sign In
							</Button>
							<Grid container>
								<Grid item xs>
									<Link to="/reset" style={{ textDecoration: "none" }}>
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link to="/signup" style={{ textDecoration: "none" }}>
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
					<Box mt={8}>
						<Copyright />
					</Box>
				</Container>
			</Grid>
		</Grid>
	);
};

export default Login;
