export type Planet = {
  _id: string;
  edited: string;
  climate: string;
  surface_water: string;
  name: string;
  diameter: string;
  rotation_period: string;
  created: string;
  terrain: string;
  gravity: string;
  orbital_period: string;
  population: string;
  image: string;
  people: Array<People>
};

export type Planets = {
  planetsList: Planet[],
  totalResults: number,
  totalPages: number
}

export type People = {
  person_id: string,
  name: string,
  planet_id: string
  planet_name: string
}
