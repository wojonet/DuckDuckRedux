const express = require("express");
const cors = require("cors");
const expressQl = require("express-graphql");
const { buildSchema } = require("graphql");
const {
  test,
  insertPlanets,
  deletePlanets,
  insertPeople,
  getPerson,
  getPlanets,
  getPlanet,
  deletePlanet,
  updatePlanet,
  updatePerson,
} = require("./mongo");
const { thePlanets, people } = require("./tempPopulate");

// Initialize a GraphQL schema
const schema = buildSchema(`
  type Mutation {
    deletePlanet(_id: String): String
    updatePlanet(_id: String, planet: PlanetInput): Planet
    updatePerson(_id: String, person: PersonInput): People
  },
  input PlanetInput {
    name: String!
    population: String!
  },
  input PersonInput {
    name: String!
  }
  type Query {
    hello: String
    planets(page: Int, pageSize: Int): Planets
    planet(_id: String): Planet
    person(person_id: String): People
  },
  type Planets {
    planetsList: [Planet]
    totalResults: Int
    totalPages: Int
  },
  type Planet {
      _id: ID
      edited: String!
      climate: String
      surface_water: String
      name: String!
      diameter: String
      rotation_period: String
      created: String!
      terrain: String
      gravity: String
      orbital_period: String
      population: String
      image: String
      people: [People]
  },
  type People {
    person_id: ID
    name: String!
    planet_id: String
    planet_name: String
  }
`);

// Root resolver
const root = {
  hello: () => "Hello world!",
  planets: async ({ page, pageSize }) => {
    const { planets, totalResults } = await getPlanets(page, pageSize);
    const result = {
      totalResults: totalResults,
      totalPages: Math.ceil(totalResults / pageSize),
      planetsList: planets,
    };
    return result;
  },
  planet: async ({ _id }) => await getPlanet(_id),
  deletePlanet: async ({ _id }) => {
    await deletePlanet(_id);
    return "as";
  },
  updatePlanet: async ({ _id, planet }) => await updatePlanet(_id, planet),
  updatePerson: async ({ _id, person }) => await updatePerson(_id, person),
  person: async ({ person_id }) => await getPerson(person_id),
};

// Create an express server and a GraphQL endpoint
const app = express();
// people insert
//insertPeople(people);

//delete
//deletePlanets();

// insert
// const planets = thePlanets();
// insertPlanets(planets);

app.use(cors());

app.use(
  "/graphql",
  expressQl.graphqlHTTP({
    schema: schema, // Must be provided
    rootValue: root,
    graphiql: true, // Enable GraphiQL when server endpoint is accessed in browser
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
