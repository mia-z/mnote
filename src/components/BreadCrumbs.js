import React from "react";
import { useHistory } from "react-router";

const BreadCrumbs = () => {
    const history = useHistory();
    console.log(history);
    return(
      <div className={"breadcrumbs"}>&nbsp;</div>
    );
}

export default BreadCrumbs;
