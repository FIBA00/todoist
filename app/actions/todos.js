// server actions

// **Note on auth:**  For now, hardcode a test user
// so you can actually run the app; swap in real auth later.

"use server";

import { TodoService } from "@/services/todoService.js";
import { prisma } from "@/lib/db.js";

// TEMP:
async function getCurrentUser() {
  let user = await prisma.user.findFirst({
    where: { email: "test@exammple.com" },
  });
  if (!user) {
    user = await prisma.user.create({
      data: { email: "test@example.com", name: "Test User" },
    });
  }
  return user;
}

export async function createTodo(formData) {
  try {
    const user = await getCurrentUser();
    const todoData = {
      title: formData.get("title"),
      description: formData.get("description"),
      priority: formData.get("priority"),
      dueData: formData.get("dueData") || null,
    };
    const todo = await TodoService.createTodo(user.id, todoData);
    return {
      success: true,
      data: todo,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getTodos(filters = {}) {
  try {
    const user = await getCurrentUser();
    const todos = await TodoService.getUserTodos(user.id, filters);
    return {
      success: true,
      data: todos,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function toggleTodo(todoId) {
  try {
    const user = await getCurrentUser();
    const updated = await TodoService.toggleTodo(todoId, user.id);
    return {
      success: true,
      data: updated,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function deleteTodo(todoId) {
  try {
    const user = await getCurrentUser();
    await TodoService.deleteTodo(todoId, user.id);
    return {
      success: true,
      message: "Todo Deleted Successfully !.",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getStats() {
  try {
    const user = await getCurrentUser();
    const stats = await TodoService.getStats(user.id);
    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
