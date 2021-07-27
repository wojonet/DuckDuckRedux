import { gql, useApolloClient } from "@apollo/client";
import React from "react";
import { Form } from "react-bootstrap";

const PLANET_POPULATION_QUERY = gql`
  query getPlanetById($id: String) {
    planet(_id: $id) {
      population
    }
  }
`;

const Population = ({ id }: { id: string }) => {
  const client = useApolloClient();

  const data = client.readQuery({
    query: PLANET_POPULATION_QUERY,
    variables: { id },
  });

  const onChange = (newPopulation: string) => {
    client.writeQuery({
      query: PLANET_POPULATION_QUERY,
      data: {
        planet: {
          _id: id,
          population: newPopulation,
          __typename: "Planet",
        },
      },
      variables: { id },
    });
  };

  console.log("poulation rendered");
  return (
    <Form.Group>
      <Form.Label>Population</Form.Label>
      <Form.Control
        type="number"
        placeholder={"Population"}
        value={data?.planet?.population}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form.Group>
  );
};

export default Population;
