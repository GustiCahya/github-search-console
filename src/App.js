import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import Main from "./pages/Main";
import Liked from "./pages/Liked";
import UserDetail from "./pages/UserDetail";
import Layout from "./layouts/Layout";
import NotFound from "./pages/NotFound";

function App() {
  const themeState = useSelector((state) => state.theme);
  const theme = React.useMemo(() => createTheme(themeState), [themeState]);
  React.useEffect(() => {
    if(theme){
      document.body.style.backgroundColor = theme.palette.mode === "dark" ? theme.palette.grey[900] : "white";
      document.body.style.color = theme.palette.mode === "dark" ? "white" : "black";
    }
  }, [theme]);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/liked" component={Liked} />
            <Route exact path="/users/:username" component={UserDetail} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
export default App;
