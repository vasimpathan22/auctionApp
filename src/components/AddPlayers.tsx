import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  Grid,
  Paper,
  Avatar,
  InputAdornment,
} from "@mui/material";
import {
  SportsCricket as CricketIcon,
  PersonAdd as AddIcon,
} from "@mui/icons-material";
import { useAppDispatch } from "../app/hooks";
import { addPlayerToAuction } from "../features/auctionPlayer/auctionPlayerSlice";
import GlobalSnackBar from "../layout/GlobalSnackBar";

type PlayerRole = "Batter" | "Bowler" | "All-rounder";
type PlayerHandedness = "LHB" | "RHB";

export interface Player {
  id: number;
  name: string;
  role: PlayerRole;
  handedness?: PlayerHandedness;
  profilePicture: string;
}

const AddPlayers: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<PlayerRole>("Batter");
  const [handedness, setHandedness] = useState<PlayerHandedness>("RHB");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Player name is required";
    if (!profilePicture.trim()) {
      newErrors.profilePicture = "Profile picture link is required";
    } else if (!/\.(jpeg|jpg|gif|png)$/.test(profilePicture)) {
      newErrors.profilePicture = "Invalid image URL";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCloseSnackBar = () => {
    setOpen(false);
  };

  const handleAddPlayer = () => {
    if (!validateForm()) return;

    const newPlayer: Player = {
      id: Date.now(),
      name,
      role,
      profilePicture,
    };
    if (role === "Batter" || role === "Bowler") {
      newPlayer.handedness = handedness;
    }

    dispatch(addPlayerToAuction(newPlayer));

    setPlayers([...players, newPlayer]);
    setOpen(true);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setRole("Batter");
    setHandedness("RHB");
    setProfilePicture("");
    setErrors({});
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", p: 3 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <CricketIcon sx={{ fontSize: 50, color: "primary.main", mb: 2 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Add New Player
          </Typography>
          <Typography color="text.secondary">
            Fill in the details to register a new player
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Player Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              error={!!errors.name}
              helperText={errors.name}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">👤</InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.profilePicture}>
              <TextField
                label="Profile Picture URL"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                type="url"
                helperText={errors.profilePicture}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">🌄</InputAdornment>
                    ),
                  },
                }}
              />
              {profilePicture && (
                <Avatar
                  src={profilePicture}
                  sx={{
                    width: 80,
                    height: 80,
                    mt: 2,
                    border: "2px solid #eee",
                  }}
                />
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Player Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value as PlayerRole)}
                label="Player Role"
                MenuProps={{ transitionDuration: 150 }}
              >
                <MenuItem value="Batter">🏏 Batter</MenuItem>
                <MenuItem value="Bowler">🎯 Bowler</MenuItem>
                <MenuItem value="All-rounder">🌟 All-rounder</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {(role === "Batter" || role === "Bowler") && (
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1" gutterBottom>
                  Batting/Bowling Hand
                </Typography>
                <RadioGroup
                  row
                  value={handedness}
                  onChange={(e) =>
                    setHandedness(e.target.value as PlayerHandedness)
                  }
                  sx={{ gap: 3 }}
                >
                  <FormControlLabel
                    value="LHB"
                    control={<Radio color="primary" />}
                    label="Left-Handed (LHB)"
                  />
                  <FormControlLabel
                    value="RHB"
                    control={<Radio color="primary" />}
                    label="Right-Handed (RHB)"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleAddPlayer}
              startIcon={<AddIcon />}
              sx={{ py: 1.5, fontWeight: 600 }}
            >
              Add Player
            </Button>
          </Grid>
        </Grid>
        <GlobalSnackBar
          open={open}
          handleClose={handleCloseSnackBar}
          message="Player added successfully!"
          severity="success"
        />

        {players.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Registered Players ({players.length})
            </Typography>
            <Grid container spacing={3}>
              {players.map((player, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    elevation={2}
                    sx={{ p: 3, borderRadius: 3, height: "100%" }}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <Avatar
                        src={player.profilePicture}
                        sx={{
                          width: 100,
                          height: 100,
                          mb: 2,
                          mx: "auto",
                          border: "3px solid #f5f5f5",
                        }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {player.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {player.role}
                      </Typography>
                      {player.handedness && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block", mt: 1 }}
                        >
                          {player.handedness}
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AddPlayers;
