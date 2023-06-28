import React, {useState} from "react";
import {Button, Container, Grid, Typography, TextField, Box, Paper, Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {signup, login} from "../api/api";
// import { useSelector } from "react-redux/es/exports";

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

const Auth = (props) => {
  const navigate = useNavigate();

  // const user = useSelector((state) => state.user.user);
  const [isSignup, setIsSignup] = useState(false);
  const [signupData, setSignupData] = useState(signupFormFields);
  const [loginData, setLoginData] = useState(loginFormFields);

  const handleSigninLogin = (e, operation) => {
    e.preventDefault();
    if (operation === "login") {
      setIsSignup(false);
    } else if (operation === "signup") {
      setIsSignup(true);
    }
  };

  const signinFieldHandler = (e) => {
    e.preventDefault();
    setSignupData({...signupData, [e.target.name]: e.target.value});
  };
  const loginFieldHandler = (e) => {
    e.preventDefault();
    setLoginData({...loginData, [e.target.name]: e.target.value});
  };
  const submitSignup = async (e) => {
    e.preventDefault();
    await signup(signupData, navigate).then((result) => {
      if (result.error) {
        props.setMessageOpen({show: true, status: "failed", message: result.message});
        setTimeout(() => {
          props.setMessageOpen({...props.messageOpen, status: "failed", show: false});
        }, 4000);
      } else {
        props.setMessageOpen({show: true, status: "success", message: "Successfully created new account and loggedIn"});
        setTimeout(() => {
          props.setMessageOpen({...props.messageOpen, status: "success", show: false});
        }, 4000);
      }
    });
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    await login(loginData, navigate).then((result) => {
      if (result.error) {
        props.setMessageOpen({show: true, status: "failed", message: result.message});
        setTimeout(() => {
          props.setMessageOpen({...props.messageOpen, status: "failed", show: false});
        }, 4000);
      } else {
        props.setMessageOpen({show: true, status: "success", message: "Successfully LoggedIn"});
        setTimeout(() => {
          props.setMessageOpen({...props.messageOpen, status: "success", show: false});
        }, 4000);
      }
    });
  };

  // useEffect(() => {
  //     if (user.token) {
  //         navigate("/mytasks");
  //     }
  // }, [user]);

  return (
    <>
      <Container style={{paddingTop: "40px"}} fixed>
        <Paper style={{borderRadius: "15px"}} elevation={3} sx={{marginRight: "20%", marginLeft: "20%"}}>
          <Box sx={{padding: 5}}>
            <Grid container>
              <Grid item xs={12} sm={3} />
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Typography align="center" variant="h6" gutterBottom sx={{paddingBottom: 6}}>
                    <Button
                      onClick={(e) => {
                        handleSigninLogin(e, "login");
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
                        handleSigninLogin(e, "signup");
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
                      onChange={(e) => signinFieldHandler(e)}
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
                      onChange={(e) => signinFieldHandler(e)}
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
                      onChange={(e) => signinFieldHandler(e)}
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
                      onChange={(e) => signinFieldHandler(e)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} />
                  <Grid item xs={12} sm={12} style={{display: "flex", justifyContent: "center"}}>
                    <Button
                      onClick={(e) => {
                        submitSignup(e);
                      }}
                      variant="contained"
                      sx={{
                        width: "120px",
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
                      onChange={(e) => loginFieldHandler(e)}
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
                      onChange={(e) => loginFieldHandler(e)}
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
                        loginSubmit(e);
                      }}
                      variant="contained"
                      sx={{
                        width: "120px",
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
            </div>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Auth;
