const planets = require("./temp.json");
const fs = require("fs");

const people = require("./people.json");

const thePeople = () => {
  return people;
};

const thePlanets = (includeImages = false) =>
  planets.map((planet) => {
    let pic = null;
    if (includeImages) {
      try {
        const picture = fs.readFileSync(
          `../swapi-temp/${planet.fields.name.toLowerCase()}.jpg`
        );
        pic = new Buffer.from(picture).toString("base64");
      } catch {}
      try {
        const picture = fs.readFileSync(
          `../swapi-temp/${planet.fields.name.toLowerCase()}.png`
        );
        pic = new Buffer.from(picture).toString("base64");
      } catch {}
    }

    return {
      ...planet.fields,
      image: pic,
    };
  });

module.exports = {
  thePlanets,
  people,
};
