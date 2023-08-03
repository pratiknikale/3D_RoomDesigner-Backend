import React, { useState, useEffect } from "react";
import { Grid, Button, Box, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { newProject } from "../../api/projectApi";

let newProjectData = {
    projectName: "",
    projectType: "",
}

const DashboardTable = ({ setNewProj }) => {
    const [projData, setProjData] = useState(newProjectData);

    const newProjFieldHandler = (e) => {
        e.preventDefault()
        setProjData({ ...projData, [e.target.name]: e.target.value });
    }

    const createNewProject = async (e) => {
        const newProj = await newProject(projData);
        setNewProj(false)
    }

    return (

        <Box style={{ backgroundColor: "#e2e2e1", width: "100%", height: "90%", padding: "10px", boxSizing: "border-box" }}>
            <div style={{ display: "flex", alignItems: "center", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.20)", boxSizing: "border-box", paddingRight: "150px", paddingLeft: "150px", backgroundColor: "white", height: "100%", width: "100%" }}>
                <Grid container spacing={3}>
                    {/* signUp Container */}
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="projectName"
                            name="projectName"
                            label="Project Name"
                            fullWidth
                            size="small"
                            autoComplete="off"
                            variant="outlined"
                            InputProps={{ sx: { borderRadius: 3, border: "1px solid #e2e2e1" } }}
                            value={projData.projectName}
                            onChange={(e) => newProjFieldHandler(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="projectType"
                            name="projectType"
                            label="Project Type"
                            fullWidth
                            size="small"
                            autoComplete="off"
                            variant="outlined"
                            InputProps={{ sx: { borderRadius: 3, border: "1px solid #e2e2e1" } }}
                            value={projData.projectType}
                            onChange={(e) => newProjFieldHandler(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} />
                    <Grid item xs={12} sm={12} style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            onClick={(e) => {
                                createNewProject(e);
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
                            Create Project
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
};

export default DashboardTable;
