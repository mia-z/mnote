import React from 'react';
import "../styles/notfound.scss";

const NotFound = () => {
    return (
        <div className={"four-oh-four"}>
            <div className={"left"}>
                <img src={"./img/pepehandspng.png"}  alt={"pepe hands!!!!"}/>
            </div>
            <div className={"right"}>
                <div className={"notfound-title"}>
                    404 - Not found :(
                </div>
                <hr/>
                <div className={"notfound-text"}>
                    The page you navigated to wasn't found<br/>
                    (Or it doesn't exist yet!)
                </div>
            </div>
        </div>
    );
}

export default NotFound;
