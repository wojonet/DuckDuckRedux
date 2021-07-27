import { from, gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const PERSON_QUERY = gql`
  query getPerson($person_id: String) {
    person(person_id: $person_id) {
      name
      planet_name
      planet_id
      person_id
      planet @client {
        population
        name
      }
    }
  }
`;

const PERSON_MUTATION = gql`
  mutation updatePersonName($id: String, $name: String!) {
    updatePerson(_id: $id, person: { name: $name }) {
      person_id
      name
      planet_id
    }
  }
`;

export interface PeopleModalProps {
  show: boolean;
  onClose(): void;
  person_id: string;
}

const PeopleModal = ({ show, onClose, person_id }: PeopleModalProps) => {
  const [name, setName] = useState("");

  const { data } = useQuery<{ person?: any }>(PERSON_QUERY, {
    variables: {
      person_id: person_id,
    },
  });

  const [updatePerson] = useMutation(PERSON_MUTATION);

  useEffect(() => {
    if (data) {
      setName(data.person.name);
    }
  }, [data]);

  const onSave = () => {
    updatePerson({
      variables: {
        id: person_id,
        name: name,
      },
    });
    onClose();
  };

  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>{data?.person?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Lives on {data?.person?.planet_name}, Population:{" "}
          {data?.person?.planet?.population}
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={onSave}>Update</Button>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PeopleModal;
