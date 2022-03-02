import React from "react";
import {
    Box,
    Typography,
  } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from "react-redux";

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
  

export default function SearchNotFound({ search }) {
  return (
    <Box sx={styles.box}>
      <SearchIcon sx={styles.boxIcon} />
      <Typography sx={styles.boxText}>
        No search result found for
      </Typography>
      <Typography sx={{...styles.boxText, fontWeight: 'bold'}}>
        { search }
      </Typography>
    </Box>
  );
}
