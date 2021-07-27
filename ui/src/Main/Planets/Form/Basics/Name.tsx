import { gql, useApolloClient } from "@apollo/client";
import React from "react";
import { Form } from "react-bootstrap";

const Name = ({ id }: { id: string }) => {
  const onChange = (newName: string) => {};

  return (
    <Form.Group>
      <Form.Label>Name</Form.Label>
      <Form.Control
        type="text"
        placeholder={"Planet name"}
        value={"planet"}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form.Group>
  );
};

export default Name;
