import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./views/login";
import { Web3ContextProvider } from "./context/Web3Context";
import Register from "./views/register";
import Home from "./views/home";
import Initialization from "./views/initialization";
import "./App.css";
import "./style/resetAntd.scss";

function App() {
  return (
    <Suspense>
      <Web3ContextProvider>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            <Route path="/initialization" component={Initialization} />
            <Redirect to="/initialization" />
          </Switch>
        </Router>
      </Web3ContextProvider>
    </Suspense>
  );
}

export default App;
