import prisma from "../../models/prisma";
import { Role } from "@prisma/client";

export class RoleRepository {
  createRole = async (data: {
    role: string;
    description?: string;
  }): Promise<Role> => {
    return await prisma.role.create({
      data: {
        ...data,
      },
    });
  };

  updateRole = async (
    id: number,
    data: { role?: string; description?: string },
  ): Promise<Role> => {
    return await prisma.role.update({
      where: { id },
      data: {
        ...data,
      },
    });
  };

  getRoles = async (): Promise<Role[]> => {
    return await prisma.role.findMany();
  };

  getRoleById = async (id: number): Promise<Role | null> => {
    return await prisma.role.findUnique({ where: { id } });
  };

  deleteRole = async (id: number): Promise<void> => {
    await prisma.role.delete({ where: { id } });
  };
}
