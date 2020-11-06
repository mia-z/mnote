import React from 'react';
import { connect } from "react-redux";
import "./styles/base.scss";
import "normalize.css/normalize.css";
import { Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
import SidebarComponent from "./components/SidebarComponent";

const App = () => {
    return (
        <div className="root-container">
            <Switch>
                <Route exact path={"/"} render={() => <Home />} />
                <Route path={"/Home"} render={() => <Home />} />
                <Route path={"/Dashboard"} render={() => <Dashboard />} />
                <Route render={() => <NotFound />} />
            </Switch>
            <SidebarComponent />
        </div>
    );
}

export default connect()(App);
