import React, { useState, useEffect } from "react";
import { Container, Grid, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedUser } from "../reduxStore/user/userSlice";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { projects } from "../api/dummyApiData/dummyData";

const DashboardPage = () => {
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
            <Container style={{ paddingTop: "90px", width: "100%", height: "100%", paddingBottom: "25px", boxSizing: "border-box" }} fluid>

                <Box style={{ backgroundColor: "#e2e2e1", width: "100%", height: "100%", padding: "20px", boxSizing: "border-box" }}>
                    <TableContainer component={Paper} style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.20)" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sr. No.</TableCell>
                                    <TableCell align="left">Project Name</TableCell>
                                    <TableCell align="left">Project Type</TableCell>
                                    <TableCell align="left">Created Date</TableCell>
                                    <TableCell align="left">Updated Date</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projects.map((project, i) => (
                                    <TableRow
                                        key={project.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {project.id}
                                        </TableCell>
                                        <TableCell align="left">{project.projectName}</TableCell>
                                        <TableCell align="left">{project.projectType}</TableCell>
                                        <TableCell align="left">{project.createdDate}</TableCell>
                                        <TableCell align="left">{project.updatedDate}</TableCell>
                                        <TableCell align="left"><Button variant="text"><Link style={{
                                            textDecoration: "none",
                                            color: 'blue'
                                        }} to="/DesignerPage">Open</Link></Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </>
    );
};

export default DashboardPage;
