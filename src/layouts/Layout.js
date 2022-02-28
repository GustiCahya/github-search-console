import React from "react";
import {
  AppBar,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Toolbar,
  Typography,
  Switch,
  Tooltip
} from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import { useHistory, useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";

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
  }
};

const DarkModeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function Layout({ children }) {
  const [bottomVal, setBottomVal] = React.useState(0);
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const menuItems = React.useMemo(() => [
    {
      text: "Search",
      icon: <SearchIcon sx={styles.navIcon} color="grey"/>,
      path: "/",
    },
    {
      text: "Favorite",
      icon: <FavoriteIcon sx={styles.navIcon} color="grey"/>,
      path: "/liked",
    },
  ], []);
  const title = React.useMemo(() => {
    const pathname = location.pathname;
    const item = menuItems.find((item) => new RegExp(pathname, 'gi').test(item.path));
    return item?.text;
  }, [menuItems, location]);
  return (
    <Box>
      {/* app bar */}
      <AppBar elevation={0} color="common" position="relative">
        <Toolbar>
          <Typography sx={styles.title} variant="h5" component="h1">
            { title }
          </Typography>
          <Tooltip title={theme.palette.mode === "light" ? `Toggle dark mode` : `Toggle light mode`}>
            <DarkModeSwitch sx={{m: 1}} />
          </Tooltip>
        </Toolbar>
      </AppBar>
      {/* content */}
      <Box sx={styles.page}>
        {children}
      </Box>
      {/* bottom navigation */}
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
              button
              onClick={() => history.push(item.path)}
              label={item.text}
              icon={item.icon}
            />
          );
        })}
      </BottomNavigation>
    </Box>
  );
}
