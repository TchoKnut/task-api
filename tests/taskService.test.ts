import { describe, it, expect, vi, beforeEach } from "vitest";
import { TaskService } from "@/services/taskService";
import { TaskRepository } from "@/repositories/taskRepository";
import { Task } from "@/models/Task";

describe("TaskService", () => {
  let service: TaskService;
  let repository: TaskRepository;

  const mockTasks: Task[] = [
    { id: 1, title: "Task 1", description: "Desc 1", completed: false },
    { id: 2, title: "Task 2", description: "Desc 2", completed: true },
  ];

  beforeEach(() => {
    repository = {
      getAllTasks: vi.fn().mockResolvedValue(mockTasks),
      createTask: vi
        .fn()
        .mockImplementation((task) => Promise.resolve({ id: 3, ...task })),
      updateTask: vi
        .fn()
        .mockImplementation((id, updates) =>
          Promise.resolve({ id, ...updates }),
        ),
      deleteTask: vi.fn().mockResolvedValue(true),
    } as unknown as TaskRepository;

    service = new TaskService(repository);
  });

  it("should get all tasks", async () => {
    // Act
    const tasks = await service.getTasks();

    // Assert
    expect(tasks).toEqual(mockTasks);
    expect(repository.getAllTasks).toHaveBeenCalled();
  });

  it("should create a new task", async () => {
    // Arrange
    const title = "New Task";
    const description = "New Desc";

    // Act
    const task = await service.createTask(title, description);

    // Assert
    expect(task).toMatchObject({ title, description, completed: false });
    expect(repository.createTask).toHaveBeenCalledWith({
      title,
      description,
      completed: false,
    });
  });

  it("should update a task", async () => {
    // Arrange
    const updates = { title: "Updated", completed: true };

    // Act
    const updatedTask = await service.updateTask(1, updates);

    // Assert
    expect(updatedTask).toMatchObject({ id: 1, ...updates });
    expect(repository.updateTask).toHaveBeenCalledWith(1, updates);
  });

  it("should delete a task", async () => {
    // Act
    const result = await service.deleteTask(1);

    // Assert
    expect(result).toBe(true);
    expect(repository.deleteTask).toHaveBeenCalledWith(1);
  });
});
