import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  Slide,
  Paper,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  styled,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import SecurityIcon from "@mui/icons-material/Security";

const StyledMenuButton = styled(Button)(({ theme }) => ({
  minWidth: "auto",
  borderRadius: "12px",
  padding: "8px 16px",
  background:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(25, 118, 210, 0.1)",
  "&:hover": {
    background:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(25, 118, 210, 0.2)",
    transform: "translateY(-1px)",
  },
  transition: "all 0.3s ease",
}));

const ActionSheet = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  borderTopLeftRadius: "24px",
  borderTopRightRadius: "24px",
  padding: theme.spacing(2),
  boxShadow: theme.shadows[24],
  background: theme.palette.background.paper,
  zIndex: theme.zIndex.modal,
}));

const SettingsMenu = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <StyledMenuButton
        aria-label="settings"
        onClick={handleClick}
        startIcon={<SettingsIcon fontSize="small" />}
      >
        Settings
      </StyledMenuButton>

      {/* Desktop Dialog */}
      {!isMobile && (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent dividers>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => console.log("Advanced customization")}
                >
                  <ListItemIcon>
                    <DesignServicesIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Option A"
                    secondary="Advanced customization"
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => console.log("Security settings")}
                >
                  <ListItemIcon>
                    <SecurityIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Option B"
                    secondary="Security settings"
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" fullWidth>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Mobile Action Sheet */}
      {isMobile && (
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <ActionSheet>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => console.log("Advanced customization")}
                >
                  <ListItemIcon>
                    <DesignServicesIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Option A"
                    secondary="Advanced customization"
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => console.log("Security settings")}
                >
                  <ListItemIcon>
                    <SecurityIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Option B"
                    secondary="Security settings"
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Box sx={{ p: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClose}
                sx={{ mt: 1, borderRadius: "12px", py: 1.5 }}
              >
                Cancel
              </Button>
            </Box>
          </ActionSheet>
        </Slide>
      )}
    </Box>
  );
};

export default SettingsMenu;
