import { getDb } from "@/db/sqlite";
import { Task } from "@/models/Task";

export class TaskRepository {
  async getAllTasks(): Promise<Task[]> {
    const db = await getDb();
    return db.all<Task[]>("SELECT * FROM tasks");
  }

  async createTask(task: Omit<Task, "id">): Promise<Task> {
    const db = await getDb();
    const result = await db.run(
      "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)",
      [task.title, task.description, task.completed],
    );
    return {
      id: result.lastID as number,
      ...task,
    };
  }

  async updateTask(
    id: number,
    updates: Partial<Omit<Task, "id">>,
  ): Promise<Task | null> {
    const db = await getDb();

    // Get the existing task
    const existing = await db.get<Task>("SELECT * FROM tasks WHERE id = ?", [
      id,
    ]);
    if (!existing) return null;

    const updated = {
      ...existing,
      ...updates,
    };

    await db.run(
      "UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?",
      [updated.title, updated.description, updated.completed, id],
    );

    return { ...updated };
  }

  async deleteTask(id: number): Promise<boolean> {
    const db = await getDb();
    const result = await db.run("DELETE FROM tasks WHERE id = ?", [id]);
    return result.changes != undefined && result.changes > 0;
  }
}
