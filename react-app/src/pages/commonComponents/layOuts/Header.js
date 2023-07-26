import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../handlers/authHandlers";

import {useNavigate} from "react-router-dom";

export default function Header() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchor, setAnchor] = React.useState(false);

  const handleMenu = (e) => {
    console.log("handleMenu::::::::::::::::");
    setAnchor(true);
  };

  const handleClose = () => {
    setAnchor(false);
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            3D Interior Designer
          </Typography>
          {user.email && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => handleMenu(e)}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchor}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={anchor}
                onClose={(e) => handleClose(e)}
              >
                {/* <MenuItem onClick={(e) => handleClose(e)}>Dashboard</MenuItem>
                <MenuItem onClick={(e) => handleClose(e)}>My account</MenuItem> */}
                <MenuItem onClick={(e) => logout(e, dispatch, navigate)}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
