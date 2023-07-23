import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Container, Grid, Button} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "./handlers/authHandlers";

const DesignerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Container style={{paddingTop: "40px"}} fixed>
        <h1 style={{color: "white"}}>You are logged in</h1>
        <Button
          onClick={(e) => logout(e, dispatch, navigate)}
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
