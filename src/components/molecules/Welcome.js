import React from "react";
import {
    Box,
    Typography,
  } from "@mui/material";
import { ReactComponent as GithubLabel } from "../../assets/github-label.svg";
import GitHubIcon from "@mui/icons-material/GitHub";

const styles = {
    welcome: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "rgba(0,0,0,0.5)",
      position: "absolute",
      top: "53%",
      left: "50%",
      transform: 'translate(-50%,-50%)',
      py: 5,
    },
    welcomeIcon: {
      fontSize: 120,
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
      <GitHubIcon sx={styles.welcomeIcon} />
      <GithubLabel />
      <Typography sx={styles.welcomeText}>
        Enter GitHub username and search users matching the input like Google
        Search, click avatars to view more details, including repositories,
        followers and following.
      </Typography>
    </Box>
  );
}
