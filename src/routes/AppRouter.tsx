import { Route, Routes } from "react-router-dom";
import {
  Home as HomeIcon,
  Settings,
  Gavel,
  PersonAddAlt1,
} from "@mui/icons-material";
import { CssBaseline } from "@mui/material";
import MainLayout from "../layout/MainLayout";
import Home from "../components/Home";
import Auction from "../components/Auction";
import AddPlayers from "../components/AddPlayers";
import NamePick from "../components/NamePick";
import SettingsMenu from "../components/SettingsMenu";

const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/" },
  { text: "Add Player", icon: <PersonAddAlt1 />, path: "/addplayer" },
  { text: "auction", icon: <Gavel />, path: "/auction" },
  { text: "Settings", icon: <Settings />, path: "/settings" },
];

const AppRouter = () => {
  return (
    <>
      <CssBaseline />
      <MainLayout menuItems={menuItems}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addplayer" element={<AddPlayers />} />
          <Route path="/auction" element={<NamePick />} />
          <Route path="/settings" element={<SettingsMenu />} />
        </Routes>
      </MainLayout>
    </>
  );
};

export default AppRouter;
