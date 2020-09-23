const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('tiny'));

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
  {
    name: 'test',
    phone: '789',
    id: 5,
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  const info = `<p>Phonebook has info for ${persons.length} people</p>`;
  const reqTime = `<p>${new Date()}</p>`;
  res.send(info + reqTime);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    res.status(404).end();
  }
  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  console.log(persons);
  res.status(204).end();
});

const generateId = () => {
  const genLimit = 1000000;
  return Math.floor(Math.random() * genLimit) + 1;
};

app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing',
    });
  }
  console.log(persons);
  if (persons.find((person) => person.name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique',
    });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons.push(newPerson);
  res.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
