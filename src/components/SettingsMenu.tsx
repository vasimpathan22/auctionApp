import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  SwipeableDrawer,
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

const Puller = styled(Box)(({ theme }) => ({
  width: 40,
  height: 6,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.3)"
      : "rgba(0, 0, 0, 0.3)",
  borderRadius: 3,
  margin: "8px auto",
}));

const SettingsMenu = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
      {isMobile ? (
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={handleClose}
          onOpen={handleClick}
          disableSwipeToOpen={false}
          PaperProps={{
            sx: {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              maxWidth: 600,
              mx: "auto",
              overflow: "visible",
            },
          }}
        >
          <Puller />
          <Box sx={{ px: 2, pb: 2 }}>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => console.log("Advanced customization")}
                  sx={{ py: 2, borderRadius: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <DesignServicesIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Option A"
                    secondary="Advanced customization"
                    slotProps={{ primary: { fontWeight: 500 } }}
                  />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => console.log("Security settings")}
                  sx={{ py: 2, borderRadius: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <SecurityIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Option B"
                    secondary="Security settings"
                    slotProps={{ primary: { fontWeight: 500 } }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClose}
              sx={{
                mt: 2,
                borderRadius: "12px",
                py: 1.5,
                fontWeight: 500,
                fontSize: "0.875rem",
              }}
            >
              Cancel
            </Button>
          </Box>
        </SwipeableDrawer>
      ) : (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontWeight: 600 }}>Settings</DialogTitle>
          <DialogContent dividers>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => console.log("Advanced customization")}
                  sx={{ py: 1.5, borderRadius: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <DesignServicesIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Option A"
                    secondary="Advanced customization"
                    slotProps={{ primary: { fontWeight: 500 } }}
                  />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => console.log("Security settings")}
                  sx={{ py: 1.5, borderRadius: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <SecurityIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Option B"
                    secondary="Security settings"
                    slotProps={{ primary: { fontWeight: 500 } }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              fullWidth
              sx={{ borderRadius: "12px", py: 1 }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default SettingsMenu;
