import React from 'react';

const SidebarHeader = () => {
    return (
        <div className={"header"}>
            <div className={"title"}>
                miaz
            </div>
            <div className={"sub-title"}>
                .xyz
            </div>
        </div>
    );
}

const SidebarBody = ({navItems}) => {
    return (
        <div className={"body"}>
            {navItems.map((item, index) => (
                <div className={"nav-item"} key={item.name + index}>
                    <div className={"icon"}><i className={item.icon} /></div>
                    <div className={"text"}>{item.name}</div>
                </div>
            ))}
        </div>
    );
}

const SidebarFooter = () => {
    return (
        <div className={"footer"}>

        </div>
    );
}

export {
    SidebarHeader,
    SidebarBody,
    SidebarFooter
}
