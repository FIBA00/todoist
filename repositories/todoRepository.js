import { prisma } from "@/lib/db.js";

export class TodoRepo{
    static async create(data) {
        return await prisma.todo.create({data})
    }
    static async getById(id){
        return await prisma.todo.findUnique({where: {id}})
    }
    static async getByUserId(userId,) {
        
    }
}