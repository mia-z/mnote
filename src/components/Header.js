import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.scss";

const Header = () => {
    return(
        <div className={"header"}>
            <div className={"header-text"}>
                <NavLink to={"/"} className={"cursive"}>miaz</NavLink>
                <div className={"mono"}>[.<span className={"title-x"}>x</span><span className={"title-y"}>y</span><span className={"title-z"}>z</span>]</div>
            </div>
        </div>
    );
}

export default Header;
