import React from "react";
import {
    Box,
    Typography,
  } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';

const fillColor = (theme) => theme.palette.mode === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
const styles = {
    box: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: 'translate(-50%,-50%)',
      py: 5,
    },
    boxIcon: {
      fontSize: 36,
      color: fillColor,
      mb: "7px"
    },
    boxText: {
      fontSize: 14,
      maxWidth: 285,
      color: (theme) => theme.palette.common,
      lineHeight: "20px",
      fontFamily: "Jost",
    },
  };
  

export default function WelcomeLiked() {
  return (
    <Box sx={styles.box}>
      <PeopleIcon sx={styles.boxIcon} />
      <Typography sx={styles.boxText}>
        Once you like people, you'll see them here.
      </Typography>
    </Box>
  );
}
