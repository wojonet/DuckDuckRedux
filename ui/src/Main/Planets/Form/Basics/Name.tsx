import { gql, useApolloClient } from "@apollo/client";
import React from "react";
import { Form } from "react-bootstrap";

const NAME_FRAGMENT = gql`
  fragment PlanetName on Planet {
    name
  }
`;

const Name = ({ id }: { id: string }) => {
  const client = useApolloClient();

  const planet = client.readFragment({
    id: `Planet:${id}`,
    fragment: NAME_FRAGMENT,
  });

  const onChange = (newName: string) => {
    client.writeFragment({
      id: `Planet:${id}`,
      fragment: NAME_FRAGMENT,
      data: {
        name: newName,
      },
    });
  };

  return (
    <Form.Group>
      <Form.Label>Name</Form.Label>
      <Form.Control
        type="text"
        placeholder={"Planet name"}
        value={planet?.name}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form.Group>
  );
};

export default Name;
