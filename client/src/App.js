import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/views/NavBar/NavBar";
import RandingPage from "./components/views/RandingPage/RandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import authHOC from "./hoc/authHOC";

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/" component={authHOC(RandingPage, null)}></Route>
        <Route path="/login" component={authHOC(LoginPage, false)}></Route>
        <Route
          path="/register"
          component={authHOC(RegisterPage, false)}
        ></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
