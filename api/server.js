const express = require('express');

const Users = require('../users/users-model');

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  try {
    const users = await Users.getAll();
    if (users.length) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "No users were found." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The users information could not be retrieved." });
  }
});

server.post("/", async (req, res) => {
  const { name, department } = req.body;
  try {
    const user = await Users.insert({ name, department });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "The user could not be added." });
  }
});

server.delete('/', (req, res) => {
  return null;
});

module.exports = server;