import React from 'react'
import { Box, Typography, Link } from "@mui/material";
import Lottie from "lottie-react";
import sad from "../assets/animations/sad.json";

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
    width: 350,
  },
  text: {
    fontFamily: "Arsenal"
  }
};

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: '', info: '', stack: '' }
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      // logErrorToMyService(error, errorInfo)
      this.setState({error, info: errorInfo, stack: error.stack})
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <Box
            sx={styles.box}
          >
            <Lottie 
              style={styles.lottie}
              animationData={sad} 
              autoPlay={true} 
              loop={true} 
            />
            <Typography variant="h4" component="h2" sx={styles.text} gutterBottom>
              Something went wrong!
            </Typography>
            <Link sx={styles.text} href="/">
              back to home
            </Link>
          </Box>
        );
      }
  
      return this.props.children; 
    }
}

export default ErrorBoundary
