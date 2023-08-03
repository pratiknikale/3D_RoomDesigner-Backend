import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedUser } from "../reduxStore/user/userSlice";
import DashboardHead from "./commonComponents/dashboardHead";
import DashboardTable from "./commonComponents/dashboardTable";
import NewProject from "./commonComponents/newProjectDashboard";

const DashboardPage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);
    const [newProj, setNewProj] = useState(false);

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
            <Container style={{ paddingTop: "90px", width: "100%", height: "100%", paddingBottom: "25px", boxSizing: "border-box" }} fluid>
                <Box style={{ backgroundColor: "#e2e2e1", width: "100%", height: "100%", padding: "0px", margin: "0px", boxSizing: "border-box" }}>
                    <DashboardHead newProj={newProj} setNewProj={setNewProj} />
                    {!newProj ?
                        <DashboardTable />
                        :
                        <NewProject setNewProj={setNewProj} />
                    }
                </Box>
            </Container>
        </>
    );
};

export default DashboardPage;
