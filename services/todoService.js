import { TodoRepo } from "@/repositories/todoRepository.js";
import { UserRepo } from "@/repositories/userRepository.js";
import { prisma } from "@/lib/db.js";

export class TodoService {
  static validateTodoInput(data) {
    if (!data.title || data.title.trim().length === 0) {
      throw new Error("Title is required!.");
    }
    if (data.title.length > 255) {
      throw new Error("Title must be less than 255  characters.");
    }
    if (data.priority && !["low", "medium", "high"].includes(data.priority)) {
      throw new Error("Invalid priority.");
    }
  }
  static async createTodo(userId, todoData) {
    this.validateTodoInput(todoData);
    const user = await UserRepo.getById(userId);
    if (!user) {
      throw new Error("user not found");
    }
    return await TodoRepo.create({
      title: todoData.title,
      description: todoData.description || null,
      priority: todoData.priority || "medium",
      dueDate: todoData.dueDate ? new Date(todoData.dueDate) : null,
      userId,
    });
  }
  static async getTodo(todoId, userId) {
    const todo = await TodoRepo.getById(todoId);
    if (!todo) {
      throw new Error("Todo not found!");
    }
    if (todo.userId !== userId) {
      throw new Error("Unauthorized");
    }
    return todo;
  }
  static async getUserTodos(userId, filters = {}) {
    return await TodoRepo.getByUserId(userId, filters);
  }
  static async updateTodo(todoId, userId, updateData) {
    const todo = await this.getTodo(todoId, userId);
    if (updateData.title) {
      this.validateTodoInput({ title: updateData.title });
    }
    return await TodoRepo.update(todo.id, updateData);
  }
  static async toggleTodo(todoId, userId) {
    const todo = await this.getTodo(todoId, userId);
    return await TodoRepo.update(todoId, { completed: !todo.completed });
  }
  static async deleteTodo(todoId, userId) {
    await this.getTodo(todoId, userId);
    await TodoRepo.delete(todoId);
    return {
      mesage: "TODO deleted.",
    };
  }
  static async getStats(userId) {
    const total = await TodoRepo.count(userId);
    const completed = await TodoRepo.countCompleted(userId);
    return {
      total,
      completed,
      remaining: total - completed,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }
}
