import React from "react";
import {
    Box,
    Typography,
  } from "@mui/material";
import { ReactComponent as GithubLogo } from "../../assets/images/github-logo.svg";
import { ReactComponent as GithubLabel } from "../../assets/images/github-label.svg";

const fillColor = (theme) => theme.palette.mode === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
const styles = {
    welcome: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: fillColor,
      py: 5,
      "& *": {
        fill: fillColor,
      }
    },
    welcomeIcon: {
      width: 120
    },
    welcomeIconText: {
      width: 139,
      marginTop: 15,
      marginBottom: 13,
    },
    welcomeText: {
      fontSize: 14,
      maxWidth: 285,
      lineHeight: "20px",
      fontFamily: "Jost",
    },
  };
  

export default function Welcome() {
  return (
    <Box sx={styles.welcome}>
      <GithubLogo style={styles.welcomeIcon} />
      <GithubLabel style={styles.welcomeIconText} fill="red" />
      <Typography sx={styles.welcomeText}>
        Enter GitHub username and search users matching the input like Google
        Search, click avatars to view more details, including repositories,
        followers and following.
      </Typography>
    </Box>
  );
}
