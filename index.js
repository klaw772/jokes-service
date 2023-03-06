const express = require('express');
const app = express();
const { Joke } = require('./db');
const { Op } = require("sequelize");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/jokes', async (req, res, next) => {
  try {
    const {tags, content} = req.query;
    let jokes = await Joke.findAll();
    if (tags) {
      jokes = await Joke.findAll({
        where: {tags: {
          [Op.substring]: tags
        }}
      });
    }
    else if (content) {
      jokes = await Joke.findAll({
        where: {joke: {
          [Op.substring]: content
        }}
      });
    }
      res.send(jokes);
  } catch (error) {
    console.error(error);
    next(error)
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
