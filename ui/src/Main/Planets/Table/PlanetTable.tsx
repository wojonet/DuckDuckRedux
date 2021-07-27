import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { Button, Pagination, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Planets } from "../../../Types/Planet";
import defaultPlanet from "./defaultPlanet";
import PeopleModal from "./PeopleModal";
import {
  ImageCell,
  NumericCell,
  PlanetsBody,
  PlanetsHeader,
} from "./PlanetTable.styles";

const PLANETS_QUERY = gql`
  query getPlanets($page: Int, $pageSize: Int) {
    planets(page: $page, pageSize: $pageSize) {
      planetsList {
        _id
        climate
        name
        terrain
        gravity
        population
        image
        people {
          person_id
          name
        }
      }
      totalPages
      totalResults
    }
  }
`;

const PlanetsTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPersonId, setModalPersonId] = useState("");

  const { data } = useQuery<{ planets: Planets }>(PLANETS_QUERY, {
    variables: {
      page: currentPage,
      pageSize: 10,
    },
  });

  const showModal = (person_id: string) => {
    setModalPersonId(person_id);
    setModalOpen(true);
  };

  return (
    <>
      <Table striped bordered hover>
        <PlanetsHeader className="text-monospace bg-white">
          <tr>
            <td colSpan={2}>Planet</td>
            <td>Population</td>
            <td>Gravity</td>
            <td>Climate</td>
            <td>Terrain</td>
            <td>People</td>
          </tr>
        </PlanetsHeader>
        <PlanetsBody>
          {data?.planets.planetsList.map((planet) => (
            <tr key={planet._id}>
              <td>
                {planet.image ? (
                  <ImageCell
                    src={`data:image/png;base64,${planet.image}`}
                    alt={`View of ${planet.name} from space`}
                  />
                ) : (
                  <ImageCell
                    src={`data:image/png;base64,${defaultPlanet}`}
                    alt={`View of ${planet.name} from space`}
                  />
                )}
              </td>
              <td>
                <Link to={`/planet/${planet._id}`}>{planet.name}</Link>
              </td>
              <NumericCell>{planet.population}</NumericCell>
              <td>{planet.gravity}</td>
              <td>{planet.climate}</td>
              <td>{planet.terrain}</td>
              <td>
                {planet.people.map((person) => (
                  <Button
                    key={person.person_id}
                    onClick={() => showModal(person.person_id)}
                  >
                    {person.name}
                  </Button>
                ))}
              </td>
            </tr>
          ))}
        </PlanetsBody>
      </Table>
      <Pagination size="lg">
        {Array.from({ length: data?.planets.totalPages || 1 }).map((_, idx) => (
          <Pagination.Item
            key={idx}
            active={currentPage === idx}
            onClick={() => setCurrentPage(idx)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      {modalOpen && (
        <PeopleModal
          show={modalOpen}
          person_id={modalPersonId}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default PlanetsTable;
