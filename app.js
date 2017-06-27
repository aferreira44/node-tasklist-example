'use strict';

const config = require('config');
const util = require('util');
const bodyParser = require('body-parser');
const express = require('express');
const _ = require('lodash');

const app = express();
app.use(bodyParser.json());

let taskList = [];

// GET /list : Retrieve all task items
app.get('/list', (req, res) => {
  res.send(taskList);
});

// POST /task : Insert a task
app.post('/task', [validationMiddleware, (req, res) => {
  const task = req.body.task;
  taskList.push(task);
  res.send(taskList);
}]);

// PUT /task/:task_index : Remove a task
app.put('/task/:task_index', [validationMiddleware, (req, res) => {
  const taskIndex = req.params.task_index;
  taskList[taskIndex] = req.body.task
  res.send(taskList);
}]);

// DELETE /task/:task_index : Remove a task
app.delete('/task/:task_index', (req, res) => {
  const taskIndex = req.params.task_index;
  taskList.splice(taskIndex, 1);
  res.send(taskList);
});

app.listen(config.port, () => {
  util.log('Running server on localhost:' + config.port);
});

function validationMiddleware(req, res, next) {
  if (_.isEmpty(req.body.task)) {
    return res
      .status(422)
      .send("Task is empty");
  }
  return next();
};