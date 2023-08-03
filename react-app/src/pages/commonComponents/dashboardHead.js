import React from "react";
import { Button, Box } from "@mui/material";


import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

const DashboardHead = ({ newProj, setNewProj }) => {
    return (
        <Box style={{ backgroundColor: "#e2e2e1", width: "100%", height: "10%", padding: "10px", paddingBottom: "0px", boxSizing: "border-box" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.20)", width: "100%", height: "100%", margin: "0px", paddingLeft: "10px", boxSizing: "border-box", paddingRight: "10px", backgroundColor: "white" }}>
                <div style={{ flexGrow: "5" }}>
                    <InputBase

                        style={{
                            borderStyle: "solid", borderWidth: "1px", paddingLeft: "10px", borderColor: "lightgrey", borderRadius: "15px"
                        }}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Project"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    {/* <Divider sx={{ height: 28, m: 2.5 }} orientation="vertical" /> */}
                </div>
                <div style={{ flexGrow: "5" }}>
                    <Button variant="contained"
                        sx={{
                            width: "200px",
                            float: "right",
                            borderRadius: "15px",
                            color: "white",
                            background:
                                "linear-gradient(155deg, rgba(21, 80, 113, 1)0%, rgba(101, 157, 189, 1)59%, rgba(101, 157, 189, 1)100%)",
                        }}

                        onClick={() => { setNewProj(!newProj) }}>{newProj ? "View All Projects" : "New Project"}</Button>
                </div>
            </div>
        </Box>
    );
};

export default DashboardHead;
