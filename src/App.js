import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Main from "./pages/Main";
import Liked from "./pages/Liked";
import UserDetail from "./pages/UserDetail";
import Layout from "./layouts/Layout";
import LayoutDetail from "./layouts/LayoutDetail";

const theme = createTheme({
  palette: {
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/liked">
              <Liked />
            </Route>
          </Switch>
        </Layout>
        <LayoutDetail>
          <Switch>
            <Route path="/users/:username">
              <UserDetail />
            </Route>
          </Switch>
        </LayoutDetail>
      </Router>
    </ThemeProvider>
  );
}
export default App;
