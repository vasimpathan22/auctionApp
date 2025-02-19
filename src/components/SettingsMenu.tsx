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
import {
  Settings,
  GroupAdd,
  RestartAlt,
  ManageAccounts,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addUnsoldPlayersToAuction,
  resetAuctionPlayers,
} from "../features/auctionPlayer/auctionPlayerSlice";
import {
  getAllUnsoldPlayers,
  resetUnsoldPlayers,
} from "../features/unsoldPlayer/unsoldPlayerSlice";
import GlobalSnackBar from "../layout/GlobalSnackBar";
import { useNavigate } from "react-router-dom";

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
  const [openMenu, setOpenMenu] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useAppDispatch();
  const unsoldPlayers = useAppSelector(getAllUnsoldPlayers);

  const handleSnackBarClose = () => setOpenSnackBar(false);
  const handleClick = () => setOpenMenu(true);
  const handleClose = () => setOpenMenu(false);

  const handleManagePlayers = () => {
    navigate("/managePlayers");
    handleClose();
  };

  const handleResetData = () => {
    localStorage.clear();
    dispatch(resetAuctionPlayers());
    dispatch(resetUnsoldPlayers());
    handleClose();
  };

  const addUnsoldPlayerToAuction = () => {
    try {
      if (unsoldPlayers.length === 0) {
        setMessage("No unsold players to add to auction");
        return;
      }
      dispatch(addUnsoldPlayersToAuction(unsoldPlayers));
      setMessage(`Added ${unsoldPlayers.length} unsold player to auction`);
      dispatch(resetUnsoldPlayers());
    } catch (e) {
      console.error(e);
    } finally {
      setOpenSnackBar(true);
      handleClose();
    }
  };

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
        startIcon={<Settings fontSize="small" />}
      >
        Settings
      </StyledMenuButton>
      <GlobalSnackBar
        open={openSnackBar}
        handleClose={handleSnackBarClose}
        message={message}
        severity="success"
      />

      {/* Desktop Dialog */}
      {isMobile ? (
        <SwipeableDrawer
          anchor="bottom"
          open={openMenu}
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
                  onClick={addUnsoldPlayerToAuction}
                  sx={{ py: 2, borderRadius: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <GroupAdd color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Add unsold players to auction"
                    slotProps={{ primary: { fontWeight: 500 } }}
                  />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleManagePlayers}
                  sx={{ py: 2, borderRadius: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <ManageAccounts color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Manage Players"
                    slotProps={{ primary: { fontWeight: 500 } }}
                  />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem disablePadding>
                <ListItemButton
                  sx={{ py: 2, borderRadius: 1 }}
                  onClick={handleResetData}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <RestartAlt color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Reset all app data"
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
        <Dialog
          open={openMenu}
          onClose={handleClose}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "16px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(145deg, #1E1E1E, #2C2C2C)"
                  : "linear-gradient(145deg, #f5f5f5, #fff)",
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 600 }}>Settings</DialogTitle>
          <DialogContent dividers>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={addUnsoldPlayerToAuction}
                  sx={{ py: 1.5, borderRadius: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <GroupAdd color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Add unsold players to auction"
                    slotProps={{ primary: { fontWeight: 500 } }}
                  />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleManagePlayers}
                  sx={{ py: 1.5, borderRadius: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <ManageAccounts color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Manage Players"
                    slotProps={{ primary: { fontWeight: 500 } }}
                  />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleResetData}
                  sx={{ py: 1.5, borderRadius: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <RestartAlt color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Reset all app data"
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
