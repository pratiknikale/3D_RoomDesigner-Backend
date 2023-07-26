import React, {useEffect, useState} from "react";
import googleLogo from "../assets/googleLogo.png";
import {Button, Container, Grid, Typography, TextField, Box, Paper, Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {signinFieldHandler, loginFieldHandler, loginSubmit, submitSignup} from "./handlers/authHandlers";
import {useSelector, useDispatch} from "react-redux";

// import {protectedRouteTest} from "../api/api";

const signupFormFields = {
  FirstName: "",
  LastName: "",
  Email: "",
  Password: "",
};
const loginFormFields = {
  Email: "",
  Password: "",
};

const Auth = ({messageOpen, setMessageOpen}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const user = useSelector((state) => state.user.user);
  const [isSignup, setIsSignup] = useState(false);
  const [signupData, setSignupData] = useState(signupFormFields);
  const [loginData, setLoginData] = useState(loginFormFields);

  const switchSigninLogin = (e, operation) => {
    e.preventDefault();
    if (operation === "login") {
      setIsSignup(false);
    } else if (operation === "signup") {
      setIsSignup(true);
    }
  };

  // useEffect(() => {
  //   (async function () {
  //     const res = await protectedRouteTest();
  //     document.getElementById("protectionTest").innerHTML = JSON.stringify(res);
  //   })();
  // }, []);
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("3D-designerProfile"));
    if (loggedUser) {
      navigate("/DesignerPage");
    }
  }, []);

  const google = () => {
    window.open("http://localhost:8000/userAuth/google/callback", "_self");
  };

  // useEffect(() => {
  //     if (user.token) {
  //         navigate("/mytasks");
  //     }
  // }, [user]);

  return (
    <>
      <Container style={{paddingTop: "110px"}} fixed>
        {/* <span id="protectionTest"></span> */}
        <Paper style={{borderRadius: "15px"}} elevation={3} sx={{marginRight: "20%", marginLeft: "20%"}}>
          <Box
            style={{backgroundColor: "#e2e2e1", borderRadius: "12px", boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.87)"}}
            sx={{padding: 8, display: "flex", textAlign: "center", flexDirection: "column"}}
          >
            <Grid container>
              <Grid item xs={12} sm={3} />
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Typography align="center" variant="h6" gutterBottom sx={{paddingBottom: 6}}>
                    <Button
                      onClick={(e) => {
                        switchSigninLogin(e, "login");
                      }}
                      variant="contained"
                      style={{
                        borderRadius: "15px",
                        width: "100%",
                        color: isSignup ? "black" : "white",
                        background: isSignup
                          ? "none"
                          : "linear-gradient(155deg, rgba(21, 80, 113, 1)0%, rgba(101, 157, 189, 1)59%, rgba(101, 157, 189, 1)100%)",
                      }}
                    >
                      <span>Login</span>
                    </Button>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography align="center" variant="h6" gutterBottom sx={{paddingBottom: 6}}>
                    <Button
                      onClick={(e) => {
                        switchSigninLogin(e, "signup");
                      }}
                      variant="contained"
                      style={{
                        borderRadius: "15px",
                        width: "100%",
                        color: !isSignup ? "black" : "white",
                        background: !isSignup
                          ? "none"
                          : "linear-gradient(155deg, rgba(21, 80, 113, 1)0%, rgba(101, 157, 189, 1)59%, rgba(101, 157, 189, 1)100%)",
                      }}
                    >
                      <span>Sign Up</span>
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3} />
            </Grid>
            <div>
              {isSignup ? (
                <Grid container spacing={3}>
                  {/* signUp Container */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="FirstName"
                      label="First Name"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                      InputProps={{sx: {borderRadius: 3, border: "1px solid #e2e2e1"}}}
                      value={signupData.FirstName}
                      onChange={(e) => signinFieldHandler(e, signupData, setSignupData)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="lastName"
                      name="LastName"
                      label="Last Name"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                      InputProps={{sx: {borderRadius: 3, border: "1px solid #e2e2e1"}}}
                      value={signupData.LastName}
                      onChange={(e) => signinFieldHandler(e, signupData, setSignupData)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="emailID"
                      name="Email"
                      label="Email"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                      InputProps={{sx: {borderRadius: 3, border: "1px solid #e2e2e1"}}}
                      value={signupData.Email}
                      onChange={(e) => signinFieldHandler(e, signupData, setSignupData)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="password"
                      name="Password"
                      label="Password"
                      type="password"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                      InputProps={{sx: {borderRadius: 3, border: "1px solid #e2e2e1"}}}
                      value={signupData.Password}
                      onChange={(e) => signinFieldHandler(e, signupData, setSignupData)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} />
                  <Grid item xs={12} sm={12} style={{display: "flex", justifyContent: "center"}}>
                    <Button
                      onClick={(e) => {
                        submitSignup(e, signupData, messageOpen, setMessageOpen, navigate, dispatch);
                      }}
                      variant="contained"
                      sx={{
                        width: "260px",
                        borderRadius: "15px",
                        color: "white",
                        background:
                          "linear-gradient(155deg, rgba(21, 80, 113, 1)0%, rgba(101, 157, 189, 1)59%, rgba(101, 157, 189, 1)100%)",
                      }}
                    >
                      Sign up
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={3}>
                  {/* login Container */}
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="emailID"
                      name="Email"
                      label="Email"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                      InputProps={{sx: {borderRadius: 3, border: "1px solid #e2e2e1"}}}
                      value={loginData.Email}
                      onChange={(e) => loginFieldHandler(e, loginData, setLoginData)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="password"
                      name="Password"
                      label="Password"
                      type="password"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                      InputProps={{sx: {borderRadius: 3, border: "1px solid #e2e2e1"}}}
                      value={loginData.Password}
                      onChange={(e) => loginFieldHandler(e, loginData, setLoginData)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} style={{paddingTop: "8px"}}>
                    <Link href="#" underline="hover">
                      Forgot Password*
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={12} />
                  <Grid item xs={12} sm={12} style={{display: "flex", justifyContent: "center"}}>
                    <Button
                      onClick={(e) => {
                        loginSubmit(e, loginData, messageOpen, setMessageOpen, navigate, dispatch);
                      }}
                      variant="contained"
                      sx={{
                        width: "260px",
                        borderRadius: "15px",
                        color: "white",
                        background:
                          "linear-gradient(155deg, rgba(21, 80, 113, 1)0%, rgba(101, 157, 189, 1)59%, rgba(101, 157, 189, 1)100%)",
                      }}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              )}
              <hr style={{marginTop: "22px", marginBottom: "22px"}} />
              <Button
                onClick={google}
                variant="outlined"
                sx={{
                  width: "260px",
                  borderRadius: "15px",
                  textTransform: "none",
                }}
              >
                <img style={{width: "25px", paddingRight: "5px"}} src={googleLogo} />
                Continue with google
              </Button>
            </div>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Auth;
