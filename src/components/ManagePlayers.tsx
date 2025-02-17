import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Avatar,
  Box,
  keyframes,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deletePlayerFromAuction } from "../features/auctionPlayer/auctionPlayerSlice";

const floatAnimation = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-9px) }
  100% { transform: translateY(0px) }
`;

const ManagePlayers = () => {
  const auctionPlayers = useAppSelector((state) => state.auction);
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    dispatch(deletePlayerFromAuction(id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        Manage Players
      </Typography>
      {auctionPlayers.length === 0 ? (
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
            Add players to the auction
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {auctionPlayers.map((player) => (
            <Grid item key={player.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.2s",
                  position: "relative",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <Avatar
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: 50,
                    height: 50,
                    fontSize: "24px",
                    backgroundColor: "primary.main",
                  }}
                  src={player.profilePicture}
                >
                  {player.name.charAt(0).toUpperCase()}
                </Avatar>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    {player.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Role: {player.role}
                  </Typography>
                  {player.handedness && (
                    <Typography variant="body2" color="text.secondary">
                      Handedness: {player.handedness}
                    </Typography>
                  )}
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDelete(player.id)}
                    sx={{
                      marginTop: 1,
                      "&:hover": { backgroundColor: "error.light" },
                    }}
                  >
                    <Delete />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ManagePlayers;
