import React from "react";
import { Container, Box, Typography, Link } from "@mui/material";
import Lottie from "lottie-react";
import notFound from "../assets/animations/notFound.json";

const styles = {
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  lottie: {
    width: 450,
  },
  text: {
    fontFamily: "Arsenal"
  }
};

export default function NotFound() {
  return (
    <Container>
      <Box
        sx={styles.box}
      >
        <Lottie 
          style={styles.lottie}
          animationData={notFound} 
          autoPlay={true} 
          loop={true} 
        />
        <Typography variant="h4" component="h2" sx={styles.text} gutterBottom>
          Sorry... Page Not Found
        </Typography>
        <Link sx={styles.text} href="/">
          back to home
        </Link>
      </Box>
    </Container>
  );
}
