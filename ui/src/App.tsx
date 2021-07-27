import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PlanetsForm from "./Main/Planets/Form/PlanetsForm";
import Planets from "./Main/Planets/Planets";
import NavBar from "./Nav/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Container fluid>
        <Switch>
          <Route path="/planet/:id" exact>
            <PlanetsForm />
          </Route>
          <Route path="/">
            <Planets />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
