import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Button, Modal } from "react-bootstrap";

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

export interface PeopleModalProps {
  show: boolean;
  onClose(): void;
  person_id: string;
}

const PeopleModal = ({ show, onClose, person_id }: PeopleModalProps) => {
  const { data } = useQuery<{ person?: any }>(PERSON_QUERY, {
    variables: {
      person_id: person_id,
    },
  });

  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>{data?.person?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Lives on {data?.person?.planet_name}, Population:{" "}
          {data?.person?.planet?.population}
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
