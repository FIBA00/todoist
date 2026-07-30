import { prisma } from "@/lib/db.js";

export class TodoRepo {
  static async create(data) {
    return await prisma.todo.create({ data });
  }
  static async getById(id) {
    return await prisma.todo.findUnique({ where: { id } });
  }
  static async getByUserId(userId, filters = {}) {
    return await prisma.todo.findMany({
      where: {
        userId,
        completed:
          filters.completed !== undefined ? filters.completed : undefined,
        priority: filters.priority,
      },
      orderBy:
        filters.sortBy === "dueDate"
          ? { dueDate: "asc" }
          : { createdAt: "desc" },
      take: filters.limit || 10,
      skip: filters.offset || 0,
    });
  }
  static async update(id, data) {
    return await prisma.todo.update({ where: { id }, data });
  }
  static async delete(id) {
    return await prisma.todo.delete({ where: { id } });
  }
  static async count(userId) {
    return await prisma.todo.count({ where: { userId } });
  }
  static async countCompleted(userId) {
    return await prisma.todo.count({ where: { userId, completed: true } });
  }
}
