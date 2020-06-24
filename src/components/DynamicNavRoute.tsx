import React from "react";
import { Route } from "react-router-dom";

import { Navbar, DynamicNavbar } from "./DynamicNavbar";

export default (props: any) => {
  return (
    <div>
      {props.dynamic ? <DynamicNavbar fixed={props.fixed} dynamic={props.dynamic} /> : <Navbar />}
      <Route path={props.path} exact={props.exact}>
        {props.children}
      </Route>
    </div>
  );
};

// I'm unsure why this is necessary - trying to render
// the dynamic vs fixed navbars through props failed as
// whichever prop is loaded first seems to get used for
// all components of that type? Switched to just using
// two slightly different components instead.
