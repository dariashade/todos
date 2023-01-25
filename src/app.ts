import express from 'express';
//const express = require('express'); // node js
import toDoRoutes from './routes/todos';
import { json } from 'body-parser';

const app = express();

app.use(json());

app.use('/todos', toDoRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

app.listen(3000);
