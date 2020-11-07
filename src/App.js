import React from 'react';
import { connect } from "react-redux";
import "./styles/base.scss";
import "normalize.css/normalize.css";
import {Switch, Route, Redirect} from "react-router-dom";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
import SidebarComponent from "./components/SidebarComponent";
import Header from "./components/Header";
import BreadCrumbs from "./components/BreadCrumbs";

const App = () => {
    return (
        <div className="root-container">
            <div className={"header-area"}>
                <Header />
                <BreadCrumbs />
            </div>
            <Switch>
                <Redirect exact path={"/"} to={"/Home"} />
                <Route path={"/Home"} render={() => <Home />} />
                <Route path={"/Dashboard"} render={() => <Dashboard />} />
                <Route path={"/NotFound"} render={() => <NotFound />} />
                <Redirect to={"/NotFound"} />
            </Switch>
            <SidebarComponent />
        </div>
    );
}

export default connect()(App);
