import React from "react";
import {
  AppBar,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import SwitchDarkMode from "../components/atoms/SwitchDarkMode";

const styles = {
  page: {
    my: 4,
    width: "100%",
  },
  title: {
    flexGrow: 1,
    fontFamily: "Arsenal",
    fontWeight: 700,
  },
  bottomNavigation: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    boxShadow: "0px -4px 4px 0px rgba(0, 0, 0, 0.05)",
  },
  navIcon: {
    fontSize: 20,
    lineHeight: 20,
  },
};

export default function Layout({ children }) {
  const menuItems = React.useMemo(
    () => [
      {
        text: "Search",
        icon: <SearchIcon sx={styles.navIcon} color="grey" />,
        path: "/",
      },
      {
        text: "Favorite",
        icon: <FavoriteIcon sx={styles.navIcon} color="grey" />,
        path: "/liked",
      },
    ],
    []
  );
  const history = useHistory();
  const location = useLocation();
  const indexPath = React.useMemo(() => {
    const pathname = location.pathname;
    const index = menuItems.findIndex((item) =>
      new RegExp(pathname, "gi").test(item.path)
    );
    return index;
  }, [menuItems, location]);
  const [bottomVal, setBottomVal] = React.useState(indexPath);
  const title = React.useMemo(() => {
    const item = menuItems[indexPath];
    return item?.text;
  }, [menuItems, indexPath]);
  return (
    <Box>
      {/* app bar */}
      <AppBar elevation={0} color="common">
        <Toolbar>
          <Typography sx={styles.title} variant="h5" component="h1">
            {title || (
              <IconButton onClick={() => history.push("/")}>
                <HomeIcon />
              </IconButton>
            )}
          </Typography>
          <SwitchDarkMode />
        </Toolbar>
      </AppBar>
      {/* content */}
      <Box sx={styles.page}>
        <Box sx={{ height: (theme) => theme.mixins.toolbar }}></Box>
        {children}
        <Box sx={{ height: (theme) => theme.mixins.toolbar }}></Box>
      </Box>
      {/* bottom navigation */}
      {title && (
        <BottomNavigation
          sx={styles.bottomNavigation}
          showLabels
          elevation={3}
          value={bottomVal}
          onChange={(_, newValue) => {
            setBottomVal(newValue);
          }}
        >
          {menuItems.map((item) => {
            return (
              <BottomNavigationAction
                key={item.text}
                button="true"
                onClick={() => history.push(item.path)}
                label={item.text}
                icon={item.icon}
              />
            );
          })}
        </BottomNavigation>
      )}
    </Box>
  );
}
