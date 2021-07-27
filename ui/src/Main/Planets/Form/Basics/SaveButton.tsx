import { gql, useApolloClient, useMutation } from "@apollo/client";
import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PlanetFields from "./PlanetFragment";

const UPDATE_PLANET_QUERY = gql`
  ${PlanetFields}

  mutation updatePlanet($id: String, $name: String!, $population: String!) {
    updatePlanet(_id: $id, planet: { name: $name, population: $population }) {
      ...PlanetFields
    }
  }
`;

const SaveButton = ({ id }: { id: string }) => {
  const history = useHistory();
  const client = useApolloClient();

  const [savePlanet] = useMutation(UPDATE_PLANET_QUERY);

  console.log("save rendered");

  const onSaveClick = () => {
    const planetInput = client.readFragment({
      id: `Planet:${id}`,
      fragment: gql`
        fragment PlanetInput on Planet {
          name
          population
        }
      `,
    });

    savePlanet({
      variables: {
        id,
        name: planetInput.name,
        population: planetInput.population,
      },
    });

    history.push("/");
  };

  return (
    <Button color="primary" onClick={() => onSaveClick()}>
      Save
    </Button>
  );
};

export default SaveButton;
