import { Request, Response } from "express";
import { TaskService } from "@/services/taskService";
import { ErrorModel } from "@/models/ErrorModel";

const service = new TaskService();

export const getTasks = async (_: Request, response: Response) => {
  const tasks = await service.getTasks();
  response.json(tasks);
};

export const createTask = async (request: Request, response: Response) => {
  const { title, description } = request.body;

  if (!title) {
    response.status(400).json(new ErrorModel(400, "Title required"));
  } else {
    const task = await service.createTask(title, description);
    response.status(201).json(task);
  }
};

export const updateTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { title, description, completed } = request.body;

  if (!title && completed === undefined) {
    response
      .status(400)
      .json(new ErrorModel(400, "Title or completed status required"));
  } else {
    const task = await service.updateTask(parseInt(id), {
      title,
      description,
      completed,
    });
    if (task) {
      response.json(task);
    } else {
      response.status(404).json({ error: "Task not found" });
    }
  }
};

export const deleteTask = async (request: Request, response: Response) => {
  const { id } = request.params;

  const deleted = await service.deleteTask(parseInt(id));
  if (deleted) {
    response.status(204).send();
  } else {
    response.status(404).json(new ErrorModel(404, "Task not found"));
  }
};
