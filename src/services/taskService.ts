import { TaskRepository } from "@/repositories/taskRepository";
import { Task } from "@/models/Task";

export class TaskService {
  constructor(private repository: TaskRepository = new TaskRepository()) {}

  getTasks(): Promise<Task[]> {
    return this.repository.getAllTasks();
  }

  createTask(title: string, description: string | null): Promise<Task> {
    return this.repository.createTask({
      title,
      description,
      completed: false,
    });
  }

  updateTask(
    id: number,
    updates: Partial<Omit<Task, "id">>,
  ): Promise<Task | null> {
    return this.repository.updateTask(id, updates);
  }

  deleteTask(id: number): Promise<boolean> {
    return this.repository.deleteTask(id);
  }
}
