import React, {useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Container, Grid, Button} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {setLoggedUser, logoutUser} from "../reduxStore/user/userSlice";
import decode from "jwt-decode";
import Cookies from "js-cookie";

const DesignerPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear("3D-designerProfile");
    Cookies.remove("3DDesigner_token");
    dispatch(logoutUser());
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("3D-designerProfile"));
    if (token) {
      const decodedtoken = decode(token.token);

      if (decodedtoken.exp * 1000 < new Date().getTime()) logout();
      else dispatch(setLoggedUser(token));
    }
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <Container style={{paddingTop: "40px"}} fixed>
        <h1 style={{color: "white"}}>You are logged in</h1>
        <Button
          onClick={(e) => logout(e)}
          variant="contained"
          style={{
            borderRadius: "15px",
          }}
        >
          <span>Logout</span>
        </Button>
      </Container>
    </>
  );
};

export default DesignerPage;
