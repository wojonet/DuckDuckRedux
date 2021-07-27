import { gql, useApolloClient } from "@apollo/client";
import React from "react";
import { Form } from "react-bootstrap";

const Population = ({ id }: { id: string }) => {
  const onChange = (newPopulation: string) => {};

  console.log("poulation rendered");
  return (
    <Form.Group>
      <Form.Label>Population</Form.Label>
      <Form.Control
        type="number"
        placeholder={"Population"}
        value={"1000"}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form.Group>
  );
};

export default Population;
