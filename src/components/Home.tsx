import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const Home = () => {
  const navigate = useNavigate();
  const auctionPlayers = useAppSelector((state) => state.auction);

  const handleAddPlayersClick = () => {
    navigate("/addplayer");
  };

  const handleAuctionClick = () => {
    navigate("/auction");
  };
  return (
    <Box
      sx={{
        position: "relative",
        height: "90.8vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Background Image with Light Opacity */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url(/cricket.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          zIndex: -1,
        }}
      />

      {/* Header */}
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: "bold",
          mb: 4,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Pratiti Premier League
      </Typography>

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#FF5722",
            "&:hover": { backgroundColor: "#E64A19" },
          }}
          onClick={handleAddPlayersClick}
        >
          Add Players
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#4CAF50",
            "&:hover": { backgroundColor: "#388E3C" },
          }}
          disabled={auctionPlayers.length === 0}
          onClick={handleAuctionClick}
        >
          Take to the Auction
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
