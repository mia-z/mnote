import React from 'react';

const SidebarSummoner = ({open, handleOpenClick}) => {
    return(
        <div className={`sidebar-button outer ${open ? "open" : ""}`} onClick={() => handleOpenClick()}>
            <div className={"bar"}>&nbsp;</div>
            <div className={"bar"}>&nbsp;</div>
            <div className={"bar"}>&nbsp;</div>
        </div>
    );
}

export default SidebarSummoner;
