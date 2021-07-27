import styled from "styled-components";

export const PlanetsHeader = styled.thead`
  text-transform: uppercase;
  font-size: 0.7em;
  white-space: nowrap;
  text-align: center;
  th {
    min-width: 5em;
  }
`;

export const PlanetsBody = styled.tbody`
  font-size: 0.8em;
  td {
    white-space: nowrap;
  }
`;

export const ImageCell = styled.img`
  max-height: 7em;
  border-radius: 0.5em;
`;

export const NumericCell = styled.td`
  text-align: center;
`;
