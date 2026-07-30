import { prisma } from "@/lib/db.js";

export class UserRepo{
    static async create(data){
        return await prisma.user.create({data})
    }
    static async getById(userId){
        return await prisma.user.findUnique({where: {id: userId}})
    }
    static async update(id, data){
        return await prisma.user.update({where: {id}, data})
    }
    static async delete(id){
        return await prisma.todo.delete({where: {id}})
    }
}