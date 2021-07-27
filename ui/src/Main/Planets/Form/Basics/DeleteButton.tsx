import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const DELETE_QUERY = gql`
  mutation removePlanet($id: String) {
    deletePlanet(_id: $id)
  }
`;

const DeleteButton = ({ id }: { id: string }) => {
  const history = useHistory();

  const [deletePlanet] = useMutation(DELETE_QUERY, {
    variables: {
      id: id,
    },
  });

  console.log("delete rendered");

  const onDeleteClick = () => {
    deletePlanet();
    history.push("/");
  };

  return (
    <Button variant="danger" onClick={() => onDeleteClick()}>
      Wipe them out...All of them
    </Button>
  );
};

export default DeleteButton;
