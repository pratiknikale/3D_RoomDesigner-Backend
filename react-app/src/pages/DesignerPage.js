import React, {useState, useEffect} from "react";
import {Container, Grid, Button} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {setLoggedUser} from "../reduxStore/user/userSlice";

const DesignerPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user.email) {
      const localStorageProfile = localStorage.getItem("3D-designerProfile");
      if (localStorageProfile) {
        dispatch(setLoggedUser(JSON.parse(localStorageProfile)));
      }
    }
  }, []);
  return (
    <>
      <Container style={{paddingTop: "110px"}} fixed>
        <h1 style={{color: "white"}}>You are logged in</h1>
      </Container>
    </>
  );
};

export default DesignerPage;
