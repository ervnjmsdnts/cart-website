import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { ReactComponent as Logo } from "../assets/logo.svg";
import {
  Avatar,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Inventory, SupervisedUserCircle } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const drawerWidth = 240;
const Sidebar = ({ children }) => {
  const { user, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        elevation={0}
      >
        <Toolbar>
          <Box display="flex" width="100%" justifyContent="flex-end">
            <Box display="flex" alignItems="center" gap="8px">
              <Typography>Good Day! {user.username}</Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Logo style={{ width: "200px" }} />
          </Box>
        </Toolbar>
        <Divider />
        <List>
          <ListItemButton onClick={() => navigate("staff")}>
            <ListItemIcon>
              <SupervisedUserCircle />
            </ListItemIcon>
            <ListItemText>Staff</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => navigate("product")}>
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText>Product</ListItemText>
          </ListItemButton>
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
