const express = require('express');
const cors = require('cors');
const { tasksRouter } = require('../routes');

// ...

const app = express();
app.use(cors());

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/', tasksRouter);

// ...

module.exports = app;