import { gql } from "@apollo/client";

export default gql`
  fragment PlanetFields on Planet {
    _id
    edited
    climate
    surface_water
    name
    diameter
    rotation_period
    created
    terrain
    gravity
    orbital_period
    population
    image
    people {
      person_id
      planet_id
      planet_name
    }
  }
`;
