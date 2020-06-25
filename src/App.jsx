import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import HomePage from "./pages/Home";

import DynamicNavRoute from "./components/DynamicNavRoute";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <DynamicNavRoute exact path="/" dynamic>
            <HomePage className="home" />
          </DynamicNavRoute>
          <DynamicNavRoute exact path="/foo">
            <div style={{ height: "500vh", paddingTop: "5rem" }}>
              Foo
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </DynamicNavRoute>
          <Route exact path="/bar">
            <div>Bar</div>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}
