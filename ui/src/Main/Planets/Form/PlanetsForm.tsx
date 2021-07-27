import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { Planet } from "../../../Types/Planet";
import DeleteButton from "./Basics/DeleteButton";
import Name from "./Basics/Name";
import Population from "./Basics/Population";
import SaveButton from "./Basics/SaveButton";
import { ButtonContainer, FormContainer } from "./PlanetsForm.styles";

const PLANET_QUERY = gql`
  query getPlanetById($id: String) {
    planet(_id: $id) {
      _id
      climate
      name
      terrain
      gravity
      population
      image
      diameter
      rotation_period
      created
      orbital_period
      edited
      surface_water
    }
  }
`;

const Form = () => {
  const { id } = useParams<{ id: string }>();

  useQuery<{ planet: Planet }>(PLANET_QUERY, {
    variables: {
      id: id,
    },
  });

  console.log("form rendered");

  return (
    <>
      <h1>Edit Planetname</h1>
      <FormContainer>
        <Name id={id} />
        <Population id={id} />
        <ButtonContainer>
          <SaveButton id={id} />
          <DeleteButton id={id} />
        </ButtonContainer>
      </FormContainer>
    </>
  );
};

export default Form;
