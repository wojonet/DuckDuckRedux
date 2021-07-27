import React from "react";
import { Container } from "react-bootstrap";
import PlanetsForm from "./Form/PlanetsForm";
import PlanetsTable from "./Table/PlanetTable";

const Planets = () => {
  return (
    <Container fluid>
      <h1>Galatic Planets</h1>
      <PlanetsTable />
    </Container>
  );
};

export default Planets;
