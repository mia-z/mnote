import React, { useState } from 'react';
import "../styles/sidebar.scss";
import SidebarSummoner from "./SidebarSummoner";
import { SidebarHeader, SidebarBody, SidebarFooter } from "./SidebarContents";

const navItems = [
    { name: "Home", icon: "fas fa-home", localOverride: null, to: "/Home" },
    { name: "Notes", icon: "fas fa-sticky-note", localOverride: null, to: "/Notes" },
    { name: "Snippets", icon: "fas fa-code", localOverride: null, to: "/Snippets" },
    { name: "Projects", icon: "fas fa-pager", localOverride: null, to: "/Projects" },
    { name: "Experience", icon: "fas fa-lightbulb", localOverride: null, to: "/Experience" },
    { name: "About", icon: "fas fa-info-circle", localOverride: null, to: "/About" },
    { name: "Peep", icon: "fas fa-sad-tear", localOverride: null, to: "/Peep" },
];

const SidebarComponent = () => {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleOpenClick = () => open ? setOpen(false) : setOpen(true);

    const handleRootHide = () => {
        if (open)
            setVisible(true);
        else
            setVisible(false);
    }

    const handleFadedAreaClick = (e) => {
        e.persist();
        if (e.target.classList.contains("sidebar-container") && visible)
            setOpen(false);
    }

    return (
        <div className={"sidebar-root"}>
            <SidebarSummoner open={open} handleOpenClick={handleOpenClick} />
            <div className={`sidebar-container ${open ? "open" : ""} ${visible ? "visible" : ""}`} onClick={(e) => handleFadedAreaClick(e)} >
                <div className={`sidebar ${open ? "open" : ""}`} onTransitionEnd={() => handleRootHide()}>
                    <SidebarHeader />
                    <SidebarBody navItems={navItems} />
                    <SidebarFooter />
                </div>
            </div>
        </div>
    );
}

export default SidebarComponent;
