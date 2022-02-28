import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Main from "./pages/Main";
import Liked from "./pages/Liked";
import { purple } from "@mui/material/colors";
import Layout from "./layouts/Layout";

const theme = createTheme({
  palette: {
    secondary: purple
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout >
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/liked">
              <Liked />
            </Route>
            <Route path="/users/:username">
              <Main />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
export default App;
