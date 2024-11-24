import prisma from "../../models/prisma";
import { User, Prisma } from "@prisma/client";

export class UserRepository {
  createUser = async (userData: {
    fullName: string;
    password: string;
    cpf: string;
    registration: string;
    email: string;
    community: {
      connect: {
        userId_communityId: { userId: number; communityId: number };
      }[];
    };
    roles: {
      connect: { userId_roleId: { userId: number; roleId: number } }[];
    };
    course: {
      connect: { courseId_userId: { userId: number; courseId: number } }[];
    };
    birthDate?: Date;
    phone?: string;
  }): Promise<User> => {
    try {
      const user = await prisma.user.create({
        data: {
          ...userData,
          community: {
            connect: userData.community.connect,
          },
          course: {
            connect: userData.course?.connect,
          },
          roles: {
            create: [{ role: { connect: { id: 1 } } }],
          },
        },
        include: {
          roles: true,
        },
      });

      if (userData.roles?.connect?.length) {
        await prisma.userRole.createMany({
          data: userData.roles.connect.map((role) => ({
            userId: user.id,
            roleId: role.userId_roleId.roleId,
          })),
        });
      }

      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error creating user: ${error.message}`);
      }
      throw new Error("An unknown error occurred while creating the user.");
    }
  };

  updateUser = async (
    id: number,
    userData: {
      fullName?: string;
      cpf?: string;
      registration?: string;
      email?: string;
      community?: {
        connect: { userId: number; communityId: number }[];
      };
      roles?: {
        connect: { userId: number; roleId: number }[];
      };
      course?: {
        connect: { userId: number; courseId: number }[];
      };
      birthDate?: Date;
      phone?: string;
    },
  ): Promise<User> => {
    const { community, roles, course, ...rest } = userData;

    const updateData: Prisma.UserUpdateInput = {
      ...rest,
      ...(community && {
        community: {
          connect: community.connect.map((item) => ({
            userId_communityId: {
              userId: item.userId,
              communityId: item.communityId,
            },
          })),
        },
      }),
      ...(roles && {
        roles: {
          connect: roles.connect.map((item) => ({
            userId_roleId: {
              userId: item.userId,
              roleId: item.roleId,
            },
          })),
        },
      }),
      ...(course && {
        course: {
          connect: course.connect.map((item) => ({
            courseId_userId: {
              userId: item.userId,
              courseId: item.courseId,
            },
          })),
        },
      }),
    };

    return await prisma.user.update({
      where: { id },
      data: updateData,
    });
  };

  findUserByEmail = async (email: string): Promise<User | null> => {
    try {
      return await prisma.user.findUnique({ where: { email } });
    } catch (error) {
      this.handlePrismaError(error, "fetching user by email");
    }
  };

  findUserByCPF = async (cpf: string): Promise<User | null> => {
    try {
      return await prisma.user.findUnique({ where: { cpf } });
    } catch (error) {
      this.handlePrismaError(error, "fetching user by CPF");
    }
  };

  findUserByRegistration = async (
    registration: string,
  ): Promise<User | null> => {
    try {
      return await prisma.user.findUnique({ where: { registration } });
    } catch (error) {
      this.handlePrismaError(error, "fetching user by registration");
    }
  };

  findUserById = async (id: number): Promise<User | null> => {
    try {
      return await prisma.user.findUnique({ where: { id } });
    } catch (error) {
      this.handlePrismaError(error, "fetching user by ID");
    }
  };

  findUsers = async (): Promise<User[]> => {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      this.handlePrismaError(error, "fetching users");
    }
  };

  deleteUserAccount = async (userId: number): Promise<User> => {
    try {
      return await prisma.user.delete({ where: { id: userId } });
    } catch (error) {
      this.handlePrismaError(error, "deleting user");
    }
  };

  private handlePrismaError(error: unknown, action: string): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          throw new Error(
            `One or more unique fields are already in use while ${action}`,
          );
        case "P2003":
          throw new Error(
            `Invalid reference for community, role, or course while ${action}`,
          );
        case "P2025":
          throw new Error(`User not found while ${action}`);
        default:
          throw new Error(`Error ${action}`);
      }
    }
    throw new Error(`Unexpected error ${action}`);
  }
}
