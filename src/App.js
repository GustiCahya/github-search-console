import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Main from "./pages/Main";
import Liked from "./pages/Liked";
import UserDetail from "./pages/UserDetail";
import Layout from "./layouts/Layout";

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
            <Route exact path="/" component={Main} />
            <Route exact path="/liked" component={Liked} />
            <Route exact path="/users/:username" component={UserDetail} />
            <Route path="/*" component={() => (
              <div>Not Found</div>
            )} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
export default App;
