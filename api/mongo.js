const { MongoClient, ObjectID } = require("mongodb");
const secrets = require("./secrets.json");
const config = require("./config.json");

const uri = `mongodb+srv://${secrets.mongoUser}:${secrets.mongoPassword}@${config.mongoServer}/${config.mongoInstance}?retryWrites=true&w=majority`;

const test = () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    const collection = client
      .db(config.mongoDatabase)
      .collection(config.mongoCollection);
    collection
      .findOne({
        msg: "hi",
      })
      .then((data) => console.log(data))
      .finally(() => client.close());
  });
};

const insertPlanets = (planets) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    const collection = client
      .db(config.mongoDatabase)
      .collection(config.mongoCollection);
    collection.insertMany(planets).finally(() => client.close());
  });
};

const insertPeople = async (people) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  const planetCollection = client
    .db(config.mongoDatabase)
    .collection(config.mongoCollection);
  const peopleCollection = client.db(config.mongoDatabase).collection("people");

  await Promise.all(
    people.map(async (person) => {
      const planet = await planetCollection.findOne({
        name: person.planet_name,
      });
      person.planet_id = planet._id;
      await peopleCollection.insertOne(person);
    })
  );

  await client.close();
};

const deletePlanets = () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    const collection = client
      .db(config.mongoDatabase)
      .collection(config.mongoCollection);
    collection.deleteMany().finally(() => client.close());
  });
};

const getPlanet = async (_id) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  const collection = client
    .db(config.mongoDatabase)
    .collection(config.mongoCollection);

  const planet = await collection.findOne({ _id: new ObjectID(_id) });

  client.close();

  return planet;
};

const getPerson = async (person_id) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  const collection = client.db(config.mongoDatabase).collection("people");

  const person = await collection.findOne({ _id: new ObjectID(person_id) });

  person.person_id = person._id;
  delete person._id;

  client.close();

  return person;
};

const getPlanets = async (page = 0, pageSize = 25) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  const collection = client
    .db(config.mongoDatabase)
    .collection(config.mongoCollection);

  let planets = [];
  const pltCursor = collection.find(
    {},
    {
      limit: pageSize,
      skip: page * pageSize,
    }
  );
  await pltCursor.forEach((doc) => {
    doc.people = [];
    const peopleCollection = client
      .db(config.mongoDatabase)
      .collection("people");
    const pplCursor = peopleCollection.find({ planet_id: ObjectID(doc._id) });
    pplCursor.forEach((person) => {
      person.person_id = person._id;
      delete person._id;
      doc.people.push(person);
    });
    planets.push(doc);
  });

  const totalResults = await collection.countDocuments();

  await client.close();
  return { planets, totalResults };
};

const deletePlanet = async (id) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  const collection = client
    .db(config.mongoDatabase)
    .collection(config.mongoCollection);

  await collection.deleteOne({ _id: new ObjectID(id) });

  client.close();
};

const updatePerson = async (id, person) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  const collection = client.db(config.mongoDatabase).collection("people");

  await collection.updateOne(
    { _id: new ObjectID(id) },
    {
      $set: {
        name: person.name,
      },
    }
  );

  const updatedPerson = await collection.findOne({ _id: new ObjectID(id) });
  updatedPerson.person_id = updatedPerson._id;
  delete updatedPerson._id;

  await client.close();

  return updatedPerson;
};

const updatePlanet = async (id, planet) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  const collection = client
    .db(config.mongoDatabase)
    .collection(config.mongoCollection);

  await collection.updateOne(
    { _id: new ObjectID(id) },
    {
      $set: {
        name: planet.name,
        population: planet.population,
      },
    }
  );

  const updatedPlanet = await collection.findOne({ _id: new ObjectID(id) });

  updatedPlanet.people = [];
  const peopleCollection = client.db(config.mongoDatabase).collection("people");
  const pplCursor = peopleCollection.find({ planet_id: ObjectID(id) });

  await pplCursor.forEach((person) => {
    person.person_id = person._id;
    delete person._id;
    updatedPlanet.people.push(person);
  });

  await client.close();

  return updatedPlanet;
};

module.exports = {
  test,
  insertPlanets,
  deletePlanets,
  getPlanets,
  getPlanet,
  updatePlanet,
  updatePerson,
  deletePlanet,
  insertPeople,
  getPerson,
};
