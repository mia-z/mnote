import React from 'react';
import { NavLink } from "react-router-dom";

const SidebarHeader = () => {
    return (
        <div className={"sidebar-header"}>
            <div className={"sidebar-title"}>
                miaz
            </div>
            <div className={"sidebar-sub-title"}>
                .xyz
            </div>
        </div>
    );
}

const SidebarBody = ({navItems}) => {
    return (
        <div className={"sidebar-body"}>
            {navItems.map((item, index) => (
                <NavLink to={item.to}>
                    <div className={"sidebar-nav-item"} key={item.name + index}>
                        <div className={"nav-item-icon"}><i className={item.icon} /></div>
                        <div className={"nav-item-text"}>{item.name}</div>
                    </div>
                </NavLink>
            ))}
        </div>
    );
}

const SidebarFooter = () => {
    return (
        <div className={"sidebar-footer"}>

        </div>
    );
}

export {
    SidebarHeader,
    SidebarBody,
    SidebarFooter
}
