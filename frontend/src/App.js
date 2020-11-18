/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import React from "react";

import "./assets/css/icons-admin.min.css";
import "./assets/css/bootstrap-admin.min.css";
import "./assets/css/style.css";
import "./assets/fonts/icomoon/style.css";
import $ from "jquery";
import Main from "./containers/main/main";
import MainAdmin from "./containers/admin/mainadmin/main-admin";
import { Route, Switch, Router } from "react-router-dom";
import history from "./history";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/admin" component={MainAdmin} />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
