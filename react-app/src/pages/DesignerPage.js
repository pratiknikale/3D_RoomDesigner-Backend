import React, { useState, useEffect } from "react";
import { Grid, Accordion, AccordionSummary, Button, TextField, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from "react-redux";
import { setLoggedUser } from "../reduxStore/user/userSlice";
import { setCurrentProjectDetails, updateFloorDetails, createWall } from "../reduxStore/projects/projectSlice";
import { useParams } from "react-router-dom";
import { getSelectedProjDetails } from "../api/projectApi";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Main3Dmodal from "./threeDcomponents/Main3Dmodal";

const DesignerPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector((state) => state.user.user);

  const elements = useSelector((state) => state.projects.currentProjectDetails.elements)


  const getProjectDetails = async (id) => {
    const details = await getSelectedProjDetails(id);
    dispatch(setCurrentProjectDetails(details.data));
    // console.log(details)
  }
  const updateDetails = (e) => {
    e.preventDefault();
    dispatch(updateFloorDetails({ name: e.target.name, value: e.target.value }))
  }

  const createNewWall = (e) => {
    e.preventDefault();
    if (elements?.Wall.length < 4 && elements?.Wall.length >= 0) {
      dispatch(createWall({
        name: e.target.name, value: {
          elementType: "Wall",
          material: "",
          color: "grey",
          length: 0,
          width: 0,
          height: 0,
          positionX: 0,
          positionY: 0,
          positionZ: 0,
        }
      }))
    }

  }
  useEffect(() => {
    if (!user.email) {
      const localStorageProfile = localStorage.getItem("3D-designerProfile");
      if (localStorageProfile) {
        dispatch(setLoggedUser(JSON.parse(localStorageProfile)));
      }
    }
    getProjectDetails(id)

    return () => {
      dispatch(setCurrentProjectDetails({}));
    }
  }, []);
  return (
    <>
      <Grid container style={{ backgroundColor: "#e2e2e1", width: "100%", height: "100%", padding: "8px", paddingTop: "74px", boxSizing: "border-box" }}>
        <Grid item style={{
          // backgroundColor: "red",
          height: "100%",
          borderStyle: "solid",
          borderRadius: "5px",
          borderWidth: "thin",
          borderColor: "grey",
          backgroundColor: "white",
          padding: "5px"
        }} xs={8.3}>
          <Canvas>
            <Suspense fallback={null}>
              <Main3Dmodal />
            </Suspense>
          </Canvas>
        </Grid>
        <Grid item style={{
          height: "100%",
          borderStyle: "solid",
          borderRadius: "5px",
          borderWidth: "thin",
          borderColor: "grey",
          backgroundColor: "#f1f1f1",
          padding: "5px", overflowX: "hidden", overflowY: "auto"
        }} xs={3.7}>
          <Accordion>
            <AccordionSummary
              style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Flooring/Room Dimension</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={5} style={{ padding: "10px" }}>
                  <TextField
                    required
                    id="length"
                    name="length"
                    label="Length"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                    sx={{
                      "& .MuiInputBase-root": {
                        height: 40
                      }
                    }}
                    InputProps={{ sx: { borderRadius: 3, border: "1px solid #e2e2e1" } }}
                    value={elements?.Floor?.length ? elements.Floor.length : ""}
                    onChange={(e) => updateDetails(e)}
                  />
                </Grid>
                <Grid item xs={0.4} style={{ padding: "0px", display: "flex", justifyContent: "center", alignItems: "center" }}><span>X</span></Grid>
                <Grid item xs={5} style={{ padding: "10px" }}>
                  <TextField
                    required
                    id="width"
                    name="width"
                    label="Width"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                    sx={{
                      "& .MuiInputBase-root": {
                        height: 40
                      }
                    }}
                    InputProps={{ sx: { borderRadius: 3, border: "1px solid #e2e2e1" } }}
                    value={elements?.Floor?.width ? elements.Floor.width : ""}
                    onChange={(e) => updateDetails(e)}
                  />
                </Grid>
                <Grid item xs={1.6} style={{ padding: "0px", display: "flex", justifyContent: "center", alignItems: "center" }}><span>Feet</span></Grid>
                <Grid item xs={12} sm={12} style={{ padding: "10px", display: "flex", justifyContent: "center" }}>
                  <Button
                    // onClick={(e) => {
                    //   createNewProject(e);
                    // }}
                    variant="contained"
                    sx={{
                      width: "260px",
                      borderRadius: "15px",
                      color: "white",
                      background:
                        "linear-gradient(155deg, rgba(21, 80, 113, 1)0%, rgba(101, 157, 189, 1)59%, rgba(101, 157, 189, 1)100%)",
                    }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Walls</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                {elements?.Wall && (elements?.Wall.length > 0) && elements.Wall.map((Wall, i) => {
                  return <>
                    <Grid item xs={12} sm={12} style={{ padding: "5px", }}>
                      <p style={{ margin: "0px" }}><b>Wall {i + 1}</b></p>
                      <Grid container>
                        <Grid item xs={10.4} style={{}}>
                          <TextField
                            required
                            id="height"
                            name="height"
                            label="Height"
                            fullWidth
                            size="small"
                            autoComplete="off"
                            variant="outlined"
                            sx={{
                              "& .MuiInputBase-root": {
                                height: 40
                              }
                            }}
                            InputProps={{ sx: { borderRadius: 3, border: "1px solid #e2e2e1" } }}
                          // value={elements?.Floor?.length ? elements.Floor.length : ""}
                          // onChange={(e) => updateDetails(e)}
                          />
                        </Grid>
                        <Grid item xs={1.6} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
                          <span>feet</span>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                })}

                <Grid item xs={12} sm={12} style={{ padding: "10px", display: "flex", justifyContent: "center" }}>
                  <Button
                    name="Wall"
                    onClick={(e) => {
                      createNewWall(e);
                    }}
                    variant="text"
                    sx={{
                      width: "260px",
                      borderRadius: "15px",
                    }}
                  >
                    Add wall
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} style={{ padding: "10px", display: "flex", justifyContent: "center" }}>
                  <Button
                    // onClick={(e) => {
                    //   createNewProject(e);
                    // }}
                    variant="contained"
                    sx={{
                      width: "260px",
                      borderRadius: "15px",
                      color: "white",
                      background:
                        "linear-gradient(155deg, rgba(21, 80, 113, 1)0%, rgba(101, 157, 189, 1)59%, rgba(101, 157, 189, 1)100%)",
                    }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>

        </Grid>
      </Grid>
    </>
  );
};

export default DesignerPage;
