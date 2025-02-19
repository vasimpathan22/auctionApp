import { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Menu,
  MenuItem,
  ListItemButton,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Logout,
  MenuOpen,
  PersonOutline,
  AccountCircle,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { enviroment } from "../util/enviroment";

type Props = {
  children: ReactNode;
  menuItems: { text: string; icon: ReactNode; path: string }[];
};

const drawerWidth = 240;

const MainLayout = ({ children, menuItems }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { appName } = enviroment;
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const toggleDrawer = (newOpen: boolean) => {
    setIsSidebarOpen(newOpen);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
          color: "black",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{ mr: 2 }}
          >
            {isSidebarOpen ? (
              <MenuOpen fontSize="large" />
            ) : (
              <MenuIcon fontSize="large" />
            )}
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: -0.5,
              color: theme.palette.primary.main,
            }}
          >
            {appName}
          </Typography>

          <IconButton color="inherit" onClick={handleProfileClick}>
            <AccountCircle fontSize="large" sx={{ color: "text.secondary" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="temporary"
        open={isSidebarOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "none",
            boxShadow: "2px 0 4px rgba(0,0,0,0.1)",
            paddingTop: "env(safe-area-inset-top)",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          },
        }}
      >
        <Toolbar /> {/* Spacer for AppBar */}
        <Box sx={{ overflow: "hidden" }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text}>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => {
                    handleMenuItemClick(item.path);
                    toggleDrawer(false);
                  }}
                  sx={{
                    "&:hover": { backgroundColor: theme.palette.action.hover },
                    borderRadius: "8px",
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.action.selected,
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "40px" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    slotProps={{ primary: { sx: { fontWeight: "medium" } } }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <Toolbar />
        {children}
      </Box>

      {/* Profile Menu*/}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleProfileClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "8px",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
            minWidth: "200px",
            marginTop: "8px",
          },
          "& .MuiList-root": {
            padding: "8px 0",
          },
        }}
      >
        <MenuItem
          onClick={handleProfileClose}
          sx={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "text.primary",
            py: 1.5,
            px: 2.5,
            transition: "background-color 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "action.hover",
            },
            "&:active": {
              backgroundColor: "action.selected",
            },
            "& .MuiSvgIcon-root": {
              fontSize: "1.1rem",
              marginRight: 1.5,
              color: "text.secondary",
            },
          }}
        >
          <PersonOutline fontSize="small" />
          Profile
        </MenuItem>

        <MenuItem
          onClick={handleProfileClose}
          sx={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "text.primary",
            py: 1.5,
            px: 2.5,
            transition: "background-color 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "action.hover",
            },
            "& .MuiSvgIcon-root": {
              fontSize: "1.1rem",
              marginRight: 1.5,
              color: "text.secondary",
            },
          }}
        >
          <AccountCircle fontSize="small" />
          My Account
        </MenuItem>

        <Divider sx={{ my: 1, borderColor: "divider" }} />

        <MenuItem
          onClick={handleProfileClose}
          sx={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "error.main",
            py: 1.5,
            px: 2.5,
            transition: "background-color 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "error.lighter",
            },
            "& .MuiSvgIcon-root": {
              fontSize: "1.1rem",
              marginRight: 1.5,
              color: "error.main",
            },
          }}
        >
          <Logout fontSize="small" />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MainLayout;
