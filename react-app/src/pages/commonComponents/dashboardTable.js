import React, { useState, useEffect } from "react";
import { Container, Grid, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getProjectList, deleteProject } from "../../api/projectApi";

import { setProjectList, deleteProjectRedux } from "../../reduxStore/projects/projectSlice";
// import { projects } from "../../api/dummyApiData/dummyData";

import { useSelector, useDispatch } from "react-redux";

const DashboardTable = () => {
    const projects = useSelector((state) => state.projects.projectList);
    const dispatch = useDispatch();

    const getAllProjectList = async () => {
        const getProjects = await getProjectList();
        dispatch(setProjectList(getProjects?.data))
    }
    const handledeleteProject = async (e, id) => {
        const deleteProjRes = await deleteProject(id);
        dispatch(deleteProjectRedux(deleteProjRes.data));
    }

    useEffect(() => {
        getAllProjectList();
    }, [])
    return (

        <Box style={{ backgroundColor: "#e2e2e1", width: "100%", height: "90%", padding: "10px", boxSizing: "border-box" }}>
            <TableContainer component={Paper} style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.20)", height: "100%" }}>
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
                        {projects?.map((project, i) => (
                            <TableRow
                                key={project._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {i + 1}
                                </TableCell>
                                <TableCell align="left">{project.projectName}</TableCell>
                                <TableCell align="left">{project.projectType}</TableCell>
                                <TableCell align="left">{project.createdAt}</TableCell>
                                <TableCell align="left">{project.updatedAt}</TableCell>
                                <TableCell align="left"><Button variant="text"><Link style={{
                                    textDecoration: "none",
                                    color: 'blue'
                                }} to={`/DesignerPage/${project._id}`}>Open</Link></Button>
                                    <Button variant="text" onClick={(e) => handledeleteProject(e, project._id)}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default DashboardTable;
