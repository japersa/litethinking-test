import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Person from "./pages/Person";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Person} />
      <Route path="*" component={Person} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
