import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Grid,
  Chip,
  Divider,
  keyframes,
} from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import GroupsIcon from "@mui/icons-material/Groups";
import { Player } from "./AddPlayers";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getAllAuctionPlayers,
  deletePlayer,
} from "../features/auctionPlayer/auctionPlayerSlice";

const floatAnimation = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-9px) }
  100% { transform: translateY(0px) }
`;

const NamePick = () => {
  const players = useAppSelector(getAllAuctionPlayers);
  const dispatch = useAppDispatch();

  const [pickedName, setPickedName] = useState<Player | null>(null);

  const pickRandomName = () => {
    if (players.length === 0) return;
    const randomIndex = Math.floor(Math.random() * players.length);
    setPickedName(players[randomIndex]);
  };

  const deletePickedName = () => {
    if (!pickedName) return;
    dispatch(deletePlayer(pickedName.id));
    setPickedName(null);
  };

  const handleUnsold = () => {
    setPickedName(null);
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        backgroundColor: "#f8f9fa",
        p: 1,
        overflow: "hidden",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {/* Left Panel - Remaining Players List */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              height: "95vh",
              display: "flex",
              flexDirection: "column",
              borderRadius: "16px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: "0.4em",
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: "4px",
              },
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 2,
                backgroundColor: "#1976d2",
                color: "white",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <Typography
                variant="h5"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <GroupsIcon fontSize="small" />
                Remaining Players ({players.length})
              </Typography>
            </Box>

            <Box sx={{ p: 2, flex: 1 }}>
              <Grid container spacing={1}>
                {players.map((player, index) => (
                  <Grid item xs={6} key={index}>
                    <Chip
                      label={player.name}
                      sx={{
                        width: "100%",
                        fontSize: "0.9rem",
                        backgroundColor: "#e3f2fd",
                        border: "1px solid #90caf9",
                        height: 40,
                        transition: "all 0.2s",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Middle Panel - Controls */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              height: "70vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={pickRandomName}
              disabled={players.length === 0}
              sx={{
                px: 8,
                py: 3,
                borderRadius: "16px",
                fontSize: "1.2rem",
                textTransform: "none",
                boxShadow: "0 6px 20px rgba(25, 118, 210, 0.3)",
                background: "linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(25, 118, 210, 0.4)",
                  transform: "translateY(-2px)",
                },
                "&:disabled": {
                  background: "#e0e0e0",
                },
                transition: "all 0.3s ease",
              }}
              startIcon={<ShuffleIcon sx={{ fontSize: "32px!important" }} />}
            >
              Select Player
            </Button>

            <Chip
              label={`${players.length} players remaining`}
              color="primary"
              variant="outlined"
              sx={{
                px: 3,
                py: 1.5,
                fontSize: "1rem",
                borderWidth: 2,
                "& .MuiChip-label": { fontWeight: "bold" },
              }}
            />
          </Box>
        </Grid>

        {/* Right Panel - Selected Player */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              height: "70vh",
              p: 3,
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: pickedName ? "flex-start" : "center",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              background: pickedName
                ? "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)"
                : "rgba(25, 118, 210, 0.05)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {pickedName ? (
              <>
                <Box
                  sx={{
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    backgroundColor: "rgba(25, 118, 210, 0.1)",
                  }}
                />
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: 340,
                    border: "2px solid #1976d2",
                    borderRadius: "16px",
                    position: "relative",
                    overflow: "visible",
                    mt: 2,
                    boxShadow: "0 8px 16px rgba(25, 118, 210, 0.2)",
                    animation: `${floatAnimation} 4s ease-in-out infinite`,
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                          backgroundColor: "#1976d2",
                          mb: 2,
                          fontSize: "2.5rem",
                          position: "absolute",
                          top: -50,
                          left: "50%",
                          transform: "translateX(-50%)",
                          border: "3px solid white",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        }}
                        src={`${pickedName.profilePicture}`}
                      >
                        {pickedName.name.charAt(0)}
                      </Avatar>
                      <Typography
                        variant="h4"
                        sx={{
                          mt: 8,
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "#1a237e",
                          textTransform: "uppercase",
                          letterSpacing: 1,
                        }}
                      >
                        {pickedName.name}
                      </Typography>
                      <Chip
                        label={pickedName.role}
                        color="secondary"
                        sx={{
                          mt: 2,
                          fontWeight: "bold",
                          fontSize: "1rem",
                          px: 2,
                        }}
                      />
                      <Divider sx={{ width: "100%", my: 3 }} />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "#1a237e",
                          bgcolor: "#e8eaf6",
                          px: 3,
                          py: 1,
                          borderRadius: 2,
                        }}
                      >
                        🏷️ Base Price: 50 INR
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center", py: 3, gap: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={deletePickedName}
                      sx={{
                        borderRadius: "8px",
                        px: 4,
                        textTransform: "none",
                        fontWeight: "bold",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                        },
                        transition: "all 0.2s",
                      }}
                    >
                      Mark as Sold
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleUnsold}
                      sx={{
                        borderRadius: "8px",
                        px: 4,
                        textTransform: "none",
                        fontWeight: "bold",
                        borderWidth: 2,
                        "&:hover": {
                          borderWidth: 2,
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.2s",
                      }}
                    >
                      Mark Unsold
                    </Button>
                  </CardActions>
                </Card>
              </>
            ) : (
              <Box sx={{ textAlign: "center" }}>
                <GroupsIcon
                  sx={{
                    fontSize: 80,
                    color: "#cfd8dc",
                    mb: 2,
                    animation: `${floatAnimation} 3s ease-in-out infinite`,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "#90a4ae",
                    fontStyle: "italic",
                    fontWeight: "medium",
                  }}
                >
                  Spin the wheel to select a player
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NamePick;
