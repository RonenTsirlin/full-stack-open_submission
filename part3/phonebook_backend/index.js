const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3001;

app.use(express.json());

morgan.token("body", (request) => {
  return JSON.stringify(request.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const generateID = () => {
  return Math.floor(Math.random() * 100_000_000) + 1;
};

let people = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Backend Phonebook App</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(people);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = people.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).send("404 Person does not exist");
  }
});

app.post("/api/persons", (request, response) => {
  body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  if (people.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  do {
    generatedID = generateID();
  } while (people.find((person) => person.id === generatedID));

  const person = {
    id: generatedID,
    name: body.name,
    number: body.number,
  };

  people = people.concat(person);

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  people = people.filter((person) => person.id !== id);

  response.status(204).end();
});

app.get("/info", (request, response) => {
  const timeReceived = new Date().toString();
  response.send(`
    <p>Phonebook has info for ${people.length} people</p>
    <p>${timeReceived}</p>
    
`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
