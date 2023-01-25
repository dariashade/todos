import { RequestHandler } from 'express';
import { ToDo } from '../models/todo';

const TODOS: ToDo[] = [];

export const createToDo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new ToDo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: 'Created the todo.', createToDo: newTodo });
};

export const getToDos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos: TODOS });
};

export const updateToDo: RequestHandler<{ id: string }> = (req, res, next) => {
  const toDoId = req.params.id;
  const text = (req.body as { text: string }).text;
  const toDoIndex = TODOS.findIndex(el => el.id === toDoId);

  if (toDoIndex < 0) {
    throw new Error('Could not find todo!');
  }

  TODOS[toDoIndex] = new ToDo(TODOS[toDoIndex].id, text);

  res
    .status(200)
    .json({ message: 'Updated the todo.', updatedToDo: TODOS[toDoIndex] });
};

export const deleteToDo: RequestHandler<{ id: string }> = (req, res, next) => {
  const toDoId = req.params.id;
  const toDoIndex = TODOS.findIndex(el => el.id === toDoId);

  if (toDoIndex < 0) {
    throw new Error('Could not find todo!');
  }

  TODOS.splice(toDoIndex, 1);

  res.status(200).json({ message: 'Deleted.' });
};
