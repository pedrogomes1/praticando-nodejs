const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const newRepo = { id:uuid(), title, url, techs, likes:0};

  repositories.push(newRepo);

  return response.json(newRepo)
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repository = repositories.findIndex(repo => repo.id === id)

  if(repository < 0) {
    return response.status(400).json('')
  }
  const newRepo = {
    title, url, techs, id, likes:0
  }
  repositories[repository] = newRepo;

  return response.json(newRepo);

});

app.delete("/repositories/:id", (request, response) => {
  
  const { id } = request.params;

  const repository = repositories.findIndex(repo => repo.id === id)

  if(repository < 0) {
    return response.status(400).json('')
  }

  repositories.splice(repository, 1);

  return response.status(204).json('');
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repo => repo.id === id);

  if(!repository) {
    return response.status(400).json({error: 'Repo não existe'});
  }

  repository.likes+=1;

  return response.json(repository);
});

module.exports = app;

//should not be able to like a repository that does not exist